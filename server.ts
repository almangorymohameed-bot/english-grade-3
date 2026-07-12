import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Audio cache to optimize speed and API quota
const audioCache: Record<string, string> = {};

// Server-side Gemini API client
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini API Client initialized successfully.");
  } else {
    console.warn("No valid GEMINI_API_KEY found. Falling back to browser SpeechSynthesis.");
  }
} catch (error) {
  console.error("Error initializing Gemini API:", error);
}

// Text-to-Speech API helpers for splitting and fetching in chunks
function splitTextIntoChunks(text: string, maxLength: number = 130): string[] {
  const clean = text.trim();
  if (clean.length <= maxLength) {
    return [clean];
  }

  // Split by sentence ending punctuation (., ?, !, ;, etc.) while keeping the punctuation
  const sentences = clean.split(/(?<=[.?!;])\s+/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if (sentence.length <= maxLength) {
      if ((currentChunk + " " + sentence).trim().length <= maxLength) {
        currentChunk = (currentChunk + " " + sentence).trim();
      } else {
        if (currentChunk) {
          chunks.push(currentChunk);
        }
        currentChunk = sentence;
      }
    } else {
      // If a single sentence is too long, split by commas
      const clauses = sentence.split(/(?<=[,])\s+/);
      for (const clause of clauses) {
        if (clause.length <= maxLength) {
          if ((currentChunk + " " + clause).trim().length <= maxLength) {
            currentChunk = (currentChunk + " " + clause).trim();
          } else {
            if (currentChunk) {
              chunks.push(currentChunk);
            }
            currentChunk = clause;
          }
        } else {
          // If a clause is still too long, split by individual words
          const words = clause.split(/\s+/);
          for (const word of words) {
            if ((currentChunk + " " + word).trim().length <= maxLength) {
              currentChunk = (currentChunk + " " + word).trim();
            } else {
              if (currentChunk) {
                chunks.push(currentChunk);
              }
              currentChunk = word;
            }
          }
        }
      }
    }
  }
  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks.filter(c => c.length > 0);
}

async function getChunkedAudioBuffer(phrase: string): Promise<Buffer> {
  const chunks = splitTextIntoChunks(phrase);
  const buffers: Buffer[] = [];

  for (const chunk of chunks) {
    let chunkBuffer: Buffer | null = null;

    // Try Google Translate TTS first
    try {
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(chunk)}`;
      const googleRes = await fetch(ttsUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36"
        }
      });
      if (googleRes.ok) {
        const arrayBuf = await googleRes.arrayBuffer();
        chunkBuffer = Buffer.from(arrayBuf);
      } else {
        console.warn(`Google Translate chunk TTS status error: ${googleRes.status} for chunk: "${chunk}"`);
      }
    } catch (e: any) {
      console.warn(`Google Translate chunk TTS fetch error: ${e.message} for chunk: "${chunk}"`);
    }

    // Fallback to Youdao Dict Voice
    if (!chunkBuffer) {
      try {
        const fallbackUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(chunk)}&type=2`;
        const fallbackRes = await fetch(fallbackUrl);
        if (fallbackRes.ok) {
          const arrayBuf = await fallbackRes.arrayBuffer();
          chunkBuffer = Buffer.from(arrayBuf);
        } else {
          console.warn(`Youdao Dict chunk TTS status error: ${fallbackRes.status} for chunk: "${chunk}"`);
        }
      } catch (e: any) {
        console.warn(`Youdao Dict chunk TTS fetch error: ${e.message} for chunk: "${chunk}"`);
      }
    }

    if (!chunkBuffer) {
      throw new Error(`Failed to generate TTS audio buffer for chunk: "${chunk}"`);
    }

    buffers.push(chunkBuffer);
  }

  return Buffer.concat(buffers);
}

// Text-to-Speech API
app.get("/api/tts", async (req, res) => {
  const { text } = req.query;
  if (!text || typeof text !== "string") {
    return res.status(400).send("Text is required");
  }

  const cleanText = text.trim();
  try {
    const combinedBuffer = await getChunkedAudioBuffer(cleanText);
    res.set({
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    });
    return res.send(combinedBuffer);
  } catch (err: any) {
    console.error("All server-side TTS engines failed in GET /api/tts:", err.message);
    return res.status(500).send("Error generating audio stream");
  }
});

app.post("/api/tts", async (req, res) => {
  const { text, voice = "Kore" } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Invalid text provided" });
  }

  const cleanText = text.trim();
  const cacheKey = `${voice}:${cleanText}`;

  // Serve from cache if available
  if (audioCache[cacheKey]) {
    return res.json({ audio: audioCache[cacheKey] });
  }

  // Define a stable, zero-dependency server-side helper to fetch Google Translate/Youdao TTS
  const fetchTranslateTTS = async (phrase: string): Promise<string> => {
    try {
      const buffer = await getChunkedAudioBuffer(phrase);
      return buffer.toString("base64");
    } catch (err: any) {
      console.error("All server-side fetch helpers failed in fetchTranslateTTS:", err.message || err);
      throw err;
    }
  };

  if (!ai) {
    // If Gemini client isn't available, automatically fallback to Google Translate TTS which is 100% reliable and doesn't require keys
    try {
      const base64Audio = await fetchTranslateTTS(cleanText);
      audioCache[cacheKey] = base64Audio;
      return res.json({ audio: base64Audio });
    } catch (e: any) {
      console.error("Translate TTS direct generation error:", e.message || e);
    }
    return res.json({ fallback: true, message: "Gemini API key not configured. Using Web Speech API." });
  }

  try {
    const prompt = `Say clearly, slowly, and in a friendly voice suitable for primary school children learning English: ${cleanText}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice as any },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Audio) {
      audioCache[cacheKey] = base64Audio;
      return res.json({ audio: base64Audio });
    } else {
      throw new Error("No audio content returned from Gemini Live TTS");
    }
  } catch (error: any) {
    console.error("Gemini TTS Error, switching back to elegant translate TTS:", error.message || error);
    try {
      const base64Audio = await fetchTranslateTTS(cleanText);
      audioCache[cacheKey] = base64Audio;
      return res.json({ audio: base64Audio });
    } catch (e: any) {
      console.error("Translate TTS secondary generation error:", e.message || e);
    }
    return res.json({ fallback: true, error: error.message || "Failed to generate audio via Gemini" });
  }
});

// Cache for translated words to avoid duplicate API calls
const translationCache: Record<string, string> = {};

// Translation API endpoint
app.post("/api/translate", async (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Text is required" });
  }

  const cleanText = text.trim();
  const cacheKey = cleanText.toLowerCase();

  // Return cached result if available
  if (translationCache[cacheKey]) {
    return res.json({ translation: translationCache[cacheKey] });
  }

  // 1. Try Google Translate Translation Engine first (extremely fast, robust, and zero-quota limits)
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(cleanText)}`;
    const googleRes = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36"
      }
    });

    if (googleRes.ok) {
      const data = await googleRes.json();
      const translated = data?.[0]?.[0]?.[0];
      if (translated) {
        translationCache[cacheKey] = translated;
        return res.json({ translation: translated });
      }
    }
  } catch (err: any) {
    console.log("Google Translate API direct fetch failed, trying fallback model:", err.message || err);
  }

  // 2. Fallback to Gemini if Google Translate fails
  if (ai) {
    try {
      const prompt = `Translate the English word or short phrase "${cleanText}" into clear, simple Arabic suitable for a Grade 1 Sudanese student learning English. Return ONLY the Arabic translation itself, with absolutely no additional text, explanation, punctuation, or wrapper.`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ parts: [{ text: prompt }] }],
      });

      const translated = response.text?.trim();
      if (translated) {
        translationCache[cacheKey] = translated;
        return res.json({ translation: translated });
      }
    } catch (e: any) {
      console.log("Gemini translation fallback model also failed:", e.message || e);
    }
  }

  // Final fallback to returning the original text if both translation engines fail
  return res.json({ translation: cleanText });
});

// AI Chatbot endpoint for interactive English partner roleplay
app.post("/api/chat", async (req, res) => {
  const { message, character = "Ahmed", history = [] } = req.body;

  if (!ai) {
    // Simulated simple responses if Gemini key is missing
    const promptLower = (message || "").toLowerCase();
    let reply = "Hello! Let's practice English together!";
    if (promptLower.includes("hello") || promptLower.includes("hi")) {
      reply = `Hello! I am ${character}. Welcome to SMILE English, Lesson 1! What is your name?`;
    } else if (promptLower.includes("name")) {
      reply = "That is a beautiful name! Nice to meet you! Happy studying!";
    } else if (promptLower.includes("how are you")) {
      reply = "I'm fine, thank you! How are you?";
    } else if (promptLower.includes("bye") || promptLower.includes("goodbye")) {
      reply = "Goodbye! See you soon!";
    }
    return res.json({ text: reply });
  }

  try {
    const chatHistory = history.map((h: any) => ({
      role: h.role, // "user" or "model"
      parts: [{ text: h.text }],
    }));

    const systemInstruction = `You are ${character}, a friendly Sudanese Grade 1 Intermediate (Grade 1) student from the New SMILE English curriculum for Sudan.
You speak clear, correct English suited for intermediate school students (13-15 years old) to help them practice and learn.
Encourage the student to practice, use simple but clear sentences, correct their spelling/grammar gently, and keep answers under 2 sentences. Include friendly cheerful comments like "Excellent!", "Splendid work!", or "Keep it up!"`;

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory,
    });

    const response = await chat.sendMessage({ message });
    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    return res.status(500).json({ error: error.message || "Failed to respond." });
  }
});

// Configure Vite middleware or production build output
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pupil SMILE English Grade 1 Server running on http://localhost:${PORT}`);
  });
};

startServer();

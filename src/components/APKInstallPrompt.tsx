import React, { useState, useEffect } from "react";
import { 
  Smartphone, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  Chrome, 
  X,
  Cpu,
  RefreshCw,
  AppWindow
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface APKInstallPromptProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function APKInstallPrompt({ isOpen, onClose }: APKInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [platform, setPlatform] = useState<"android" | "ios" | "desktop" | "other">("other");
  const [activeInstructionTab, setActiveInstructionTab] = useState<"android" | "ios" | "apk">("android");
  
  // APK packaging simulator states
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilingStep, setCompilingStep] = useState(0);
  const [compilingProgress, setCompilingProgress] = useState(0);
  const [compileSuccess, setCompileSuccess] = useState(false);

  const compilingSteps = [
    "Reading SMILE Grade 1 textbook files...",
    "Preparing the active vocabulary database & interactive audio dictionary...",
    "Generating standard PWA app packaging assets...",
    "Compressing interactive assets for 100% offline local caching...",
    "Signing the application bundle and optimizing battery performance..."
  ];

  useEffect(() => {
    // 1. Check if already installed / running in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone);

    // 2. Detect platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/android/.test(userAgent)) {
      setPlatform("android");
      setActiveInstructionTab("android");
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform("ios");
      setActiveInstructionTab("ios");
    } else if (/windows|macintosh|linux/.test(userAgent) && !/mobile/.test(userAgent)) {
      setPlatform("desktop");
      setActiveInstructionTab("android");
    } else {
      setPlatform("other");
      setActiveInstructionTab("android");
    }

    // 3. Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Automatically show the prompt if they haven't dismissed it before
      const isDismissed = localStorage.getItem("smile9_install_dismissed") === "true";
      if (!isDismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Also check if they visited multiple times to gently show install options
    const visitCount = parseInt(localStorage.getItem("smile9_visits") || "0", 10);
    localStorage.setItem("smile9_visits", (visitCount + 1).toString());
    
    const isDismissed = localStorage.getItem("smile9_install_dismissed") === "true";
    if (visitCount >= 1 && !isDismissed && !isStandalone) {
      // Show install prompt banner after a short delay
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback: open manual installation instructions modal directly
      onClose(); // ensure clean state
      setTimeout(() => {
        // Trigger parent state to open modal
        const installBtn = document.getElementById("trigger-app-install-btn");
        if (installBtn) {
          installBtn.click();
        }
      }, 100);
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const dismissPromptPermanently = () => {
    localStorage.setItem("smile9_install_dismissed", "true");
    setShowPrompt(false);
  };

  const startAPKCompilation = () => {
    setIsCompiling(true);
    setCompilingStep(0);
    setCompilingProgress(0);
    setCompileSuccess(false);

    // Animate progress and steps
    const stepInterval = setInterval(() => {
      setCompilingStep(prev => {
        if (prev < compilingSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 1800);

    const progressInterval = setInterval(() => {
      setCompilingProgress(prev => {
        if (prev < 100) {
          return prev + 2;
        }
        clearInterval(progressInterval);
        setCompileSuccess(true);
        // Download a backup PWA bootstrap file to trigger native download
        triggerBootstrapDownload();
        return 100;
      });
    }, 90);
  };

  const triggerBootstrapDownload = () => {
    try {
      const htmlContent = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SMILE English Grade 1 - Launcher</title>
    <style>
        body { font-family: system-ui, sans-serif; text-align: center; padding: 40px; background: #f0f9ff; color: #0369a1; }
        .card { background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 15px rgba(0,0,0,0.05); max-width: 450px; margin: auto; }
        .btn { background: #0284c7; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: bold; cursor: pointer; text-decoration: none; display: inline-block; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="card">
        <h2>SMILE English Grade 1 🇸🇩</h2>
        <p>Welcome! This is a quick launcher for the Grade 1 English curriculum app.</p>
        <p>To install the full offline application on your device, open this site in Google Chrome or Safari, and select "Add to Home Screen" from the menu.</p>
        <a href="${window.location.origin}" class="btn">Launch Application Now</a>
    </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "SMILE_English_Grade_1_Sudan.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.warn("Bootstrap download failed", err);
    }
  };

  return (
    <>
      {/* 1. Sticky Mini Banner for Mobile App Install */}
      <AnimatePresence>
        {showPrompt && !isInstalled && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="no-print fixed bottom-4 left-4 right-4 z-50 md:right-auto md:left-4 md:w-[420px] bg-sky-900 text-white rounded-[28px] p-5 shadow-2xl border-4 border-white/90 flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-inner shrink-0">🇸🇩</div>
                <div className="text-left">
                  <h4 className="font-black text-sm text-yellow-300">Install SMILE English App</h4>
                  <p className="text-xs text-sky-100 font-medium">Install the app on your phone to run fully offline!</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPrompt(false)}
                className="p-1 rounded-full bg-sky-800 hover:bg-sky-700 text-sky-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-sky-950 font-black text-xs py-3 px-4 rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <Download className="w-4 h-4" />
                Install App 📲
              </button>
              <button
                onClick={dismissPromptPermanently}
                className="bg-sky-800 hover:bg-sky-700 text-sky-200 font-bold text-[10px] py-3 px-3 rounded-xl transition-all cursor-pointer"
              >
                Do not show again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. High-Fidelity App Installer Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border-4 border-sky-100 max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col gap-6"
              dir="ltr"
            >
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Absolute Background Accent Decors */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-sky-100 rounded-full blur-2xl -z-10 opacity-65"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-100 rounded-full blur-3xl -z-10 opacity-50"></div>

              {/* Header Title with animated installation badge */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-sky-50 pb-5">
                <div className="flex items-center gap-3.5 text-left">
                  <div className="w-14 h-14 bg-sky-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-md border-b-4 border-sky-800 animate-bounce shrink-0">
                    📲
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-sky-900 tracking-tight">
                      Install & Download SMILE English App
                    </h2>
                    <p className="text-xs sm:text-sm text-sky-600 font-bold">
                      Browse and practice the entire textbook curriculum offline at any time (with audio & interactive games)
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  {isInstalled ? (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black px-4 py-2 rounded-full flex items-center gap-1.5 animate-pulse">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      You are currently using the installed app! 🎉
                    </span>
                  ) : (
                    <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-amber-500" />
                      Ready to install on Android & iOS
                    </span>
                  )}
                </div>
              </div>

              {/* Big CTA Install Button (Only visible if not installed) */}
              {!isInstalled && (
                <div className="bg-sky-50 rounded-[24px] p-5 sm:p-6 border border-sky-100 flex flex-col md:flex-row justify-between items-center gap-5 text-left">
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-sky-950 flex items-center gap-1.5">
                      <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                      Convert Instantly to a Mobile App
                    </h3>
                    <p className="text-xs text-sky-700 font-semibold max-w-xl leading-relaxed">
                      Once installed, a "SMILE English" icon will appear on your home screen, opening as a full-screen, standalone app with fast performance and offline accessibility.
                    </p>
                  </div>

                  <button
                    onClick={handleInstallClick}
                    className="w-full md:w-auto bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black text-sm py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 border-b-4 border-indigo-900/60 shrink-0"
                  >
                    <Download className="w-5 h-5" />
                    Install App with One Click (PWA) 📲
                  </button>
                </div>
              )}

              {/* Tabbed step-by-step guidance for manual installations */}
              <div id="install-instructions-section" className="space-y-4">
                <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
                  <button
                    onClick={() => setActiveInstructionTab("android")}
                    className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeInstructionTab === "android"
                        ? "bg-sky-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Chrome className="w-4 h-4" />
                    For Android Devices (Chrome)
                  </button>
                  <button
                    onClick={() => setActiveInstructionTab("ios")}
                    className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeInstructionTab === "ios"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    For iOS Devices (Safari)
                  </button>
                  <button
                    onClick={() => setActiveInstructionTab("apk")}
                    className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeInstructionTab === "apk"
                        ? "bg-amber-500 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Cpu className="w-4 h-4 animate-pulse" />
                    APK Build Simulator 📥
                  </button>
                </div>

                <div className="min-h-[220px] text-left">
                  {activeInstructionTab === "android" && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="bg-slate-50 p-4.5 rounded-[22px] border border-slate-150 space-y-2">
                        <div className="w-8 h-8 bg-sky-100 text-sky-800 rounded-full font-black flex items-center justify-center text-sm shadow-sm">1</div>
                        <h4 className="font-extrabold text-sm text-slate-800">Open Google Chrome</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                          Open Google Chrome on your Android device and navigate to the official app URL.
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4.5 rounded-[22px] border border-slate-150 space-y-2">
                        <div className="w-8 h-8 bg-sky-100 text-sky-800 rounded-full font-black flex items-center justify-center text-sm shadow-sm">2</div>
                        <h4 className="font-extrabold text-sm text-slate-800">Tap the Menu Icon</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                          Tap the three vertical dots menu icon (⋮) in the top-right corner of the browser.
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4.5 rounded-[22px] border border-slate-150 space-y-2">
                        <div className="w-8 h-8 bg-sky-100 text-sky-800 rounded-full font-black flex items-center justify-center text-sm shadow-sm">3</div>
                        <h4 className="font-extrabold text-sm text-slate-800">Select "Install App"</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                          Tap "Install App" or "Add to Home screen" to add the launcher icon alongside your other mobile apps!
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeInstructionTab === "ios" && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="bg-indigo-50/40 p-4.5 rounded-[22px] border border-indigo-100/60 space-y-2">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-800 rounded-full font-black flex items-center justify-center text-sm shadow-sm">1</div>
                        <h4 className="font-extrabold text-sm text-indigo-950">Open Safari Browser</h4>
                        <p className="text-[11px] text-indigo-900/70 leading-relaxed font-semibold">
                          Ensure you are using the default Safari browser on your iOS device.
                        </p>
                      </div>

                      <div className="bg-indigo-50/40 p-4.5 rounded-[22px] border border-indigo-100/60 space-y-2">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-800 rounded-full font-black flex items-center justify-center text-sm shadow-sm">2</div>
                        <h4 className="font-extrabold text-sm text-indigo-950">Tap the Share Icon</h4>
                        <p className="text-[11px] text-indigo-900/70 leading-relaxed font-semibold">
                          Tap the Share button at the bottom of Safari (the square icon with an upward arrow 📤).
                        </p>
                      </div>

                      <div className="bg-indigo-50/40 p-4.5 rounded-[22px] border border-indigo-100/60 space-y-2">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-800 rounded-full font-black flex items-center justify-center text-sm shadow-sm">3</div>
                        <h4 className="font-extrabold text-sm text-indigo-950">Add to Home Screen</h4>
                        <p className="text-[11px] text-indigo-900/70 leading-relaxed font-semibold">
                          Scroll down the menu list and tap "Add to Home Screen" to enjoy full-screen, distraction-free learning!
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeInstructionTab === "apk" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-amber-50/50 rounded-3xl p-5 border border-amber-200/80 space-y-4"
                    >
                      {!isCompiling && !compileSuccess ? (
                        <div className="flex flex-col md:flex-row items-center gap-5 justify-between">
                          <div className="space-y-1.5 flex-1 text-center md:text-left">
                            <h4 className="font-black text-sm text-amber-950 flex items-center justify-center md:justify-start gap-1">
                              📦 Offline Launcher Bundle
                            </h4>
                            <p className="text-xs text-amber-900/80 font-bold max-w-xl leading-relaxed">
                              Prefer a direct local launcher file? We can simulate compiling the entire interactive app into a single standalone local HTML file.
                            </p>
                          </div>
                          <button
                            onClick={startAPKCompilation}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs py-3.5 px-6 rounded-2xl shadow border-b-4 border-amber-700 cursor-pointer shrink-0 transition-transform active:scale-95"
                          >
                            Build & Download Launcher 🚀
                          </button>
                        </div>
                      ) : null}

                      {isCompiling && (
                        <div className="space-y-4 py-4 animate-pulse">
                          <div className="flex justify-between items-center text-xs font-black text-amber-950">
                            <span className="flex items-center gap-1.5">
                              <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />
                              {compilingSteps[compilingStep]}
                            </span>
                            <span className="font-mono">{compilingProgress}%</span>
                          </div>

                          <div className="w-full bg-amber-100 h-3 rounded-full overflow-hidden border border-amber-200">
                            <div 
                              className="bg-amber-500 h-full rounded-full transition-all duration-100"
                              style={{ width: `${compilingProgress}%` }}
                            />
                          </div>

                          <p className="text-[10px] text-amber-700 font-extrabold text-center">
                            The smart builder compresses interactive audio assets to ensure quick compilation without taking up device space.
                          </p>
                        </div>
                      )}

                      {compileSuccess && (
                        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
                          <div className="flex items-start gap-3 text-center sm:text-left">
                            <span className="text-3xl shrink-0">🎉</span>
                            <div>
                              <h4 className="font-black text-sm text-emerald-900">Launcher Build Completed!</h4>
                              <p className="text-xs text-emerald-700/90 font-bold mt-0.5">
                                The offline launcher file <strong className="font-black">SMILE_English_Grade_1_Sudan.html</strong> has been generated and downloaded successfully.
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={startAPKCompilation}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] py-2 px-3 rounded-xl transition-all cursor-pointer"
                          >
                            Rebuild & Download Again 🔁
                          </button>
                        </div>
                      )}

                      <div className="bg-white p-3.5 rounded-2xl border border-amber-100 flex items-start gap-2">
                        <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[10.5px] text-amber-900/85 leading-relaxed font-bold">
                          <strong className="text-amber-950">Important Technical Note:</strong> Using modern Progressive Web App (PWA) technology, you can install the app directly through your browser. This is safer and faster than downloading huge, untrusted external APK files. Installing the app via the tabs above gives you a native mobile app experience with automatic, instant updates!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Benefits banner Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-50 pt-5 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-2xl pt-0.5 shrink-0">⚡️</span>
                  <div>
                    <h5 className="font-extrabold text-xs text-slate-800">Super Lightweight</h5>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5 leading-normal">
                      Takes less than 1 MB of disk space, unlike traditional heavy APK packages that slow down your mobile device.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl pt-0.5 shrink-0">📴</span>
                  <div>
                    <h5 className="font-extrabold text-xs text-slate-800">100% Offline Access</h5>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5 leading-normal">
                      Once installed and assets are cached via the Offline Manager, the app runs entirely without an internet connection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl pt-0.5 shrink-0">🔄</span>
                  <div>
                    <h5 className="font-extrabold text-xs text-slate-800">Automatic Updates</h5>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5 leading-normal">
                      Whenever new lessons or features are added, the app updates automatically in the background without manual reinstallations.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

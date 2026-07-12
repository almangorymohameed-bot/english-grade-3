import { grammarUnit1to4, GrammarRule, GrammarQuizQuestion } from "./grammarData/unit1to4";
import { grammarUnit5to8 } from "./grammarData/unit5to8";
import { grammarUnit9to12 } from "./grammarData/unit9to12";

export type { GrammarRule, GrammarQuizQuestion };

export const GRAMMAR_DATABASE: Record<string, { rule: GrammarRule; quiz: GrammarQuizQuestion[] }> = {
  ...grammarUnit1to4,
  ...grammarUnit5to8,
  ...grammarUnit9to12,
};

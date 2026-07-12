import { UnitItem } from "./types";
import { units1to3 } from "./smileData/unit1to3";
import { units4to6 } from "./smileData/unit4to6";
import { units7to9 } from "./smileData/unit7to9";
import { units10to12 } from "./smileData/unit10to12";

export const SMILE_UNITS: UnitItem[] = [
  ...units1to3,
  ...units4to6,
  ...units7to9,
  ...units10to12
];

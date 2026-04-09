import { ScoringSystem } from "./ScoringSystem";

export class NintendoScoringSystem implements ScoringSystem {
  points = 0;
  onLineClear(lines: number, level: number) {
    return;
  }
}

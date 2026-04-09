import { ScoringSystem } from "./ScoringSystem";

export class NintendoScoringSystem implements ScoringSystem {
  points = 0;
  onLineClear(lines: number, level: number) {
    switch (lines) {
      case 1:
        this.points += 40 * (level + 1);
        break;
      case 2:
        this.points += 100 * (level + 1);
        break;
    }
  }
}

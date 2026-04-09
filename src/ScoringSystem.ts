export interface ScoringSystem {
  points: number;
  onLineClear(lines: number, level: number): void;
  onSoftDrop(moves: number): void;
}

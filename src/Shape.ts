export interface Shape {
  width(): number;
  height(): number;
  cellAt(row: number, col: number): string;
  rotateRight(): Shape;
  rotateLeft(): Shape;
  toString(): string;
}

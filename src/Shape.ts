export interface Shape {
  width(): number;
  height(): number;
  cellAt(row: number, col: number): string;
  retateRight(): Shape;
  rotateLeft(): Shape;
  toString(): string;
}

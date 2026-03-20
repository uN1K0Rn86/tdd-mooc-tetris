export class RotatingShape {
  private readonly cells: string[][];

  constructor(cells: string[][]) {
    this.cells = cells.map((row) => [...row]);
  }

  static fromString(str: string): RotatingShape {
    const rows = str.split("\n").map((row) => row.trim().split(""));
    return new RotatingShape(rows);
  }

  toString() {
    return this.cells.map((row) => row.join("")).join("\n") + "\n";
  }

  rotateRight(): RotatingShape {
    const size = this.cells.length;
    const newShape = Array.from({ length: size }, () => Array(size).fill("."));

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        newShape[col][size - 1 - row] = this.cells[row][col];
      }
    }

    return new RotatingShape(newShape);
  }

  rotateLeft(): RotatingShape {
    const size = this.cells.length;
    const newShape = Array.from({ length: size }, () => Array(size).fill("."));

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        newShape[size - 1 - col][row] = this.cells[row][col];
      }
    }

    return new RotatingShape(newShape);
  }

  width(): number {
    return this.cells[0].length;
  }

  height(): number {
    return this.cells.length;
  }

  cellAt(row: number, col: number): string {
    return this.cells[row][col];
  }
}

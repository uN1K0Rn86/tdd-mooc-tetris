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
    newShape[0][0] = this.cells[2][0];
    newShape[0][1] = this.cells[1][0];
    newShape[0][2] = this.cells[0][0];
    newShape[1][0] = this.cells[2][1];
    newShape[1][1] = this.cells[1][1];
    newShape[1][2] = this.cells[0][1];
    newShape[2][0] = this.cells[2][2];
    newShape[2][1] = this.cells[1][2];
    newShape[2][2] = this.cells[0][2];

    return new RotatingShape(newShape);
  }
}

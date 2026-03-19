export class Board {
  private cells: string[][];
  width;
  height;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = Array.from({ length: height }, () => Array(width).fill("."));
  }

  toString() {
    return this.cells.map((row) => row.join("")).join("\n") + "\n";
  }
}

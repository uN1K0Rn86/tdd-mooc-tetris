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

  drop(block: string) {
    const middle = Math.floor(this.width / 2);
    this.cells[0][middle] = block;
  }

  tick() {
    this.cells = this.cells.map((_, index) => {
      if (index === 0) {
        return Array(this.width).fill(".");
      } else {
        return this.cells[index - 1];
      }
    });
  }
}

export class Board {
  private cells: string[][];
  width;
  height;
  private falling = false;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = Array.from({ length: height }, () => Array(width).fill("."));
  }

  private isEmpty() {
    return this.cells.every((row) => row.every((cell) => cell === "."));
  }

  toString() {
    return this.cells.map((row) => row.join("")).join("\n") + "\n";
  }

  drop(block: string) {
    if (this.falling) throw "already falling";
    const middle = Math.floor(this.width / 2);
    this.cells[0][middle] = block;
    this.falling = true;
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

  hasFalling() {
    return this.falling;
  }
}

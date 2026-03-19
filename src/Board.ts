export class Board {
  private cells: string[][];
  width;
  height;
  private falling = false;
  private activeBlock: string | null = null;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = Array.from({ length: height }, () => Array(width).fill("."));
  }

  toString() {
    return this.cells.map((row) => row.join("")).join("\n") + "\n";
  }

  drop(block: string) {
    if (this.falling) throw "already falling";
    const middle = Math.floor(this.width / 2);
    this.cells[0][middle] = block;
    this.activeBlock = block;
    this.falling = true;
  }

  tick() {
    if (!this.activeBlock) return;

    const rowIndex = this.cells.findIndex((row) => row.includes(this.activeBlock!));
    const colIndex = this.cells[rowIndex].indexOf(this.activeBlock);

    if (rowIndex === -1) {
      this.falling = false;
      this.activeBlock = null;
      return;
    }

    const isAtBottom = rowIndex === this.height - 1;
    const isBlockedBelow = !isAtBottom && this.cells[rowIndex + 1][colIndex] !== ".";

    const lastRow = this.cells[this.height - 1];
    if (lastRow.some((cell) => cell !== ".")) {
      this.falling = false;
      return;
    }

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

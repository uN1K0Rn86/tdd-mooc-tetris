import { Shape } from "./Shape";

export class Board {
  private cells: string[][];
  width;
  height;
  private falling = false;
  private activeBlock: Shape | null = null;
  private activeRow: number | null = null;
  private activeCol: number | null = null;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = Array.from({ length: height }, () => Array(width).fill("."));
  }

  toString() {
    const view = this.cells.map((row) => [...row]);

    if (this.activeBlock && this.activeRow && this.activeCol) {
      for (let r = 0; r < this.activeBlock.height(); r++) {
        for (let c = 0; c < this.activeBlock.width(); c++) {
          const cell = this.activeBlock.cellAt(r, c);
          if (cell === ".") continue;
        }
      }
    }
    return this.cells.map((row) => row.join("")).join("\n") + "\n";
  }

  drop(block: Shape) {
    if (this.falling) throw "already falling";
    this.activeRow = 0;
    this.activeCol = Math.floor((this.width - block.width()) / 2);
    const middle = Math.floor(this.width / 2);
    this.cells[0][middle] = block.toString();
    this.activeBlock = block;
    this.falling = true;
  }

  tick() {
    if (!this.activeBlock) return;

    const rowIndex = this.cells.findIndex((row) => row.includes(this.activeBlock?.toString()!));
    const colIndex = this.cells[rowIndex].indexOf(this.activeBlock.toString());

    if (rowIndex === -1) {
      this.falling = false;
      this.activeBlock = null;
      return;
    }

    const isAtBottom = rowIndex === this.height - 1;
    const isBlockedBelow = !isAtBottom && this.cells[rowIndex + 1][colIndex] !== ".";

    if (isAtBottom || isBlockedBelow) {
      this.falling = false;
      this.activeBlock = null;
      return;
    }

    this.cells[rowIndex + 1][colIndex] = this.activeBlock.toString();
    this.cells[rowIndex][colIndex] = ".";
  }

  hasFalling() {
    return this.falling;
  }
}

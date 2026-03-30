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

  private canMoveDown(): boolean {
    if (!this.activeBlock || this.activeRow === null || this.activeCol === null) return false;

    for (let r = 0; r < this.activeBlock.height(); r++) {
      for (let c = 0; c < this.activeBlock.width(); c++) {
        const cell = this.activeBlock.cellAt(r, c);
        if (cell === ".") continue;

        const nextRow = this.activeRow + r + 1;
        const col = this.activeCol + c;

        if (nextRow >= this.height) return false;
        if (col < 0 || col >= this.width) return false;
        if (this.cells[nextRow][col] !== ".") return false;
      }
    }
    return true;
  }

  private canMove(direction: string): boolean {
    if (!this.activeBlock || this.activeRow === null || this.activeCol === null) return false;

    for (let r = 0; r < this.activeBlock.height(); r++) {
      for (let c = 0; c < this.activeBlock.width(); c++) {
        const cell = this.activeBlock.cellAt(r, c);
        if (cell === ".") continue;

        const row = this.activeRow + r;
        let colToCheck;
        if (direction === "left") {
          colToCheck = this.activeCol + c - 1;
        } else {
          colToCheck = this.activeCol + c + 1;
        }

        if (direction === "left" && colToCheck < 0) return false;
        if (this.cells[row][colToCheck] !== ".") return false;
        if (direction === "right" && colToCheck >= this.width) return false;
      }
    }
    return true;
  }

  private lockActiveBlock() {
    if (!this.activeBlock || this.activeRow === null || this.activeCol === null) return;

    for (let r = 0; r < this.activeBlock.height(); r++) {
      for (let c = 0; c < this.activeBlock.width(); c++) {
        const cell = this.activeBlock.cellAt(r, c);
        if (cell === ".") continue;

        const boardRow = this.activeRow + r;
        const boardCol = this.activeCol + c;

        if (boardRow >= 0 && boardRow < this.height && boardCol >= 0 && boardCol < this.width) {
          this.cells[boardRow][boardCol] = cell;
        }
      }
    }
  }

  toString() {
    const view = this.cells.map((row) => [...row]);

    if (this.activeBlock !== null && this.activeRow !== null && this.activeCol !== null) {
      for (let r = 0; r < this.activeBlock.height(); r++) {
        for (let c = 0; c < this.activeBlock.width(); c++) {
          const cell = this.activeBlock.cellAt(r, c);
          if (cell === ".") continue;

          const boardRow = this.activeRow + r;
          const boardCol = this.activeCol + c;

          if (boardRow >= 0 && boardRow < this.height && boardCol >= 0 && boardCol < this.width) {
            view[boardRow][boardCol] = cell;
          }
        }
      }
    }
    return view.map((row) => row.join("")).join("\n") + "\n";
  }

  drop(block: Shape) {
    if (this.falling) throw "already falling";
    this.activeRow = 0;
    this.activeCol = Math.floor((this.width - block.width()) / 2);
    this.activeBlock = block;
    this.falling = true;
  }

  tick() {
    if (!this.activeBlock || this.activeRow === null || this.activeCol === null) return;

    if (this.canMoveDown()) {
      this.activeRow += 1;
      return;
    }

    this.lockActiveBlock();
    this.falling = false;
    this.activeBlock = null;
    this.activeRow = null;
    this.activeCol = null;
  }

  moveLeft() {
    if (this.activeCol !== null && this.canMove("left")) this.activeCol -= 1;
  }

  moveRight() {
    if (this.activeCol !== null && this.canMove("right")) this.activeCol += 1;
  }

  moveDown() {
    if (!this.activeBlock || this.activeRow === null || this.activeCol === null) return false;

    while (this.canMoveDown()) {
      this.tick();
    }
  }

  rotateLeft() {
    if (!this.activeBlock) return;
    this.activeBlock = this.activeBlock.rotateLeft();
  }

  rotateRight() {
    if (!this.activeBlock) return;
    this.activeBlock = this.activeBlock.rotateRight();
  }

  hasFalling() {
    return this.falling;
  }
}

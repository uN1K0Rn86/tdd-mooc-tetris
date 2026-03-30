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

  private canPlace(shape: Shape, baseRow: number, baseCol: number): boolean {
    for (let r = 0; r < shape.height(); r++) {
      for (let c = 0; c < shape.width(); c++) {
        const cell = shape.cellAt(r, c);
        if (cell === ".") continue;

        const boardRow = baseRow + r;
        const boardCol = baseCol + c;

        if (boardRow < 0 || boardRow >= this.height) return false;
        if (boardCol < 0 || boardCol >= this.width) return false;
        if (this.cells[boardRow][boardCol] !== ".") return false;
      }
    }
    return true;
  }

  private canRotate(shape: Shape): boolean {
    if (!this.activeBlock || this.activeRow === null || this.activeCol === null) return false;

    return true;
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

    if (this.canPlace(this.activeBlock, this.activeRow + 1, this.activeCol)) {
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
    if (!this.activeBlock || this.activeRow === null || this.activeCol === null) return;
    if (this.canPlace(this.activeBlock, this.activeRow, this.activeCol - 1)) this.activeCol -= 1;
  }

  moveRight() {
    if (!this.activeBlock || this.activeRow === null || this.activeCol === null) return;
    if (this.canPlace(this.activeBlock, this.activeRow, this.activeCol + 1)) this.activeCol += 1;
  }

  moveDown() {
    if (!this.activeBlock || this.activeRow === null || this.activeCol === null) return false;

    while (this.canPlace(this.activeBlock, this.activeRow + 1, this.activeCol)) {
      this.tick();
    }
  }

  rotateLeft() {
    if (!this.activeBlock || this.activeRow === null || this.activeCol === null) return;
    const rotated = this.activeBlock.rotateLeft();
    if (this.canPlace(rotated, this.activeRow, this.activeCol)) {
      this.activeBlock = this.activeBlock.rotateLeft();
    }
  }

  rotateRight() {
    if (!this.activeBlock || this.activeRow === null || this.activeCol === null) return;
    const rotated = this.activeBlock.rotateRight();
    if (this.canPlace(rotated, this.activeRow, this.activeCol)) {
      this.activeBlock = this.activeBlock.rotateRight();
    }
  }

  hasFalling() {
    return this.falling;
  }
}

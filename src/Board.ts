import { ArikaTetromino } from "./ArikaTetromino";
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

    this.clearLines();
    this.falling = false;
    this.activeBlock = null;
    this.activeRow = null;
    this.activeCol = null;
  }

  private clearLines() {
    for (let r = this.height - 1; r >= 0; r--) {
      if (this.cells[r].every((c) => c !== ".")) {
        for (let newRow = r; newRow > 0; newRow--) {
          this.cells[newRow] = [...this.cells[newRow - 1]];
        }
        this.cells[0] = Array(this.width).fill(".");
        r++;
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

  private isValidCenterColumn(rotated: Shape, baseRow: number, baseCol: number): boolean {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const cell = rotated.cellAt(r, c);
        if (cell === ".") continue;

        const boardRow = baseRow + r;
        const boardCol = baseCol + c;
        if (this.cells[boardRow][boardCol] !== ".") {
          if (c !== 1) return true;
          if (c === 1) return false;
        }
      }
    }
    return true;
  }

  private tryRotate(rotated: Shape): boolean {
    if (!this.activeBlock || this.activeRow === null || this.activeCol === null) return false;

    const kicks = [
      { dc: 0, dr: 0 },
      { dc: 1, dr: 0 },
      { dc: -1, dr: 0 },
    ];

    for (const k of kicks) {
      const nextRow = this.activeRow + k.dr;
      const nextCol = this.activeCol + k.dc;

      if (this.canPlace(rotated, nextRow, nextCol)) {
        if (this.activeBlock instanceof ArikaTetromino && this.activeBlock.variant === "I" && k.dc !== 0) return false;
        if (
          this.activeBlock instanceof ArikaTetromino &&
          (this.activeBlock.variant === "T" || this.activeBlock.variant === "J" || this.activeBlock.variant === "L") &&
          k.dc !== 0
        )
          if (!this.isValidCenterColumn(rotated, this.activeRow, this.activeCol)) return false;

        this.activeBlock = rotated;
        this.activeRow = nextRow;
        this.activeCol = nextCol;
        return true;
      }
    }

    return false;
  }

  private topInset(shape: Shape): number {
    for (let r = 0; r < shape.height(); r++) {
      for (let c = 0; c < shape.width(); c++) {
        if (shape.cellAt(r, c) !== ".") return r;
      }
    }
    return 0;
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
    this.activeRow = -this.topInset(block);
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
    if (!this.activeBlock) return;
    const rotated = this.activeBlock.rotateLeft();
    this.tryRotate(rotated);
  }

  rotateRight() {
    if (!this.activeBlock) return;
    const rotated = this.activeBlock.rotateRight();
    this.tryRotate(rotated);
  }

  hasFalling() {
    return this.falling;
  }
}

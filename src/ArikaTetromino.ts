import { Shape } from "./Shape";

export class ArikaTetromino implements Shape {
  private readonly orientations: string[][];
  private readonly index: number;

  public static readonly T_SHAPE = new ArikaTetromino([
    ["....", "TTT.", ".T..", "...."],
    [".T..", "TT..", ".T..", "...."],
    ["....", ".T..", "TTT.", "...."],
    [".T..", ".TT.", ".T..", "...."],
  ]);

  public static readonly I_SHAPE = new ArikaTetromino([
    ["....", "IIII", "....", "...."],
    ["..I.", "..I.", "..I.", "..I."],
    ["....", "IIII", "....", "...."],
    ["..I.", "..I.", "..I.", "..I."],
  ]);

  constructor(orientations: string[][], index = 0) {
    this.orientations = orientations;
    this.index = index;
  }

  toString(): string {
    return this.orientations[this.index].join("\n") + "\n";
  }

  rotateRight(): ArikaTetromino {
    const nextIndex = (this.index + 1) % this.orientations.length;
    return new ArikaTetromino(this.orientations, nextIndex);
  }

  rotateLeft(): ArikaTetromino {
    const previousIndex = (this.index - 1 + this.orientations.length) % this.orientations.length;
    return new ArikaTetromino(this.orientations, previousIndex);
  }

  width(): number {
    return this.orientations[this.index].length;
  }

  height(): number {
    return this.orientations.length;
  }

  cellAt(row: number, col: number): string {
    return this.orientations[this.index][row][col];
  }
}

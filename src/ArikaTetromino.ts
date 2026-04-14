import { Shape } from "./Shape.js";

export class ArikaTetromino implements Shape {
  private readonly orientations: string[][];
  readonly variant: string;
  private readonly index: number;

  public static readonly T_SHAPE = new ArikaTetromino(
    [
      ["....", "TTT.", ".T..", "...."],
      [".T..", "TT..", ".T..", "...."],
      ["....", ".T..", "TTT.", "...."],
      [".T..", ".TT.", ".T..", "...."],
    ],
    "T"
  );

  public static readonly I_SHAPE = new ArikaTetromino(
    [
      ["....", "IIII", "....", "...."],
      ["..I.", "..I.", "..I.", "..I."],
      ["....", "IIII", "....", "...."],
      ["..I.", "..I.", "..I.", "..I."],
    ],
    "I"
  );

  public static readonly L_SHAPE = new ArikaTetromino(
    [
      ["....", "LLL.", "L...", "...."],
      ["LL..", ".L..", ".L..", "...."],
      ["....", "..L.", "LLL.", "...."],
      [".L..", ".L..", ".LL.", "...."],
    ],
    "L"
  );

  public static readonly J_SHAPE = new ArikaTetromino(
    [
      ["....", "JJJ.", "..J.", "...."],
      [".J..", ".J..", "JJ..", "...."],
      ["....", "J...", "JJJ.", "...."],
      [".JJ.", ".J..", ".J..", "...."],
    ],
    "J"
  );

  public static readonly S_SHAPE = new ArikaTetromino(
    [
      ["....", ".SS.", "SS..", "...."],
      ["S...", "SS..", ".S..", "...."],
      ["....", ".SS.", "SS..", "...."],
      ["S...", "SS..", ".S..", "...."],
    ],
    "S"
  );

  public static readonly Z_SHAPE = new ArikaTetromino(
    [
      ["....", "ZZ..", ".ZZ.", "...."],
      ["..Z.", ".ZZ.", ".Z..", "...."],
      ["....", "ZZ..", ".ZZ.", "...."],
      ["..Z.", ".ZZ.", ".Z..", "...."],
    ],
    "Z"
  );

  public static readonly O_SHAPE = new ArikaTetromino(
    [
      ["....", ".OO.", ".OO.", "...."],
      ["....", ".OO.", ".OO.", "...."],
      ["....", ".OO.", ".OO.", "...."],
      ["....", ".OO.", ".OO.", "...."],
    ],
    "O"
  );

  constructor(orientations: string[][], variant: string, index = 0) {
    this.orientations = orientations;
    this.variant = variant;
    this.index = index;
  }

  toString(): string {
    return this.orientations[this.index].join("\n") + "\n";
  }

  rotateRight(): ArikaTetromino {
    const nextIndex = (this.index + 1) % this.orientations.length;
    return new ArikaTetromino(this.orientations, this.variant, nextIndex);
  }

  rotateLeft(): ArikaTetromino {
    const previousIndex = (this.index - 1 + this.orientations.length) % this.orientations.length;
    return new ArikaTetromino(this.orientations, this.variant, previousIndex);
  }

  width(): number {
    return this.orientations[this.index][0].length;
  }

  height(): number {
    return this.orientations[this.index].length;
  }

  cellAt(row: number, col: number): string {
    return this.orientations[this.index][row][col];
  }

  type(): string {
    return this.variant;
  }
}

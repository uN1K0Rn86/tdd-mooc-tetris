import { Shape } from "./Shape";

export class ArikaTetromino implements Shape {
  private readonly orientations: string[][]; // fixed
  private readonly index: number;

  public static readonly T_SHAPE = new ArikaTetromino([
    ["....", "TTT.", ".T..", "...."],
    [".T..", "TT..", ".T..", "...."],
    ["....", ".T..", "TTT.", "...."],
    [".T..", ".TT.", ".T..", "...."],
  ]);

  constructor(orientations: string[][], index = 0) {
    this.orientations = orientations;
    this.index = index;
  }
}

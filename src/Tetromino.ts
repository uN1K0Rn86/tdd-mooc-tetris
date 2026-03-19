import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  private readonly orientations: RotatingShape[];
  private readonly index: number;

  public static readonly T_SHAPE = new Tetromino(
    RotatingShape.fromString(
      `.T.
       TTT
       ...`
    )
  );

  constructor(orientations: RotatingShape[], index = 0) {
    this.orientations = orientations;
    this.index = index;
  }
}

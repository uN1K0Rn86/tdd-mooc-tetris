import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  private readonly orientations: RotatingShape[];
  private readonly index: number;

  public static readonly T_SHAPE = () => {
    const initial = RotatingShape.fromString(
      `.T.
       TTT
       ...`
    );
    return new Tetromino([
      initial,
      initial.rotateRight(),
      initial.rotateRight().rotateRight(),
      initial.rotateRight().rotateRight().rotateRight(),
    ]);
  };

  constructor(orientations: RotatingShape[], index = 0) {
    this.orientations = orientations;
    this.index = index;
  }
}

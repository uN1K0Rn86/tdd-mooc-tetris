import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  private readonly shape: RotatingShape;

  public static readonly T_SHAPE = new Tetromino(
    RotatingShape.fromString(
      `.T.
       TTT
       ...`
    )
  );

  public static readonly I_SHAPE = new Tetromino(
    RotatingShape.fromString(
      `.....
       .....
       IIII.
       .....
       .....`
    )
  );

  constructor(shape: RotatingShape) {
    this.shape = shape;
  }

  toString() {
    return this.shape.toString();
  }

  rotateRight() {
    return this.shape.rotateRight();
  }

  rotateLeft() {
    return this.shape.rotateLeft();
  }
}

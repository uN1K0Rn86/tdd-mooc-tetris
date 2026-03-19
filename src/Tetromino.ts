import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  private readonly shape: RotatingShape;

  constructor(shape: RotatingShape) {
    this.shape = shape;
  }
}

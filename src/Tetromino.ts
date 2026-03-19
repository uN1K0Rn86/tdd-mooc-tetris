import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  private readonly orientations: RotatingShape[];
  private readonly index: number;

  public static readonly T_SHAPE = Tetromino.create(
    `.T.
     TTT
     ...`,
    4
  );

  private static create(initialString: string, rotations: number) {
    const initial = RotatingShape.fromString(initialString);
    const orientations = [initial];

    for (let i = 1; i < rotations; i++) {
      orientations.push(orientations[i - 1].rotateRight());
    }

    return new Tetromino(orientations, 0);
  }

  constructor(orientations: RotatingShape[], index = 0) {
    this.orientations = orientations;
    this.index = index;
  }

  toString() {
    return this.orientations[this.index].toString();
  }

  rotateRight(): Tetromino {
    const nextIndex = (this.index + 1) % this.orientations.length;
    return new Tetromino(this.orientations, nextIndex);
  }

  rotateLeft(): Tetromino {
    const previousIndex = (this.index - 1 + this.orientations.length) % this.orientations.length;
    return new Tetromino(this.orientations, previousIndex);
  }
}

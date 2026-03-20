import { RotatingShape } from "./RotatingShape";
import { Shape } from "./Shape";

export class Tetromino implements Shape {
  private readonly orientations: RotatingShape[];
  private readonly index: number;

  public static readonly T_SHAPE = Tetromino.create(
    `.T.
     TTT
     ...`,
    4
  );

  public static readonly I_SHAPE = Tetromino.create(
    `.....
     .....
     IIII.
     .....
     .....`,
    2
  );

  public static readonly O_SHAPE = Tetromino.create(
    `.OO
     .OO
     ...`,
    1
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

  width(): number {
    return this.orientations[this.index].width();
  }

  height(): number {
    return this.orientations[this.index].height();
  }

  cellAt(row: number, col: number): string {
    return this.orientations[this.index].cellAt(row, col);
  }
}

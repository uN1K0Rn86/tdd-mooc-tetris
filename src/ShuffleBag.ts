import { Shape } from "./Shape";

export class ShuffleBag {
  constructor(
    private pieces: Shape[] = [],
    private currentPosition: number = -1
  ) {}

  next() {
    if (this.currentPosition < 1) {
      this.currentPosition = this.pieces.length - 1;
    }
    return this.pieces[0];
  }

  add(piece: Shape, count: number) {
    for (let i = 0; i < count; i++) {
      this.pieces.push(piece);
    }
  }
}

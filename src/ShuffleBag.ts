import { Shape } from "./Shape";

export class ShuffleBag {
  constructor(private pieces: Shape[] = []) {}

  next() {
    return this.pieces[0];
  }

  add(piece: Shape, count: number) {
    for (let i = 0; i < count; i++) {
      this.pieces.push(piece);
    }
  }
}

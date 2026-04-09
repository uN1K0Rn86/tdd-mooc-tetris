import { Shape } from "./Shape";

export class ShuffleBag {
  constructor(
    private pieces: Shape[] = [],
    private currentPosition: number = -1
  ) {}

  next() {
    if (this.currentPosition < 0) {
      this.currentPosition = this.pieces.length - 1;
    }

    let pos = Math.floor(Math.random() * this.currentPosition);
    const currentItem = this.pieces[pos];
    this.pieces[pos] = this.pieces[this.currentPosition];
    this.pieces[this.currentPosition] = currentItem;
    this.currentPosition--;

    return currentItem;
  }

  add(piece: Shape, count: number) {
    for (let i = 0; i < count; i++) {
      this.pieces.push(piece);
    }
  }
}

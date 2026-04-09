import { ArikaTetromino } from "./ArikaTetromino";

export class ShuffleBag {
  constructor(private pieces: ArikaTetromino[]) {}

  next() {
    return this.pieces[0];
  }
}

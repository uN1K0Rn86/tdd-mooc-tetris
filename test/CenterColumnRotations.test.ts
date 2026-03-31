import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board";
import { XShape } from "../src/XShape";
import { ArikaTetromino } from "../src/ArikaTetromino";

export function xShapeToMiddle(board: Board) {
  board.drop(new XShape());
  board.tick();
  board.tick();
  board.tick();
  (board as any).lockActiveBlock();
}

describe("Center column rotations: ", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("L-Shape: ", () => {
    test("fail when 8-square is occupied", () => {
      xShapeToMiddle(board);
      board.drop(ArikaTetromino.L_SHAPE);
      console.log(board.toString());
    });
  });
});

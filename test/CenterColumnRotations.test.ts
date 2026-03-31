import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
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

describe("Center column rotations", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("for the L-Shape", () => {
    test("fail when 8-square is occupied (left)", () => {
      xShapeToMiddle(board);
      board.drop(ArikaTetromino.L_SHAPE);
      board.tick();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ...LLL....
         ...LX.....
         ..........
         ..........`
      );
    });
  });
});

import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { XShape } from "../src/XShape";
import { ArikaTetromino } from "../src/ArikaTetromino";
import { Shape } from "../src/Shape";

export function xShapeToMiddle(board: Board) {
  board.drop(new XShape());
  board.tick();
  board.tick();
  board.tick();
  (board as any).lockActiveBlock();
}

export function shapeBelowX(shape: Shape, board: Board) {
  board.drop(shape);
  board.moveLeft();
  board.moveLeft();
  board.tick();
  board.tick();
  board.tick();
  board.tick();
  board.moveRight();
  board.moveRight();
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

    test("fail when 8-square is occupied (right)", () => {
      xShapeToMiddle(board);
      board.drop(ArikaTetromino.L_SHAPE);
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ...LLL....
         ...LX.....
         ..........
         ..........`
      );
    });

    test("fail when 2-square is occupied (left)", () => {
      xShapeToMiddle(board);
      shapeBelowX(ArikaTetromino.L_SHAPE, board);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....X.....
         ...LLL....
         ...L......`
      );
    });

    test("fail when 2-square is occupied (right)", () => {
      xShapeToMiddle(board);
      shapeBelowX(ArikaTetromino.L_SHAPE, board);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....X.....
         ...LLL....
         ...L......`
      );
    });
  });
});

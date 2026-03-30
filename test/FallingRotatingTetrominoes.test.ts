import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Falling rotating tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("can be rotated", () => {
    test("to the left", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `....T.....
         ...TT.....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });

    test("to the right", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `....T.....
         ....TT....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });
  });

  describe("cannot be rotated when there is no room", () => {
    test("to the left", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveDown();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T.....
         ...TTT....`
      );
    });

    test("to the right", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveDown();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T.....
         ...TTT....`
      );
    });
  });

  describe("can be wall kicked when rotating", () => {
    test.skip("to the left", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.rotateRight();
      board.moveLeft();
      board.rotateLeft();

      console.log(board.toString());
      expect(board.toString()).to.equalShape(
        `.T........
         TTT.......
         ..........
         ..........
         ..........
         ..........`
      );
    });
  });
});

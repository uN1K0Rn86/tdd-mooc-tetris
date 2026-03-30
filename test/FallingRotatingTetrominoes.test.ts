import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { ArikaTetromino } from "../src/ArikaTetromino";
import { moveFarLeft, moveFarRight } from "./FallingTetrominoes.test";

export function dropTShapeAndLock(board: Board) {
  board.drop(ArikaTetromino.T_SHAPE);
  board.moveDown();
  board.tick();
}

describe("Falling rotating tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("can be rotated", () => {
    test("to the left", () => {
      board.drop(ArikaTetromino.T_SHAPE);
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `....T.....
         ....TT....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });

    test("to the right", () => {
      board.drop(ArikaTetromino.T_SHAPE);
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `....T.....
         ...TT.....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });
  });

  describe("cannot be rotated when there is no room", () => {
    test("to the left", () => {
      board.drop(ArikaTetromino.T_SHAPE);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `...TTT....
         ....T.....
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("to the right", () => {
      board.drop(ArikaTetromino.T_SHAPE);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `...TTT....
         ....T.....
         ..........
         ..........
         ..........
         ..........`
      );
    });
  });

  describe("can be wall kicked when rotating", () => {
    test("to the left", () => {
      board.drop(ArikaTetromino.T_SHAPE);
      moveFarLeft(board);
      board.tick();
      board.rotateRight();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         TTT.......
         .T........
         ..........
         ..........
         ..........`
      );
    });

    test("to the right", () => {
      board.drop(ArikaTetromino.T_SHAPE);
      moveFarRight(board);
      board.tick();
      board.rotateLeft();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         .......TTT
         ........T.
         ..........
         ..........
         ..........`
      );
    });

    test("to the left (against another block)", () => {
      dropTShapeAndLock(board);
      dropTShapeAndLock(board);
      board.drop(ArikaTetromino.T_SHAPE);
      moveFarRight(board);
      board.tick();
      board.rotateRight();
      board.moveLeft();
      board.tick();
      board.tick();
      board.moveLeft();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ...TTT....
         ....TTTT..
         ...TTTT...
         ....T.....`
      );
    });

    test("to the right (against another block)", () => {
      dropTShapeAndLock(board);
      dropTShapeAndLock(board);
      board.drop(ArikaTetromino.T_SHAPE);
      moveFarLeft(board);
      board.tick();
      board.rotateLeft();
      board.tick();
      board.tick();
      board.moveRight();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ...TTT....
         .TTTT.....
         ..TTTT....
         ....T.....`
      );
    });
  });
});

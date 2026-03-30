import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";
import { ArikaTetromino } from "../src/ArikaTetromino";
import { moveFarLeft } from "./FallingTetrominoes.test";

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
      board.drop(Tetromino.T_SHAPE);
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.rotateLeft();
      board.moveRight();
      board.moveRight();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("to the left (against another block)", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveDown();
      board.tick();
      board.drop(Tetromino.T_SHAPE);
      board.moveDown();
      board.tick();
      board.drop(Tetromino.T_SHAPE);
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.rotateRight();
      board.moveLeft();
      board.tick();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T..T..
         ...TTTTTT.
         ....T.....
         ...TTT....`
      );
    });

    test("to the right (against another block)", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveDown();
      board.tick();
      board.drop(Tetromino.T_SHAPE);
      board.moveDown();
      board.tick();
      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.rotateLeft();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         .T..T.....
         TTTTTT....
         ....T.....
         ...TTT....`
      );
    });
  });
});

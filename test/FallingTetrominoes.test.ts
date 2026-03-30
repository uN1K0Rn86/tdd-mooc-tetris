import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";
import { ArikaTetromino } from "../src/ArikaTetromino";

function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("start from the top middle", () => {
    board.drop(ArikaTetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("start from the top middle (I-Shape)", () => {
    board.drop(ArikaTetromino.I_SHAPE);

    expect(board.toString()).to.equalShape(
      `...IIII...
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("stop when they hit the bottom", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  test("stop when they land on another block", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });
});

describe("Moving falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(ArikaTetromino.T_SHAPE);
  });

  describe("can be moved", () => {
    test("left", () => {
      board.moveLeft();

      expect(board.toString()).to.equalShape(
        `..TTT.....
         ...T......
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("right", () => {
      board.moveRight();

      expect(board.toString()).to.equalShape(
        `....TTT...
         .....T....
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("down", () => {
      board.moveDown();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ...TTT....
         ....T.....`
      );
    });
  });

  describe("cannot be moved beyond the board", () => {
    test("to the left", () => {
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();

      expect(board.toString()).to.equalShape(
        `TTT.......
         .T........
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("to the right", () => {
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();

      expect(board.toString()).to.equalShape(
        `.......TTT
         ........T.
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("downward", () => {
      board.moveDown();
      board.moveDown();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ...TTT....
         ....T.....`
      );
    });
  });

  describe("cannot be moved through other blocks", () => {
    test("to the left", () => {
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.moveDown();
      board.tick();
      board.drop(ArikaTetromino.T_SHAPE);
      board.moveDown();
      board.moveLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         TTTTTT....
         .T..T.....`
      );
    });

    test("to the right", () => {
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveDown();
      board.tick();
      board.drop(ArikaTetromino.T_SHAPE);
      board.moveDown();
      board.moveRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ...TTTTTT.
         ....T..T..`
      );
    });

    test("downward", () => {
      board.moveDown();
      board.tick();
      board.drop(ArikaTetromino.T_SHAPE);
      board.moveDown();
      board.tick();
      board.drop(ArikaTetromino.T_SHAPE);
      board.moveDown();
      board.moveDown();

      expect(board.toString()).to.equalShape(
        `...TTT....
         ....T.....
         ...TTT....
         ....T.....
         ...TTT....
         ....T.....`
      );
    });
  });
});

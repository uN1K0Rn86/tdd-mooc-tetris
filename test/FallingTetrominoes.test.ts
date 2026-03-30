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
    console.log(board.toString());

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
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  test("stop when they land on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });
});

describe("Moving falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
  });

  describe("can be moved", () => {
    test("left", () => {
      board.moveLeft();

      expect(board.toString()).to.equalShape(
        `...T......
         ..TTT.....
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("right", () => {
      board.moveRight();

      expect(board.toString()).to.equalShape(
        `.....T....
         ....TTT...
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
         ....T.....
         ...TTT....`
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
        `.T........
         TTT.......
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
        `........T.
         .......TTT
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
         ....T.....
         ...TTT....`
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
      board.drop(Tetromino.T_SHAPE);
      board.moveDown();
      board.moveLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         .T..T.....
         TTTTTT....`
      );
    });

    test("to the right", () => {
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveDown();
      board.tick();
      board.drop(Tetromino.T_SHAPE);
      board.moveDown();
      board.moveRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T..T..
         ...TTTTTT.`
      );
    });

    test("downward", () => {
      board.moveDown();
      board.tick();
      board.drop(Tetromino.T_SHAPE);
      board.moveDown();
      board.tick();
      board.drop(Tetromino.T_SHAPE);
      board.moveDown();
      board.moveDown();

      expect(board.toString()).to.equalShape(
        `....T.....
         ...TTT....
         ....T.....
         ...TTT....
         ....T.....
         ...TTT....`
      );
    });
  });
});

import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { ArikaTetromino } from "../src/ArikaTetromino";

export function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

export function moveFarLeft(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}

export function moveFarRight(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
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
         ...TTT....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });
  });

  describe("cannot be moved beyond the board", () => {
    test("to the left", () => {
      moveFarLeft(board);

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
      moveFarRight(board);

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
      for (let i = 0; i < 4; i++) {
        board.moveDown();
      }
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
      moveFarLeft(board);
      fallToBottom(board);
      board.drop(ArikaTetromino.T_SHAPE);
      for (let i = 0; i < 4; i++) {
        board.moveDown();
      }
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
      moveFarRight(board);
      fallToBottom(board);
      board.drop(ArikaTetromino.T_SHAPE);
      for (let i = 0; i < 4; i++) {
        board.moveDown();
      }
      board.moveRight();
      board.moveRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....TTTTTT
         .....T..T.`
      );
    });

    test("downward", () => {
      fallToBottom(board);
      board.drop(ArikaTetromino.T_SHAPE);
      for (let i = 0; i < 4; i++) {
        board.moveDown();
      }

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
});

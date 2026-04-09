import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { XShape } from "../src/XShape";
import { ArikaTetromino } from "../src/ArikaTetromino";
import { fallToBottom } from "./FallingTetrominoes.test";

function fillAllButRight(board: Board) {
  for (let col = 0; col < board.width - 1; col++) {
    board.drop(new XShape());
    while ((board as any).activeCol !== col && (board as any).activeRow !== null) {
      if ((board as any).activeCol < col) board.moveRight();
      else board.moveLeft();
    }
    fallToBottom(board);
  }
}

describe("Clearing lines: ", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 10);
  });

  test("is cleared when filled by a block", () => {
    fillAllButRight(board);
    board.drop(ArikaTetromino.T_SHAPE);
    board.tick();
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       .........T
       ........TT`
    );
  });

  test("2 lines are cleared when filled simultaneously", () => {
    fillAllButRight(board);
    fillAllButRight(board);
    board.drop(ArikaTetromino.I_SHAPE);
    board.tick();
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       .........I
       .........I`
    );
  });

  test("lines are not cleared when ticking but not locking in place", () => {
    fillAllButRight(board);
    fillAllButRight(board);
    fillAllButRight(board);
    fillAllButRight(board);
    fillAllButRight(board);
    fillAllButRight(board);
    board.drop(ArikaTetromino.I_SHAPE);
    board.tick();
    board.rotateLeft();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.tick();
    board.tick();
    board.tick();
    board.tick();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       XXXXXXXXXI
       XXXXXXXXXI
       XXXXXXXXXI
       XXXXXXXXXI
       XXXXXXXXX.
       XXXXXXXXX.`
    );
  });
});

import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { XShape } from "../src/XShape";
import { ArikaTetromino } from "../src/ArikaTetromino";

function fillAllButRight(board: Board) {
  for (let col = 0; col < board.width - 1; col++) {
    board.drop(new XShape());
    while ((board as any).activeCol !== col && (board as any).activeRow !== null) {
      if ((board as any).activeCol < col) board.moveRight();
      else board.moveLeft();
    }
    board.moveDown();
    board.tick();
  }
}

describe("Line", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
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
    board.moveDown();
    board.tick();

    console.log(board.toString());
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .........T
       ........TT`
    );
  });
});

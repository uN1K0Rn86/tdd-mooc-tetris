import { describe, it, vi, beforeEach, expect } from "vitest";
import { Board } from "../src/Board";
import { fillAllButRight } from "./ClearingLines.test";
import { fallToBottom } from "./FallingTetrominoes.test";
import { XShape } from "../src/XShape";

export function triggerLineClear(board: Board) {
  fillAllButRight(board);
  board.drop(new XShape());
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
  fallToBottom(board);
}

describe("Observers for Board", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 10);
  });

  it("can be added", () => {
    const mockObserver = { onLineClear: vi.fn() };
    board.addObserver(mockObserver);

    expect((board as any).subscribers).to.include(mockObserver);
  });
});

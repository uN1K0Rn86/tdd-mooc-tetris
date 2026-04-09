import { describe, it, vi, beforeEach, expect } from "vitest";
import { Board } from "../src/Board";
import { fillAllButRight } from "./ClearingLines.test";
import { fallToBottom } from "./FallingTetrominoes.test";
import { XShape } from "../src/XShape";
import { NintendoScoringSystem } from "../src/NintendoScoringSystem";
import { ArikaTetromino } from "../src/ArikaTetromino";

export function triggerLineClear(board: Board) {
  fillAllButRight(board);
  board.drop(new XShape());
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
  fallToBottom(board);
}

export function clearNLines(board: Board, n: number) {
  for (let i = 0; i < n; i++) {
    fillAllButRight(board);
  }
  board.drop(ArikaTetromino.I_SHAPE);
  board.tick();
  board.rotateLeft();
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
    const mockObserver = { points: 0, onLineClear: vi.fn() };
    board.addObserver(mockObserver);

    expect((board as any).subscribers).to.include(mockObserver);
  });

  it("can be removed", () => {
    const mockObserver = { points: 0, onLineClear: vi.fn() };
    board.addObserver(mockObserver);

    expect((board as any).subscribers).to.include(mockObserver);

    board.removeObserver(mockObserver);
    expect((board as any).subscribers).toEqual([]);
  });
});

describe("Nintendo scoring system", () => {
  let scoringSystem: NintendoScoringSystem;
  let board: Board;
  beforeEach(() => {
    scoringSystem = new NintendoScoringSystem();
    board = new Board(10, 10);
    board.addObserver(scoringSystem);
  });

  it("has a callable method to update when lines are cleared", () => {
    const spy = vi.spyOn(scoringSystem, "onLineClear");
    scoringSystem.onLineClear(1, 0);

    expect(scoringSystem.onLineClear).toHaveBeenCalledTimes(1);
  });

  it("is notified when a line is cleared", () => {
    const spy = vi.spyOn(scoringSystem, "onLineClear");
    triggerLineClear(board);

    expect(scoringSystem.onLineClear).toHaveBeenCalled();
  });

  it("keeps track of points", () => {
    expect(scoringSystem.points).toBe(0);
  });

  it("adds 40 points for clearing 1 line on level 0", () => {
    triggerLineClear(board);

    expect(scoringSystem.points).toBe(40);
  });

  it("adds 100 points for clearing 2 lines on level 0", () => {
    clearNLines(board, 2);
    expect(scoringSystem.points).toBe(100);
  });

  it("adds 300 points for clearing 3 lines on level 0", () => {
    clearNLines(board, 3);
    expect(scoringSystem.points).toBe(300);
  });

  it("adds 1200 points for clearing 4 lines on level 0", () => {
    clearNLines(board, 4);
    expect(scoringSystem.points).toBe(1200);
  });
});

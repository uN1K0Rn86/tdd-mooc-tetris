import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { XShape } from "../src/XShape";
import { ArikaTetromino } from "../src/ArikaTetromino";
import { Shape } from "../src/Shape";

export function xShapeToMiddle(board: Board) {
  board.drop(new XShape());
  board.tick();
  board.tick();
  board.tick();
  (board as any).lockActiveBlock();
}

export function shapeBelowX(shape: Shape, board: Board, rotated: boolean) {
  board.drop(shape);
  board.moveLeft();
  board.moveLeft();
  board.tick();
  board.tick();
  if (rotated) {
    board.rotateLeft();
    board.rotateLeft();
  }
  board.tick();
  board.tick();
  board.moveRight();
  board.moveRight();
}

export function blockedFiveSquare(shape: ArikaTetromino, board: Board) {
  board.drop(shape);
  if (shape.variant === "L") {
    board.moveRight();
    board.moveRight();
  } else {
    board.moveLeft();
    board.moveLeft();
  }
  board.tick();
  board.tick();
  board.rotateRight();
  board.rotateRight();
  board.tick();
  if (shape.variant === "L") {
    board.moveLeft();
    board.moveLeft();
  } else {
    board.moveRight();
    board.moveRight();
  }
}

describe("Center column rotations", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("for the L-Shape", () => {
    test("fail when 8-square is occupied (left)", () => {
      xShapeToMiddle(board);
      board.drop(ArikaTetromino.L_SHAPE);
      board.tick();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ...LLL....
         ...LX.....
         ..........
         ..........`
      );
    });

    test("fail when 8-square is occupied (right)", () => {
      xShapeToMiddle(board);
      board.drop(ArikaTetromino.L_SHAPE);
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ...LLL....
         ...LX.....
         ..........
         ..........`
      );
    });

    test("fail when 2-square is occupied (left)", () => {
      xShapeToMiddle(board);
      shapeBelowX(ArikaTetromino.L_SHAPE, board, false);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....X.....
         ...LLL....
         ...L......`
      );
    });

    test("fail when 2-square is occupied (right)", () => {
      xShapeToMiddle(board);
      shapeBelowX(ArikaTetromino.L_SHAPE, board, false);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....X.....
         ...LLL....
         ...L......`
      );
    });

    test("fail when 2-square is occupied (upside-down piece, left rotation)", () => {
      xShapeToMiddle(board);
      shapeBelowX(ArikaTetromino.L_SHAPE, board, true);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....X.....
         .....L....
         ...LLL....`
      );
    });

    test("fail when 2-square is occupied (upside-down piece, right rotation)", () => {
      xShapeToMiddle(board);
      shapeBelowX(ArikaTetromino.L_SHAPE, board, true);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....X.....
         .....L....
         ...LLL....`
      );
    });

    test("fail when the 5-square is occupied (left rotation)", () => {
      xShapeToMiddle(board);
      blockedFiveSquare(ArikaTetromino.L_SHAPE, board);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....XL....
         ...LLL....
         ..........`
      );
    });

    test("fail when the 5-square is occupied (right rotation)", () => {
      xShapeToMiddle(board);
      blockedFiveSquare(ArikaTetromino.L_SHAPE, board);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....XL....
         ...LLL....
         ..........`
      );
    });

    test("succeed when 1- and 8-squares are occupied (right rotation)", () => {
      xShapeToMiddle(board);
      board.drop(new XShape());
      board.moveRight();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      (board as any).lockActiveBlock();
      shapeBelowX(ArikaTetromino.L_SHAPE, board, false);
      board.moveRight();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....XLL...
         ......L...
         .....XL...`
      );
    });

    test("fail when 1- and 8-squares are occupied (left rotation)", () => {
      xShapeToMiddle(board);
      board.drop(new XShape());
      board.moveRight();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      (board as any).lockActiveBlock();
      shapeBelowX(ArikaTetromino.L_SHAPE, board, false);
      board.moveRight();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....X.....
         ....LLL...
         ....LX....`
      );
    });
  });

  describe("for the J-Shape", () => {
    test("fail when the 8-square is occupied (left rotation)", () => {
      xShapeToMiddle(board);
      board.drop(ArikaTetromino.J_SHAPE);
      board.tick();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ...JJJ....
         ....XJ....
         ..........
         ..........`
      );
    });

    test("fail when the 8-square is occupied (right rotation)", () => {
      xShapeToMiddle(board);
      board.drop(ArikaTetromino.J_SHAPE);
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ...JJJ....
         ....XJ....
         ..........
         ..........`
      );
    });

    test("fail when 2-square is occupied (left)", () => {
      xShapeToMiddle(board);
      shapeBelowX(ArikaTetromino.J_SHAPE, board, false);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....X.....
         ...JJJ....
         .....J....`
      );
    });

    test("fail when 2-square is occupied (right)", () => {
      xShapeToMiddle(board);
      shapeBelowX(ArikaTetromino.J_SHAPE, board, false);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....X.....
         ...JJJ....
         .....J....`
      );
    });

    test("fail when 2-square is occupied (upside-down piece, left rotation)", () => {
      xShapeToMiddle(board);
      shapeBelowX(ArikaTetromino.J_SHAPE, board, true);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....X.....
         ...J......
         ...JJJ....`
      );
    });

    test("fail when 2-square is occupied (upside-down piece, right rotation)", () => {
      xShapeToMiddle(board);
      shapeBelowX(ArikaTetromino.J_SHAPE, board, true);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....X.....
         ...J......
         ...JJJ....`
      );
    });

    test("fail when the 5-square is occupied (left rotation)", () => {
      xShapeToMiddle(board);
      blockedFiveSquare(ArikaTetromino.J_SHAPE, board);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ...JX.....
         ...JJJ....
         ..........`
      );
    });

    test("fail when the 5-square is occupied (right rotation)", () => {
      xShapeToMiddle(board);
      blockedFiveSquare(ArikaTetromino.J_SHAPE, board);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ...JX.....
         ...JJJ....
         ..........`
      );
    });
  });
});

import { describe, it } from "vitest";
import { ArikaTetromino } from "../src/ArikaTetromino";
import { ShuffleBag } from "../src/ShuffleBag";
import { expect } from "chai";

describe("Shuffle bag", () => {
  it("returns an ArikaTetromino", () => {
    const pieces = [
      ArikaTetromino.I_SHAPE,
      ArikaTetromino.J_SHAPE,
      ArikaTetromino.L_SHAPE,
      ArikaTetromino.O_SHAPE,
      ArikaTetromino.S_SHAPE,
      ArikaTetromino.T_SHAPE,
      ArikaTetromino.Z_SHAPE,
    ];
    const bag = new ShuffleBag(pieces);

    const result = bag.next();

    expect(pieces).to.include(result);
  });
});

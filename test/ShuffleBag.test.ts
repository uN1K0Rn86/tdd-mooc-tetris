import { describe, it } from "vitest";
import { ArikaTetromino } from "../src/ArikaTetromino";
import { ShuffleBag } from "../src/ShuffleBag";
import { expect } from "chai";

export function addThousandEach(bag: ShuffleBag) {
  bag.add(ArikaTetromino.I_SHAPE, 1000);
  bag.add(ArikaTetromino.J_SHAPE, 1000);
  bag.add(ArikaTetromino.L_SHAPE, 1000);
  bag.add(ArikaTetromino.O_SHAPE, 1000);
  bag.add(ArikaTetromino.S_SHAPE, 1000);
  bag.add(ArikaTetromino.T_SHAPE, 1000);
  bag.add(ArikaTetromino.Z_SHAPE, 1000);
}

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

  it("can be added to", () => {
    const bag = new ShuffleBag();
    const iShape = ArikaTetromino.I_SHAPE;

    bag.add(iShape, 1);

    expect((bag as any).pieces).to.include(iShape);
  });

  it("current position defaults to last item in bag after calling next()", () => {
    const bag = new ShuffleBag();
    addThousandEach(bag);
    bag.next();
    expect((bag as any).pieces[(bag as any).currentPosition]).to.be.equal(ArikaTetromino.Z_SHAPE);
  });

  it("returns every item in bag before starting over", () => {
    const bag = new ShuffleBag();
    addThousandEach(bag);

    const takenPieces = [];
    for (let i = 0; i < 7000; i++) {
      takenPieces.push(bag.next());
    }

    expect(takenPieces.filter((p) => p === ArikaTetromino.I_SHAPE)).to.have.length(1000);
    expect(takenPieces.filter((p) => p === ArikaTetromino.J_SHAPE)).to.have.length(1000);
    expect(takenPieces.filter((p) => p === ArikaTetromino.L_SHAPE)).to.have.length(1000);
    expect(takenPieces.filter((p) => p === ArikaTetromino.O_SHAPE)).to.have.length(1000);
    expect(takenPieces.filter((p) => p === ArikaTetromino.S_SHAPE)).to.have.length(1000);
    expect(takenPieces.filter((p) => p === ArikaTetromino.T_SHAPE)).to.have.length(1000);
    expect(takenPieces.filter((p) => p === ArikaTetromino.Z_SHAPE)).to.have.length(1000);
  });
});

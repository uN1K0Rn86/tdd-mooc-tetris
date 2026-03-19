export class RotatingShape {
  private readonly cells: string[][];

  constructor(cells: string[][]) {
    this.cells = cells.map((row) => [...row]);
  }

  fromString(str: string): RotatingShape {
    const rows = str.split("\n").map((row) => row.trim().split(""));
    return new RotatingShape(rows);
  }
}

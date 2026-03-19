export class RotatingShape {
  private readonly cells: string[][];

  constructor(cells: string[][]) {
    this.cells = cells.map((row) => [...row]);
  }
}

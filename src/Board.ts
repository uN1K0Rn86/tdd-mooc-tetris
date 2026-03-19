export class Board {
  width;
  height;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const rows: string[] = [];

    for (let i = 0; i < this.height; i++) {
      rows.push(".".repeat(this.width));
    }
    return rows.join("\n") + "\n";
  }
}

export class XShape {
  private readonly name: string;

  constructor(name: string = "X") {
    this.name = name;
  }

  toString() {
    return this.name;
  }

  rotateRight() {
    return this;
  }

  rotateLeft() {
    return this;
  }
}

import { Shape } from "./Shape";

export class XShape implements Shape {
  private readonly name: string;

  constructor(name: string = "X") {
    this.name = name;
  }

  width() {
    return 1;
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

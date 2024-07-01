import { Piece } from "./piece";

export class King implements Piece {
  #color;

  get cost() {
    return Infinity;
  }

  get color() {
    return this.#color;
  }

  get name() {
    return "king";
  }

  constructor(color: PlayerColor) {
    this.#color = color;
  }
}

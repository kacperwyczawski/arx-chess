import { Piece } from "./piece";

export class Knight implements Piece {
    #color;

    get cost() {
        return 3;
    }

    get color() {
        return this.#color;
    }

    get name() {
        return "knight";
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

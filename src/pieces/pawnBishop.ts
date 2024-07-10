import { Piece } from "./piece";

export class PawnBishop implements Piece {
    #color;

    get cost() {
        return 1 + 3;
    }

    get color() {
        return this.#color;
    }

    get name() {
        return "pawnbishop";
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

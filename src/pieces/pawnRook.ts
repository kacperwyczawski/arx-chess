import { Piece } from "./piece";

export class PawnRook implements Piece {
    #color;

    get cost() {
        return 1 + 5;
    }

    get color() {
        return this.#color;
    }

    get name() {
        return "pawnrook";
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

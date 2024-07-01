import { Piece } from "./piece";

export class Pawn implements Piece {
    #color;

    get cost() {
        return 1;
    }

    get color() {
        return this.#color;
    }

    get name() {
        return "pawn";
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

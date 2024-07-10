import { Piece } from "./piece";

export class KnightRook implements Piece {
    #color;

    get cost() {
        return 3 + 5;
    }

    get color() {
        return this.#color;
    }

    get name() {
        return "knightrook";
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

import { Piece } from "./piece";

export class PawnKnight implements Piece {
    #color;

    get cost() {
        return 1 + 3;
    }

    get color() {
        return this.#color;
    }

    get name() {
        return "pawnknight";
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

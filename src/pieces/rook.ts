import { Piece } from "./piece";


export class Rook implements Piece {
    #color;

    get cost() {
        return 5;
    }

    get color() {
        return this.#color;
    }

    get name() {
        return "rook";
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

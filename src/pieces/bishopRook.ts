import { Piece } from "./piece";


export class BishopRook implements Piece {
    #color;

    get cost() {
        return 3 + 5;
    }

    get color() {
        return this.#color;
    }

    get name() {
        return "bishoprook";
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

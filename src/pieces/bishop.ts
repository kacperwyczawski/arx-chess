import { Piece } from "./piece";


export class Bishop implements Piece {
    #color;

    get cost() {
        return 3;
    }

    get color() {
        return this.#color;
    }

    get name() {
        return "bishop"
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

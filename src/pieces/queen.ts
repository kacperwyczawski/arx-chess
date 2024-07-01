import { Piece } from "./piece";


export class Queen implements Piece {
    #color;

    get cost() {
        return 9;
    }

    get color() {
        return this.#color;
    }

    get name() {
        return "queen";
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

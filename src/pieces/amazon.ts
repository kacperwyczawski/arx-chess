import { Piece } from "./piece";

export class Amazon implements Piece {
    #color;

    get cost() {
        return 3 + 3 + 5;
    }

    get color() {
        return this.#color;
    }

    get name() {
        return "amazon";
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

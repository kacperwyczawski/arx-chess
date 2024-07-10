import { Piece } from "./piece";


export class BishopKnight implements Piece {
    #color;

    get cost() {
        return 3 + 3;
    }

    get color() {
        return this.#color;
    }

    get name() {
        return "bishopknight";
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

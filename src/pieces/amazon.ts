import { BishopKnight } from "./bishopKnight";
import { BishopRook } from "./bishopRook";
import { KnightRook } from "./knightRook";
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

    get requirements() {
        return new Set<Piece>([
            new KnightRook(this.#color),
            new BishopKnight(this.#color),
            new BishopRook(this.#color),
        ])
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

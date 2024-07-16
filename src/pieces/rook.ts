import { Bishop } from "./bishop";
import { Knight } from "./knight";
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

    get requirements() {
        return new Set<Piece>([
            new Bishop(this.#color),
            new Knight(this.#color),
        ]);
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

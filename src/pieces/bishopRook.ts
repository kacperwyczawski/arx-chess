import { Bishop } from "./bishop";
import type { Piece } from "./piece";
import { Rook } from "./rook";

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

	get requirements() {
		return new Set<Piece>([new Bishop(this.#color), new Rook(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}
}

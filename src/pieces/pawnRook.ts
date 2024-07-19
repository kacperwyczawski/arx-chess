import type { Piece } from "./piece";
import { Rook } from "./rook";

export class PawnRook implements Piece {
	#color;

	get cost() {
		return 1 + 5;
	}

	get color() {
		return this.#color;
	}

	get name() {
		return "pawnrook";
	}

	get requirements() {
		return new Set<Piece>([new Rook(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}
}

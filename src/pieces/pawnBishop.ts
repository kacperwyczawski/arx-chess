import { Bishop } from "./bishop";
import type { Piece } from "./piece";

export class PawnBishop implements Piece {
	#color;

	get cost() {
		return 1 + 3;
	}

	get color() {
		return this.#color;
	}

	get name() {
		return "pawnbishop";
	}

	get requirements() {
		return new Set<Piece>([new Bishop(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}
}

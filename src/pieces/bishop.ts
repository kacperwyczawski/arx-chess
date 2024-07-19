import { Pawn } from "./pawn";
import type { Piece } from "./piece";

export class Bishop implements Piece {
	#color;

	get cost() {
		return 3;
	}

	get color() {
		return this.#color;
	}

	get name() {
		return "bishop";
	}

	get requirements() {
		return new Set<Piece>([new Pawn(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}
}

import { Knight } from "./knight";
import type { Piece } from "./piece";

export class PawnKnight implements Piece {
	#color;

	get cost() {
		return 1 + 3;
	}

	get color() {
		return this.#color;
	}

	get name() {
		return "pawn-knight";
	}

	get requirements() {
		return new Set<Piece>([new Knight(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}
}

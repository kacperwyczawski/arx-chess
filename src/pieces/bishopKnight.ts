import { Bishop } from "./bishop";
import { Knight } from "./knight";
import type { Piece } from "./piece";

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

	get requirements() {
		return new Set<Piece>([new Bishop(this.#color), new Knight(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}
}

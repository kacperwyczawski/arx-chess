import type { OldCell } from "../cell";
import { Knight } from "./knight";
import { Pawn } from "./pawn";
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

	highlightMoves(cells: OldCell[][], x: number, y: number): void {
		new Pawn(this.#color).highlightMoves(cells, x, y);
		new Knight(this.#color).highlightMoves(cells, x, y);
	}
}

import { Cell } from "../cell";
import { Pawn } from "./pawn";
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
		return "pawn-rook";
	}

	get requirements() {
		return new Set<Piece>([new Rook(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}

	highlightMoves(cells: Cell[][], x: number, y: number): void {
		new Pawn(this.#color).highlightMoves(cells, x, y)
		new Rook(this.#color).highlightMoves(cells, x, y)
	}
}

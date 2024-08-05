import { Cell } from "../cell";
import { Knight } from "./knight";
import type { Piece } from "./piece";
import { Rook } from "./rook";

export class KnightRook implements Piece {
	#color;

	get cost() {
		return 3 + 5;
	}

	get color() {
		return this.#color;
	}

	get name() {
		return "knight-rook";
	}

	get requirements() {
		return new Set<Piece>([new Knight(this.#color), new Rook(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}

	highlightMoves(cells: Cell[][], x: number, y: number): void {
		new Knight(this.#color).highlightMoves(cells, x, y)
		new Rook(this.#color).highlightMoves(cells, x, y)
	}
}

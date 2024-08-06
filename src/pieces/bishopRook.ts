import type { Cell } from "../cell";
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
		return "bishop-rook";
	}

	get requirements() {
		return new Set<Piece>([new Bishop(this.#color), new Rook(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}

	highlightMoves(cells: Cell[][], x: number, y: number): void {
		new Rook(this.#color).highlightMoves(cells, x, y);
		new Bishop(this.#color).highlightMoves(cells, x, y);
	}
}

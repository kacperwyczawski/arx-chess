import type { Cell } from "../cell";
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
		return "bishop-knight";
	}

	get requirements() {
		return new Set<Piece>([new Bishop(this.#color), new Knight(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}

	highlightMoves(cells: Cell[][], x: number, y: number): void {
		new Knight(this.#color).highlightMoves(cells, x, y);
		new Bishop(this.#color).highlightMoves(cells, x, y);
	}
}

import type { OldCell } from "../cell";
import { Bishop } from "./bishop";
import { Pawn } from "./pawn";
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
		return "pawn-bishop";
	}

	get requirements() {
		return new Set<Piece>([new Bishop(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}

	highlightMoves(cells: OldCell[][], x: number, y: number): void {
		new Pawn(this.#color).highlightMoves(cells, x, y);
		new Bishop(this.#color).highlightMoves(cells, x, y);
	}
}

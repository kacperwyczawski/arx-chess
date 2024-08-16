import type { OldCell } from "../cell";
import { Bishop } from "./bishop";
import { BishopKnight } from "./bishopKnight";
import { BishopRook } from "./bishopRook";
import { Knight } from "./knight";
import { KnightRook } from "./knightRook";
import type { Piece } from "./piece";
import { Rook } from "./rook";

export class Amazon implements Piece {
	#color;

	get cost() {
		return 3 + 3 + 5;
	}

	get color() {
		return this.#color;
	}

	get name() {
		return "amazon";
	}

	get requirements() {
		return new Set<Piece>([
			new KnightRook(this.#color),
			new BishopKnight(this.#color),
			new BishopRook(this.#color),
		]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}

	highlightMoves(cells: OldCell[][], x: number, y: number): void {
		new Knight(this.#color).highlightMoves(cells, x, y);
		new Rook(this.#color).highlightMoves(cells, x, y);
		new Bishop(this.#color).highlightMoves(cells, x, y);
	}
}

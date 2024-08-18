import type { OldCell } from "../cell";
import type Board from "../game/board";
import type { Point } from "../game/point";
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

	getAvailableMoves(board: Board, point: Point): Point[] {
		return [
			...new Knight(this.#color).getAvailableMoves(board, point),
			...new Rook(this.#color).getAvailableMoves(board, point),
		];
	}
}

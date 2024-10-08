import type Board from "../game/board";
import type { Point } from "../game/point";
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
	getAvailableMoves(board: Board, point: Point): Point[] {
		return [
			...new Pawn(this.#color).getAvailableMoves(board, point),
			...new Knight(this.#color).getAvailableMoves(board, point),
		];
	}
}

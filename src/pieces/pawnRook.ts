import type { OldCell } from "../cell";
import Board from "../game/board";
import { Point } from "../game/point";
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

	getAvailableMoves(board: Board, point: Point) {
		// Get available moves from the Rook
		const rookMoves = new Rook(this.#color).getAvailableMoves(board, point);

		// Get available moves from the Pawn
		const pawnMoves = new Pawn(this.#color).getAvailableMoves(board, point);

		// Filter out pawn moves that overlap with rook moves
		const filteredPawnMoves = pawnMoves.filter(pawnMove =>
			!rookMoves.some(rookMove => rookMove.x === pawnMove.x && rookMove.y === pawnMove.y)
		);

		// Combine the filtered pawn moves with rook moves
		return [
			...filteredPawnMoves,
			...rookMoves
		];
	}
}



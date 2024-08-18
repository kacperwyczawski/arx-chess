import type { OldCell } from "../cell";
import Board from "../game/board";
import { Point } from "../game/point";
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
getAvailableMoves(board: Board, point: Point): Point[] {
    // Get available moves from the Bishop
    const bishopMoves = new Bishop(this.#color).getAvailableMoves(board, point);

    // Get available moves from the Pawn
    const pawnMoves = new Pawn(this.#color).getAvailableMoves(board, point);

    // Filter out pawn moves that overlap with bishop moves
    const filteredPawnMoves = pawnMoves.filter(pawnMove => 
        !bishopMoves.some(bishopMove => bishopMove.x === pawnMove.x && bishopMove.y === pawnMove.y)
    );

    // Combine the filtered pawn moves with bishop moves
    return [
        ...filteredPawnMoves,
        ...bishopMoves
    ];
}

}

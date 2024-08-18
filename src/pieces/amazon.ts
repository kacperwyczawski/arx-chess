import type { OldCell } from "../cell";
import Board from "../game/board";
import { Point } from "../game/point";
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
getAvailableMoves(board: Board, point: Point): Point[] {
    return [
        ...new Rook(this.#color).getAvailableMoves(board, point),
        ...new Bishop(this.#color).getAvailableMoves(board, point),
        ...new Knight(this.#color).getAvailableMoves(board, point)
    ];
}

}

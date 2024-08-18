import type { OldCell } from "../cell";
import Board from "../game/board";
import { Point } from "../game/point";
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
getAvailableMoves(board: Board, point: Point): Point[] {
    return [
        ...new Bishop(this.#color).getAvailableMoves(board, point),
        ...new Knight(this.#color).getAvailableMoves(board, point)
    ];
}

}

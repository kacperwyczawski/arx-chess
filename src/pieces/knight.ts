import type Board from "../game/board";
import type { Point } from "../game/point";
import { Pawn } from "./pawn";
import type { Piece } from "./piece";

export class Knight implements Piece {
	#color;

	get cost() {
		return 3;
	}

	get color() {
		return this.#color;
	}

	get name() {
		return "knight";
	}

	get requirements() {
		return new Set<Piece>([new Pawn(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}

	getAvailableMoves(board: Board, { x, y }: Point): Point[] {
		const potentialMoves: Point[] = [
			{ x: x - 2, y: y - 1 },
			{ x: x - 1, y: y - 2 },
			{ x: x + 1, y: y - 2 },
			{ x: x + 2, y: y - 1 },
			{ x: x + 2, y: y + 1 },
			{ x: x + 1, y: y + 2 },
			{ x: x - 1, y: y + 2 },
			{ x: x - 2, y: y + 1 },
		];

		const points = potentialMoves
			.filter((p) => board.cellAt(p) !== undefined)
			.filter((p) => board.cellAt(p).piece?.color !== this.#color)
			.filter((p) => board.cellAt(p).building !== "wall");

		return points;
	}
}

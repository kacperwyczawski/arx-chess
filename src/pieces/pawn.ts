import type { OldCell } from "../cell";
import type Board from "../game/board";
import type { Point } from "../game/point";
import type { Piece } from "./piece";

export class Pawn implements Piece {
	#color;

	get cost() {
		return 1;
	}

	get color() {
		return this.#color;
	}

	get name() {
		return "pawn";
	}

	get requirements() {
		return new Set<Piece>();
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}

	getAvailableMoves(board: Board, point: Point): Point[] {
		const x = point.x;
		const y = point.y;

		let points = [
			{ x: x - 1, y: y - 1 },
			{ x: x, y: y - 1 },
			{ x: x + 1, y: y - 1 },
			{ x: x + 1, y: y },
			{ x: x - 1, y: y },
			{ x: x + 1, y: y + 1 },
			{ x: x, y: y + 1 },
			{ x: x - 1, y: y + 1 },
		];

		points = points
			.filter((p) => board.cellAt(p) !== undefined)
			.filter((p) => board.cellAt(p).piece?.color !== this.#color)
			.filter((p) => board.cellAt(p).building !== "wall");

		return points;
	}
}

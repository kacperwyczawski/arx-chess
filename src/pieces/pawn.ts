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

	getAvailableMoves(board: Board, { x, y }: Point): Point[] {
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

		return points
			.filter(
				(p) => p.x >= 0 && p.x < board.width && p.y >= 0 && p.y < board.height,
			)
			.filter((p) => board.cellAt(p).piece?.color !== this.#color)
			.filter((p) => board.cellAt(p).building !== "wall")
			.filter((p) => p.x === x || p.y === y || board.cellAt(p).piece !== null)
			.filter((p) => (p.x !== x && p.y !== y) || board.cellAt(p).piece === null)
	}
}

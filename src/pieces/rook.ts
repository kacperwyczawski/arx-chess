import type Board from "../game/board";
import type { Point } from "../game/point";
import { Bishop } from "./bishop";
import { Knight } from "./knight";
import type { Piece } from "./piece";

export class Rook implements Piece {
	#color;

	get cost() {
		return 5;
	}

	get color() {
		return this.#color;
	}

	get name() {
		return "rook";
	}

	get requirements() {
		return new Set<Piece>([new Bishop(this.#color), new Knight(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}
	getAvailableMoves(board: Board, { x, y }: Point): Point[] {
		const points: Point[] = [];

		// Upward movement (North)
		for (let yi = y - 1; yi >= 0; yi--) {
			const cell = board.cellAt({ x, y: yi });
			if (
				!cell ||
				cell.building === "wall" ||
				cell.piece?.color === this.#color
			) {
				break;
			}
			points.push({ x, y: yi });
			if (cell.piece) {
				break;
			}
		}

		// Downward movement (South)
		for (let yi = y + 1; yi < board.size; yi++) {
			const cell = board.cellAt({ x, y: yi });
			if (
				!cell ||
				cell.building === "wall" ||
				cell.piece?.color === this.#color
			) {
				break;
			}
			points.push({ x, y: yi });
			if (cell.piece) {
				break;
			}
		}

		// Leftward movement (West)
		for (let xi = x - 1; xi >= 0; xi--) {
			const cell = board.cellAt({ x: xi, y });
			if (
				!cell ||
				cell.building === "wall" ||
				cell.piece?.color === this.#color
			) {
				break;
			}
			points.push({ x: xi, y });
			if (cell.piece) {
				break;
			}
		}

		// Rightward movement (East)
		for (let xi = x + 1; xi < board.size; xi++) {
			const cell = board.cellAt({ x: xi, y });
			if (
				!cell ||
				cell.building === "wall" ||
				cell.piece?.color === this.#color
			) {
				break;
			}
			points.push({ x: xi, y });
			if (cell.piece) {
				break;
			}
		}

		return points;
	}
}

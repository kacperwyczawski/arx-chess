import type { OldCell } from "../cell";
import type Board from "../game/board";
import type { Point } from "../game/point";
import { Pawn } from "./pawn";
import type { Piece } from "./piece";

export class Bishop implements Piece {
	#color;

	get cost() {
		return 3;
	}

	get color() {
		return this.#color;
	}

	get name() {
		return "bishop";
	}

	get requirements() {
		return new Set<Piece>([new Pawn(this.#color)]);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}

	getAvailableMoves(board: Board, { x, y }: Point): Point[] {
		const points: Point[] = [];

		// Top-left diagonal (Northwest)
		for (let xi = x - 1, yi = y - 1; xi >= 0 && yi >= 0; xi--, yi--) {
			const cell = board.cellAt({ x: xi, y: yi });
			if (
				!cell ||
				cell.building === "wall" ||
				cell.piece?.color === this.#color
			) {
				break;
			}
			points.push({ x: xi, y: yi });
			if (cell.piece) {
				break;
			}
		}

		// Bottom-left diagonal (Southwest)
		for (let xi = x - 1, yi = y + 1; xi >= 0 && yi < board.size; xi--, yi++) {
			const cell = board.cellAt({ x: xi, y: yi });
			if (
				!cell ||
				cell.building === "wall" ||
				cell.piece?.color === this.#color
			) {
				break;
			}
			points.push({ x: xi, y: yi });
			if (cell.piece) {
				break;
			}
		}

		// Bottom-right diagonal (Southeast)
		for (
			let xi = x + 1, yi = y + 1;
			xi < board.size && yi < board.size;
			xi++, yi++
		) {
			const cell = board.cellAt({ x: xi, y: yi });
			if (
				!cell ||
				cell.building === "wall" ||
				cell.piece?.color === this.#color
			) {
				break;
			}
			points.push({ x: xi, y: yi });
			if (cell.piece) {
				break;
			}
		}

		// Top-right diagonal (Northeast)
		for (let xi = x + 1, yi = y - 1; xi < board.size && yi >= 0; xi++, yi--) {
			const cell = board.cellAt({ x: xi, y: yi });
			if (
				!cell ||
				cell.building === "wall" ||
				cell.piece?.color === this.#color
			) {
				break;
			}
			points.push({ x: xi, y: yi });
			if (cell.piece) {
				break;
			}
		}

		return points;
	}
}

import type { Cell } from "../cell";
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

	highlightMoves(cells: Cell[][], x: number, y: number): void {
		for (let yi = y - 1, xi = x - 1; yi >= 0 && xi >= 0; yi--, xi--) {
			const cell = cells[yi][xi];
			if (cell.building === "wall" || cell.piece?.color === this.#color) {
				break;
			}
			cell.highlight();
			if (cell.piece) {
				break;
			}
		}
		for (let yi = y + 1, xi = x - 1; yi < cells.length && xi >= 0; yi++, xi--) {
			const cell = cells[yi][xi];
			if (cell.building === "wall" || cell.piece?.color === this.#color) {
				break;
			}
			cell.highlight();
			if (cell.piece) {
				break;
			}
		}
		for (
			let yi = y + 1, xi = x + 1;
			yi < cells.length && xi < cells.length;
			yi++, xi++
		) {
			const cell = cells[yi][xi];
			if (cell.building === "wall" || cell.piece?.color === this.#color) {
				break;
			}
			cell.highlight();
			if (cell.piece) {
				break;
			}
		}
		for (let yi = y - 1, xi = x + 1; yi >= 0 && xi < cells.length; yi--, xi++) {
			const cell = cells[yi][xi];
			if (cell.building === "wall" || cell.piece?.color === this.#color) {
				break;
			}
			cell.highlight();
			if (cell.piece) {
				break;
			}
		}
	}
}

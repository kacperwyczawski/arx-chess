import type { Cell } from "../cell";
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

	highlightMoves(cells: Cell[][], x: number, y: number): void {
		for (let yi = y - 1; yi >= 0; yi--) {
			const cell = cells[yi][x];
			if (cell.building === "wall" || cell.piece?.color === this.#color) {
				break;
			}
			cell.highlight();
			if (cell.piece) {
				break;
			}
		}
		for (let yi = y + 1; yi < cells.length; yi++) {
			const cell = cells[yi][x];
			if (cell.building === "wall" || cell.piece?.color === this.#color) {
				break;
			}
			cell.highlight();
			if (cell.piece) {
				break;
			}
		}
		for (let xi = x - 1; xi >= 0; xi--) {
			const cell = cells[y][xi];
			if (cell.building === "wall" || cell.piece?.color === this.#color) {
				break;
			}
			cell.highlight();
			if (cell.piece) {
				break;
			}
		}
		for (let xi = x + 1; xi < cells.length; xi++) {
			const cell = cells[y][xi];
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

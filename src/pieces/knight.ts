import type { Cell } from "../cell";
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

	highlightMoves(cells: Cell[][], x: number, y: number): void {
		let a = [
			cells[y - 2]?.[x - 1],
			cells[y - 2]?.[x + 1],
			cells[y + 2]?.[x - 1],
			cells[y + 2]?.[x + 1],
			cells[y - 1]?.[x - 2],
			cells[y + 1]?.[x - 2],
			cells[y - 1]?.[x + 2],
			cells[y + 1]?.[x + 2],
		];

		a = a
			.filter((c) => c !== undefined)
			.filter((c) => c.piece?.color !== this.#color)
			.filter((c) => c.building !== "wall");

		for (const c of a) {
			c.highlight();
		}
	}
}

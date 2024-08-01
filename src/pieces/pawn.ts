import { Cell } from "../cell";
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

  highlightMoves(cells: Cell[][], x: number, y: number): void {
  	let a = [
  		cells[y - 1]?.[x - 1],
  		cells[y - 1]?.[x],
  		cells[y - 1]?.[x + 1],
  		cells[y]?.[x + 1],
  		cells[y]?.[x - 1],
  		cells[y + 1]?.[x + 1],
  		cells[y + 1]?.[x],
  		cells[y + 1]?.[x - 1],
  	]

  	a = a
  		.filter(c => c !== undefined)
  		.filter(c => c.piece?.color !== this.#color)
  		.filter(c => c.building !== "wall")

  	for (const c of a) {
  		c.highlight()
  	}
  }
}

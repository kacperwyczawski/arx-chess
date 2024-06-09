import { Piece } from "./pieces/piece";

export class Cell {
	type: "empty" | "factory";
	player: "white" | "black" | "neutral";
	piece: Piece | null = null;

	constructor() {
		this.type = "empty";
		this.player = "neutral";
	}

	get classNames() {
		let result = [
			`cell-${this.type}`,
			`cell-${this.player}`
		];
		if (this.piece) {
			result.push(
				`cell-${this.piece.color}-${this.piece.toString()}`
			);
		}
		return result;
	}
}

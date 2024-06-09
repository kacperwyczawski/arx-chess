export class Cell {
	type: "empty" | "factory"; // TODO: Piece type
	player: "white" | "black" | "neutral";

	constructor() {
		this.type = "empty";
		this.player = "neutral";
	}

	get classNames() {
		return [
            `cell-${this.type}`,
            `cell-${this.player}`
        ]
	}
}

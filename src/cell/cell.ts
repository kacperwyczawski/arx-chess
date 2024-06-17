import { Piece } from "../pieces/piece";

export class Cell {
	type: CellType = "empty";
	player: Player = "neutral";
	piece: Piece | null = null;
	onClick: () => void = () => {};
	private HTMLCell: HTMLTableCellElement;

	constructor(
		HTMLCell: HTMLTableCellElement
	) {
		this.HTMLCell = HTMLCell;

		this.HTMLCell.addEventListener("click", () => {
			this.onClick();
		});
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

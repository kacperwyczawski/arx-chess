import { Piece } from "../pieces/piece";

export class Cell {
	type: CellType = "empty";
	playerColor: PlayerColor | null = null;
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

	// maybe don't pass classes to board, but instead have a method that applies classes to the cell
	// after refactor, check if .selected is working properly (it should be removed after placing a piece)
	get classNames() {
		let result = [
			`cell-${this.type}`,
			`cell-${this.playerColor ?? 'neutral'}`
		];
		if (this.piece) {
			result.push(
				`cell-${this.piece.color}-${this.piece.toString()}`
			);
		}
		return result;
	}

	public toggleSelected() {
		this.HTMLCell.classList.toggle("selected");
	}
}

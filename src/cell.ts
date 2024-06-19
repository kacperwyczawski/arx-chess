import { Piece } from "./pieces/piece";

export class Cell {
	#type: Building | null = null;
	#playerColor: PlayerColor | null = null;
	#piece: Piece | null = null;
	#HTMLCell: HTMLTableCellElement;

	onClick: () => void = () => {};

	get piece() {
		return this.#piece;
	}

	get playerColor() {
		return this.#playerColor;
	}

	get type() {
		return this.#type;
	}

	constructor(
		HTMLCell: HTMLTableCellElement
	) {
		this.#HTMLCell = HTMLCell;

		this.#HTMLCell.addEventListener("click", () => {
			this.onClick();
		});
	}

	placePiece(piece: Piece) {
		console.log("placePiece", piece);
		this.#piece = piece;
		this.#playerColor = piece.color;
		this.#HTMLCell.classList.add(
			piece.toString(),
		);
		this.#HTMLCell.dataset.color = piece.color;
	}

	removePiece() {
		this.#HTMLCell.classList.remove(this.#piece?.toString() ?? "");
		this.#piece = null;
	}

	toggleSelected() {
		this.#HTMLCell.classList.toggle("selected");
	}

	placeFactory() {
		this.#type = "factory";
		this.#HTMLCell.classList.add("factory");
	}
}

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
		this.#HTMLCell.style.backgroundImage = `url('${piece.toString()}-${piece.color}.png')`;
		this.#HTMLCell.style.setProperty("--outline", `var(--player-${piece.color})`);
	}

	removePiece() {
		this.#HTMLCell.style.backgroundImage = "";
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

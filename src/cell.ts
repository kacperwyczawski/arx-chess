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
		this.#HTMLCell.classList.add("cell");
		this.#HTMLCell.addEventListener("click", () => {
			this.onClick();
		});
	}

	placePiece(piece: Piece) {
		this.#piece = piece;
		this.#playerColor = piece.color;
		this.#HTMLCell.style.backgroundImage = `url('${piece.toString()}-${piece.color}.png')`;
		this.#HTMLCell.style.setProperty("--outline", `var(--player-${piece.color})`);
		this.#HTMLCell.classList.add("piece-to-move")
	}

	removePiece() {
		this.#HTMLCell.style.backgroundImage = "";
		this.#piece = null;
		this.#HTMLCell.classList.remove("piece-to-move");
	}

	toggleSelected() {
		this.#HTMLCell.classList.toggle("selected");
	}

	setBuilding(type: Building) {
		this.#type = type;
		this.#HTMLCell.classList.add("building");

		this.#HTMLCell.querySelector(".cell-annotation")?.remove();
		const div = document.createElement("div");
		div.setAttribute("title", type);
		div.classList.add("cell-annotation");
		div.textContent = type[0].toUpperCase();
		this.#HTMLCell.appendChild(div);
	}
}

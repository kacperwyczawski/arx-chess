import { Piece } from "./pieces/piece";

export class Cell {
	#building: Building | null = null;
	#owner: PlayerColor | null = null;
	#piece: Piece | null = null;
	#HTMLCell: HTMLTableCellElement;

	onClick: () => void = () => {};

	get piece() {
		return this.#piece;
	}

	get building() {
		return this.#building;
	}

	get owner() {
		return this.#owner;
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
		this.#HTMLCell.style.backgroundImage = `url('${piece.name}-${piece.color}.png')`;
		this.#HTMLCell.classList.add("piece-to-move")
	}

	handleCapture() {
		if (!this.#piece) {
			throw new Error("Cannot capture empty cell");
		}
		this.#HTMLCell.style.setProperty("--outline", `var(--player-${this.#piece.color})`);
		this.#owner = this.#piece.color;
	}

	removePiece() {
		this.#HTMLCell.style.backgroundImage = "";
		this.#piece = null;
		this.#HTMLCell.classList.remove("piece-to-move");
	}

	toggleSelected() {
		this.#HTMLCell.classList.toggle("selected");
	}

	setBuilding(building: Building) {
		this.#building = building;
		this.#HTMLCell.classList.add("building");

		this.#HTMLCell.querySelector(".cell-annotation")?.remove();
		const div = document.createElement("div");
		div.setAttribute("title", building);
		div.classList.add("cell-annotation");
		div.textContent = building[0].toUpperCase();
		this.#HTMLCell.appendChild(div);
	}
}

import type { Piece } from "./pieces/piece";

export class OldCell {
	#building: Building | null = null;
	#owner: PlayerColor | null = null;
	#piece: Piece | null = null;
	#HTMLCell: HTMLTableCellElement;
	#isHighlighted = false;
	#x: number;
	#y: number;

	get piece() {
		return this.#piece;
	}

	get building() {
		return this.#building;
	}

	get owner() {
		return this.#owner;
	}

	get isHighlighted() {
		return this.#isHighlighted;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	constructor(HTMLCell: HTMLTableCellElement, x: number, y: number) {
		this.#HTMLCell = HTMLCell;
		this.#x = x;
		this.#y = y;
		this.#HTMLCell.classList.add("cell");
		this.#HTMLCell.addEventListener("click", () => {
			window.dispatchEvent(new CustomEvent("cellclick", { detail: { cell: this } }))
		});
		this.#HTMLCell.addEventListener("contextmenu", (event) => {
			event.preventDefault();
			window.dispatchEvent(new CustomEvent("cellmenu", { detail: { cell: this } }))
		});
	}

	placePiece(piece: Piece, startingPiece = false) {
		this.#piece = piece;
		this.#HTMLCell.style.setProperty(
			"--background-image-url",
			`url('/${piece.name}-${piece.color}.png')`,
		);
		this.#HTMLCell.classList.add("piece-to-move");

		if (startingPiece) {
			this.handleCapture();
		}
	}

	handleCapture() {
		if (!this.#piece) {
			throw new Error("Cannot capture empty cell");
		}
		this.#HTMLCell.style.setProperty(
			"--outline",
			`var(--player-${this.#piece.color})`,
		);
		this.#owner = this.#piece.color;
	}

	removePiece() {
		this.#HTMLCell.style.setProperty("--background-image-url", "");
		this.#piece = null;
		this.#HTMLCell.classList.remove("piece-to-move");
	}

	toggleSelected() {
		this.#HTMLCell.classList.toggle("selected");
	}

	highlight() {
		this.#isHighlighted = true;
		this.#HTMLCell.classList.add("highlighted");
	}

	unhighlight() {
		this.#isHighlighted = false;
		this.#HTMLCell.classList.remove("highlighted");
	}

	setBuilding(building: Building) {
		this.#building = building;

		if (building === "wall") {
			this.#HTMLCell.classList.add("wall");
			return;
		}

		this.#HTMLCell.classList.add("building");

		this.#HTMLCell.querySelector(".cell-annotation")?.remove();
		const div = document.createElement("div");
		div.setAttribute("title", building);
		div.classList.add("cell-annotation");
		div.textContent = building[0].toUpperCase();
		this.#HTMLCell.appendChild(div);
	}
}

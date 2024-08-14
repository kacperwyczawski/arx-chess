import type { Piece } from "./pieces/piece";
import { q } from "./utils";

export class Player {
	#element;
	#pieceCount = 1;
	#maxPieces = 1;
	#gold = 1;
	#goldPerTurn = 1;
	#color;
	#boughtPieces = new Set<string>();

	get gold() {
		return this.#gold;
	}

	get color() {
		return this.#color;
	}

	constructor(color: PlayerColor) {
		this.#color = color;
		this.#element = q(`#${color}`);
		q(`#${color} .pieces`).textContent = this.#pieceCount.toString();
		q(`#${color} .max-pieces`).textContent = this.#maxPieces.toString();
		q(`#${color} .gold`).textContent = this.#gold.toString();
		q(`#${color} .gold-per-turn`).textContent = this.#goldPerTurn.toString();
	}

	canBuyPiece() {
		return this.#pieceCount < this.#maxPieces;
	}

	hasUnlocked(piece: Piece) {
		for (const requirement of piece.requirements) {
			if (!this.#boughtPieces.has(requirement.name)) {
				return false;
			}
		}
		return true;
	}

	handleEndTurn() {
		this.#gold += this.#goldPerTurn;
		q(`#${this.#color} .gold`).textContent = this.#gold.toString();
		this.#element.classList.remove("active");
	}

	handleBuildingCapture(type: Building) {
		if (type === "barracks") {
			this.#maxPieces += 1
			q(`#${this.#color} .max-pieces`).textContent = this.#maxPieces.toString();
		} else if (type === "mine") {
			this.#goldPerTurn += 1;
			q(`#${this.#color} .gold-per-turn`).textContent =
				this.#goldPerTurn.toString();
		}
	}

	handleBuildingLoss(type: Building) {
		if (type === "barracks") {
			this.#maxPieces -= 1
			q(`#${this.#color} .max-pieces`).textContent = this.#maxPieces.toString();
		} else if (type === "mine") {
			this.#goldPerTurn -= 1;
			q(`#${this.#color} .gold-per-turn`).textContent =
				this.#goldPerTurn.toString();
		}
	}

	handleBuildingUpgrade(type: Building) {
		this.#gold -= 3;
		q(`#${this.#color} .gold`).textContent = this.#gold.toString();
		this.handleBuildingCapture(type)
	}

	handlePieceLoss() {
		this.#pieceCount--;
		q(`#${this.#color} .pieces`).textContent = this.#pieceCount.toString();
	}

	handlePieceBuy(piece: Piece) {
		this.#gold -= piece.cost;
		q(`#${this.#color} .gold`).textContent = this.#gold.toString();
		this.#pieceCount++;
		q(`#${this.#color} .pieces`).textContent = this.#pieceCount.toString();
		this.#boughtPieces.add(piece.name);
	}

	activate() {
		this.#element.classList.add("active");
	}
}

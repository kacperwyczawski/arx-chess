import type { Piece } from "./pieces/piece";

export class Player {
	#element;
	#pieceCount = 1;
	#maxPieces = 2;
	#gold = 0.5;
	#goldPerTurn = 0.5;
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
		this.#element = document.querySelector(`#${color}`)!;
		this.#q(".pieces")!.textContent = this.#pieceCount.toString();
		this.#q(".max-pieces")!.textContent = this.#maxPieces.toString();
		this.#q(".gold")!.textContent = this.#gold.toString();
		this.#q(".gold-per-turn")!.textContent = this.#goldPerTurn.toString();
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
		this.#q(".gold").textContent = this.#gold.toString();
		this.#element.classList.remove("active");
	}

	handleBuildingCapture(type: Building) {
		this.#maxPieces += type === "barracks" ? 3 : 1;
		this.#q(".max-pieces").textContent = this.#maxPieces.toString();
		this.#goldPerTurn += type === "mine" ? 1.5 : 0.5;
		this.#q(".gold-per-turn").textContent = this.#goldPerTurn.toString();
	}

	handleBuildingLoss(type: Building) {
		this.#maxPieces -= type === "barracks" ? 3 : 1;
		this.#q(".max-pieces").textContent = this.#maxPieces.toString();
		this.#goldPerTurn -= type === "mine" ? 1.5 : 0.5;
		this.#q(".gold-per-turn").textContent = this.#goldPerTurn.toString();
	}

	handleBuildingUpgrade(type: Building) {
		this.#gold -= 3;
		this.#q(".gold").textContent = this.#gold.toString();
		if (type === "barracks") {
			this.#maxPieces += 2;
			this.#q(".max-pieces").textContent = this.#maxPieces.toString();
		} else if (type === "mine") {
			this.#goldPerTurn += 0.5;
			this.#q(".gold-per-turn").textContent = this.#goldPerTurn.toString();
		} else if (type === "factory") {
		} else if (type === "castle") {
			throw new Error("Upgrading to building of this type is not implemented");
		}
	}

	handlePieceLoss() {
		this.#pieceCount--;
		this.#q(".pieces").textContent = this.#pieceCount.toString();
	}

	handlePieceBuy(piece: Piece) {
		this.#gold -= piece.cost;
		this.#q(".gold").textContent = this.#gold.toString();
		this.#pieceCount++;
		this.#q(".pieces").textContent = this.#pieceCount.toString();
		this.#boughtPieces.add(piece.name);
	}

	activate() {
		this.#element.classList.add("active");
	}

	#q(selector: string) {
		return this.#element.querySelector(selector)!;
	}
}

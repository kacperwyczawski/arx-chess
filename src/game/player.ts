import type { Piece } from "../pieces/piece";
import getAllPieces from "./getAllPieces";

export class Player {
	pieces = 1;
	maxPieces = 2;
	gold = 1;
	boughtPieces = new Set<string>();
	#color;

	get color() {
		return this.#color;
	}

	get unlockedPieces() {
		return getAllPieces(this.color).filter((p) =>
			this.#hasUnlocked(p),
		);
	}

	get lockedPieces() {
		return getAllPieces(this.color).filter((p) =>
			!this.#hasUnlocked(p),
		);
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}

	canBuyPiece() {
		return this.pieces < this.maxPieces;
	}

	canBuyUpgrade() {
		return this.gold >= 3;
	}

	#hasUnlocked(piece: Piece) {
		for (const requirement of piece.requirements) {
			if (!this.boughtPieces.has(requirement.name)) {
				return false;
			}
		}
		return true;
	}
}

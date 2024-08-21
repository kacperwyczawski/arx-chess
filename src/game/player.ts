import type { Piece } from "../pieces/piece";

export class Player {
	pieces = 1;
	maxPieces = 2;
	gold = 1;
	#color;
	boughtPieces = new Set<string>();

	get color() {
		return this.#color;
	}

	constructor(color: PlayerColor) {
		this.#color = color;
	}

	canBuyPiece() {
		return this.pieces < this.maxPieces;
	}

	hasUnlocked(piece: Piece) {
		for (const requirement of piece.requirements) {
			if (!this.boughtPieces.has(requirement.name)) {
				return false;
			}
		}
		return true;
	}

	canBuyUpgrade() {
		return this.gold >= 3;
	}
}

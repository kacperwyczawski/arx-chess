import type { Piece } from "../pieces/piece";
import Board from "./board";
import { Player } from "./player";
import type { Point } from "./point";

export default class Game {
	#board;
	#players = [new Player("white"), new Player("black")];
	#currentPlayerIndex = 0;
	#selectedPoint: Point | null = null;

	afterEndTurn: (winner: PlayerColor | null) => void = () => { };

	get currentPlayer() {
		return this.#players[this.#currentPlayerIndex];
	}

	get previousPlayer() {
		return this.#currentPlayerIndex > 0
			? this.#players[this.#currentPlayerIndex - 1]
			: this.#players[this.#players.length - 1];
	}

	get board() {
		return this.#board;
	}

	get hasSelectedPoint() {
		return this.#selectedPoint !== null;
	}

	get nextAvailablePieces() {
		let result: Piece[] = []
		for (const locked of this.currentPlayer.lockedPieces) {
			// TODO: use new set methods, when available
			let canBeUnlocked = true;
			for (const requirement of locked.requirements) {
				if (!this.currentPlayer.unlockedPieces.map(p => p.name).includes(requirement.name)) {
					canBeUnlocked = false
				}
			}
			if (canBeUnlocked) {
				result.push(locked)
			}
		}
		return result
	}

	constructor(mapName: string) {
		this.#board = new Board(mapName, this.#players);
	}

	getAvailableMoves(point: Point) {
		const piece = this.board.cellAt(point).piece;
		if (!piece) {
			throw new Error();
		}
		return piece.getAvailableMoves(this.board, point);
	}

	getPiecesToBuy(): { piece: Piece; isAvailable: boolean }[] {
		if (!this.currentPlayer.canBuyPiece()) {
			return this.currentPlayer.unlockedPieces.map((p) => ({
				piece: p,
				isAvailable: false,
			}));
		}
		return this.currentPlayer.unlockedPieces.map((p) => ({
			piece: p,
			isAvailable: p.cost <= this.currentPlayer.gold,
		}));
	}

	select(point: Point) {
		this.#selectedPoint = point;
	}

	unselect() {
		this.#selectedPoint = null;
	}

	moveTo(point: Point) {
		if (!this.#selectedPoint) {
			throw new Error();
		}

		if (this.board.cellAt(point).piece) {
			this.previousPlayer.pieces--;
		}

		this.board.cellAt(point).piece = this.board.cellAt(
			this.#selectedPoint,
		).piece;
		this.board.cellAt(this.#selectedPoint).piece = null;

		this.#endTurn();
	}

	skipTurn() {
		this.#endTurn();
	}

	forfeit() {
		this.afterEndTurn(this.previousPlayer.color);
	}

	buyPiece(point: Point, piece: Piece) {
		this.currentPlayer.gold -= piece.cost;
		this.currentPlayer.boughtPieces.add(piece.name);
		this.currentPlayer.pieces++;
		this.board.cellAt(point).piece = piece;
		this.#endTurn();
	}

	#endTurn() {
		this.currentPlayer.gold++;

		// PLAYER CHANGE
		this.#currentPlayerIndex = (this.#currentPlayerIndex + 1) % 2;

		this.#selectedPoint = null;
		for (const cell of this.#board.allCells.filter(
			(cell) =>
				cell.building &&
				cell.piece?.color === this.currentPlayer.color &&
				cell.owner !== this.currentPlayer,
		)) {
			if (cell.owner === this.previousPlayer) {
				this.previousPlayer.maxPieces--;
			}
			cell.owner = this.currentPlayer;
			this.currentPlayer.maxPieces++;
		}

		let winner: PlayerColor | null = null;

		if (!this.#board.allCells.some((cell) => cell.owner?.color === "black")) {
			winner = "white";
		}

		if (!this.#board.allCells.some((cell) => cell.owner?.color === "white")) {
			winner = "black";
		}

		this.afterEndTurn(winner);
	}
}

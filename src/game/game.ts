import type { Piece } from "../pieces/piece";
import Board from "./board";
import getAllPieces from "./getAllPieces";
import { Player } from "./player";
import type { Point } from "./point";

export default class Game {
	#board;
	#players = [new Player("white"), new Player("black")];
	#currentPlayerIndex = 0;
	#selectedPoint: Point | null = null;

	afterEndTurn: (winner: PlayerColor | null) => void = () => {};

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
		return this.#selectedPoint !== null
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

	getPiecesToBuy(
		point: Point,
	): { piece: Piece; available: boolean; calculatedPrice: number }[] {
		const unlocked = getAllPieces(this.currentPlayer.color).filter((p) =>
			this.currentPlayer.hasUnlocked(p),
		);
		if (this.board.cellAt(point).piece || !this.currentPlayer.canBuyPiece()) {
			return unlocked.map((p) => ({
				piece: p,
				available: false,
				calculatedPrice: this.#calculatePrice(point, p.cost),
			}));
		}
		return unlocked.map((p) => ({
			piece: p,
			available: this.#calculatePrice(point, p.cost) <= this.currentPlayer.gold,
			calculatedPrice: this.#calculatePrice(point, p.cost),
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
		this.currentPlayer.gold -= this.#calculatePrice(point, piece.cost);
		this.currentPlayer.boughtPieces.add(piece.name);
		this.currentPlayer.pieces++;
		this.board.cellAt(point).piece = piece;
		this.#endTurn();
	}

	buyUpgrade(point: Point, upgrade: string) {
		if (upgrade !== "barracks" && upgrade !== "factory" && upgrade !== "mine") {
			throw new Error();
		}
		this.currentPlayer.handleBuildingAcquisitionOrLoss(upgrade, "acquisition");
		this.currentPlayer.gold -= 3;
		this.board.cellAt(point).building = upgrade;
		this.#endTurn();
	}

	#endTurn() {
		this.currentPlayer.gold += this.currentPlayer.goldPerTurn;

		// PLAYER CHANGE
		this.#currentPlayerIndex = (this.#currentPlayerIndex + 1) % 2;

		this.#selectedPoint = null;
		for (const cell of this.#board.allCells.filter(
			(cell) =>
				cell.building &&
				cell.piece?.color === this.currentPlayer.color &&
				cell.owner !== this.currentPlayer,
		)) {
			cell.owner = this.currentPlayer;
			this.currentPlayer.handleBuildingAcquisitionOrLoss(
				cell.building!,
				"acquisition",
			);
			this.previousPlayer.handleBuildingAcquisitionOrLoss(
				cell.building!,
				"loss",
			);
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

	#calculatePrice(point: Point, price: number) {
		const isFactory = this.board.cellAt(point).building === "factory";
		return isFactory ? Math.round(price * 0.7) : price;
	}
}

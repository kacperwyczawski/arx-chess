import { Board } from "./board";
import { castleMenu } from "./castleMenu";
import type { Cell } from "./cell";
import { Player } from "./player";
import Tutorial from "./tutorial";
import { q } from "./utils";

export class Game {
	#selectedCell: Cell | null = null;
	#players = [new Player("white"), new Player("black")];
	#currentPlayerIndex = 0;
	#castleMenu = new castleMenu();
	#board;
	#isTutorial;
	#tutorial = new Tutorial();
	#HTMLGameOverDialog;

	constructor(HTMLTable: HTMLTableElement, tutorial: boolean) {
		this.#HTMLGameOverDialog = q("#game-over") as HTMLDialogElement;
		this.#isTutorial = tutorial;
		this.#board = new Board(
			HTMLTable,
			"canyon",
			(clickedCell, x, y) => {
				// place piece
				if (this.#selectedCell?.piece) {
					if (!clickedCell.isHighlighted) {
						this.#deselectAndUnhighlightCells();
						return;
					}
					if (clickedCell.piece) {
						this.#nextPlayer.handlePieceLoss();
					}
					if (clickedCell.building) {
						this.#currentPlayer.handleBuildingCapture(clickedCell.building);
						if (clickedCell.owner === this.#nextPlayer.color) {
							this.#nextPlayer.handleBuildingLoss(clickedCell.building);
						}
					}
					clickedCell.placePiece(this.#selectedCell.piece);
					this.#selectedCell.removePiece();
					this.#deselectAndUnhighlightCells();
					this.#endTurn();
					return;
				}

				// grab piece
				if (
					clickedCell.piece &&
					clickedCell.piece.color === this.#currentPlayer.color
				) {
					this.#selectedCell = clickedCell;
					clickedCell.toggleSelected();
					clickedCell.piece.highlightMoves(this.#board.cells, x, y);
					return;
				}
			},
			(clickedCell) => {
				if (clickedCell.owner !== this.#currentPlayer.color) {
					return;
				}
				this.#castleMenu.open(
					(piece) => {
						if (!this.#currentPlayer.canBuyPiece()) {
							alert("You can't buy any more pieces.");
							return;
						}
						this.#currentPlayer.handlePieceBuy(piece);
						clickedCell.placePiece(piece);
						this.#endTurn();
					},
					(building) => {
						clickedCell.setBuilding(building);
						this.#currentPlayer.handleBuildingUpgrade(building);
						this.#endTurn();
					},
					this.#currentPlayer,
					this.#currentPlayer.gold,
					clickedCell.building === "factory",
					clickedCell.piece !== null,
				);
			},
		);

		if (this.#isTutorial) {
			this.#tutorial.activate(this.#players[0]);
		}
	}

	#deselectAndUnhighlightCells() {
		if (this.#selectedCell === null) {
			return;
		}
		this.#selectedCell.toggleSelected();
		this.#selectedCell = null;
		for (const cell of this.#board.cellsFlat) {
			cell.unhighlight();
		}
	}

	#endTurn() {
		this.#currentPlayer.handleEndTurn();

		this.#currentPlayerIndex = (this.#currentPlayerIndex + 1) % 2;
		this.#currentPlayer.activate();

		this.#selectedCell?.toggleSelected();
		this.#selectedCell = null;

		if (!this.#board.cellsFlat.some((cell) => cell.owner === "black")) {
			this.#HTMLGameOverDialog.showModal();
			this.#HTMLGameOverDialog.children[0].textContent =
				"Game over! White is the winner.";
		}

		if (!this.#board.cellsFlat.some((cell) => cell.owner === "white")) {
			this.#HTMLGameOverDialog.showModal();
			this.#HTMLGameOverDialog.children[0].textContent =
				"Game over! Black is the winner.";
		}

		for (const cell of this.#board.cellsFlat.filter(
			(cell) =>
				cell.building && cell.piece?.color === this.#currentPlayer.color,
		)) {
			cell.handleCapture();
		}
	}

	get #currentPlayer() {
		return this.#players[this.#currentPlayerIndex];
	}

	get #nextPlayer() {
		return this.#players[(this.#currentPlayerIndex + 1) % 2];
	}
}

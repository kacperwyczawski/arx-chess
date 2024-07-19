import { Board } from "./board";
import { castleMenu } from "./castleMenu";
import type { Cell } from "./cell";
import { Player } from "./player";

export class Game {
	#selectedCell: Cell | null = null;
	#players = [new Player("white"), new Player("black")];
	#currentPlayerIndex = 0;
	#castleMenu = new castleMenu();
	#board;

	constructor(HTMLTable: HTMLTableElement) {
		this.#board = new Board(
			HTMLTable,
			`
        ---------
        -1--c--c-
        ----w----
        ---w-----
        -cw-c-wc-
        -----w---
        ----w----
        -c--c--2-
        ---------
      `,
			(clickedCell) => {
				// place piece
				if (this.#selectedCell?.piece) {
					if (clickedCell.piece?.color === this.#currentPlayer.color) {
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
					this.#selectedCell.toggleSelected();
					this.#selectedCell = null;
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
						clickedCell.makeNotAvailable();
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
	}

	#endTurn() {
		this.#currentPlayer.handleEndTurn();

		this.#currentPlayerIndex = (this.#currentPlayerIndex + 1) % 2;
		this.#currentPlayer.activate();

		this.#selectedCell?.toggleSelected();
		this.#selectedCell = null;

		this.#board.cells
			.filter(
				(cell) =>
					cell.building && cell.piece?.color === this.#currentPlayer.color,
			)
			.forEach((cell) => cell.handleCapture());

		this.#board.cells.forEach((cell) => cell.makeAvailable());
	}

	get #currentPlayer() {
		return this.#players[this.#currentPlayerIndex];
	}

	get #nextPlayer() {
		return this.#players[(this.#currentPlayerIndex + 1) % 2];
	}
}

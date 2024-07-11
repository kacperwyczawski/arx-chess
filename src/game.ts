import { Cell } from "./cell";
import { Player } from "./player";
import { castleMenu } from "./castleMenu";
import { Board } from "./board";

// TODO: abstract HTML table as board and current board as game

export class Game {
  #selectedCell: Cell | null = null; //TODO: deselect on end turn
  #players = [
    new Player("white", () => this.#endTurn()),
    new Player("black", () => this.#endTurn()),
  ];
  #currentPlayerIndex = 0;
  #castleMenu = new castleMenu();
  #board

  constructor(
    HTMLTable: HTMLTableElement
  ) {
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
        if (this.#selectedCell && this.#selectedCell.piece) {
          if (clickedCell.piece?.color === this.#currentPlayer.color) {
            return;
          }
          HTMLTable.classList.remove("piece-in-hand");
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
          this.#currentPlayer.handlePieceMove();
          this.#selectedCell.removePiece();
          this.#selectedCell.toggleSelected();
          this.#selectedCell = null;
          return;
        }

        // grab piece
        if (clickedCell.piece && clickedCell.piece.color === this.#currentPlayer.color) {
          if (!this.#currentPlayer.canMovePiece()) {
            alert("You can't move any more pieces.");
            return;
          }
          HTMLTable.classList.add("piece-in-hand");
          this.#selectedCell = clickedCell;
          clickedCell.toggleSelected();
          return;
        }
      },
      (clickedCell) => {
        if (clickedCell.owner !== this.#currentPlayer.color) {
          return;
        }
        this.#castleMenu.open(piece => {
          if (!this.#currentPlayer.canBuyPiece()) {
            alert("You can't buy any more pieces.");
            return;
          }
          this.#currentPlayer.handlePieceBuy(piece);
          clickedCell.placePiece(piece);
          clickedCell.makeNotAvailable();
        },
          (building) => {

            clickedCell.setBuilding(building);
            this.#currentPlayer.handleBuildingUpgrade(building);
          },
          this.#currentPlayer.color,
          this.#currentPlayer.gold,
          clickedCell.building === "factory",
          clickedCell.piece !== null);
      }
    )
  }

  #endTurn() {
    this.#currentPlayerIndex = (this.#currentPlayerIndex + 1) % 2;
    this.#currentPlayer.activate();

    this.#board.cells
      .filter(cell => cell.building && cell.piece?.color === this.#currentPlayer.color)
      .forEach(cell => cell.handleCapture());

    this.#board.cells
      .forEach(cell => cell.makeAvailable());
  }

  get #currentPlayer() {
    return this.#players[this.#currentPlayerIndex];
  }

  get #nextPlayer() {
    return this.#players[(this.#currentPlayerIndex + 1) % 2];
  }
}

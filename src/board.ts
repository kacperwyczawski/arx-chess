import _ from "lodash-es";
import { Cell } from "./cell";
import { King } from "./pieces/king";
import { Player } from "./player";
import { castleMenu } from "./castleMenu";

// TODO: abstract HTML table as board and current board as game

export class Board {
	#cells: Cell[][] = [];
    #selectedCell: Cell | null = null;
    #players = [
        new Player("white", () => this.#endTurn()),
        new Player("black", () => this.#endTurn()),
    ];
    #currentPlayerIndex = 0;
    #castleMenu = new castleMenu();

	constructor(
        HTMLTable: HTMLTableElement
    ) {
		const body = HTMLTable.createTBody();
		const size = 9;
		_.times(size, y => {
            const row = body.insertRow();
            this.#cells[y] = [];
            _.times(size, () => {
                const targetCell = new Cell(row.insertCell());
                targetCell.onClick = () => {
                    // place piece
                    if (this.#selectedCell && this.#selectedCell.piece) {
                        if (targetCell.piece?.color === this.#currentPlayer.color) {
                            return;
                        }
                        HTMLTable.classList.remove("piece-in-hand");
                        if (targetCell.piece) {
                            this.#nextPlayer.handlePieceLoss();
                        }
                        if (targetCell.building) {
                            this.#currentPlayer.handleBuildingCapture(targetCell.building);
                            if (targetCell.owner === this.#nextPlayer.color) {
                                this.#nextPlayer.handleBuildingLoss(targetCell.building);
                            }
                        }
                        targetCell.placePiece(this.#selectedCell.piece);
                        this.#currentPlayer.handlePieceMove();
                        this.#selectedCell.removePiece();
                        this.#selectedCell.toggleSelected();
                        this.#selectedCell = null;
                        return;
                    }
                    
                    // grab piece
                    if (targetCell.piece && targetCell.piece.color === this.#currentPlayer.color) {
                        if (!this.#currentPlayer.canMovePiece()) {
                            alert("You can't move any more pieces.");
                            return;
                        }
                        HTMLTable.classList.add("piece-in-hand");
                        this.#selectedCell = targetCell;
                        targetCell.toggleSelected();
                        return;
                    }

                    // open castle menu
                    if (targetCell.building === "castle" && targetCell.owner === this.#currentPlayer.color) {
                        if (!this.#currentPlayer.canBuyPiece()) {
                            alert("You can't buy any more pieces.");
                            return;
                        }
                        // TODO: cancel button
                        this.#castleMenu.open(item => {
                            if (typeof item === "string") {
                                targetCell.setBuilding(item);
                                this.#currentPlayer.handleBuildingUpgrade(item);
                                return;
                            }
                            this.#currentPlayer.handlePieceBuy(item);
                            targetCell.placePiece(item);
                        }, this.#currentPlayer.color, this.#currentPlayer.gold);
                        return;
                    }
                }
                this.#cells[y].push(targetCell);
            });
        });
        this.#getCell(1, 1).placePiece(new King("white"));
        this.#getCell(7, 7).placePiece(new King("black"));
        this.#getCell(1, 1).handleCapture();
        this.#getCell(7, 7).handleCapture();
        const castleCells = [
            [1, 1], [1, 4], [1, 7],
            [4, 1], [4, 4], [4, 7],
            [7, 1], [7, 4], [7, 7]
        ];
        castleCells.forEach(([x, y]) => {
            this.#getCell(x, y).setBuilding("castle");
        });
	}

    #getCell(x: number, y: number) {
        return this.#cells[y][x];
    }

    #endTurn() {
        this.#currentPlayerIndex = (this.#currentPlayerIndex + 1) % 2;
        this.#currentPlayer.activate();

        // capture buildings
        this.#cells
            .flat()
            .filter(cell => cell.building && cell.piece?.color === this.#currentPlayer.color)
            .forEach(cell => cell.handleCapture());
    }

    get #currentPlayer() {
        return this.#players[this.#currentPlayerIndex];
    }

    get #nextPlayer() {
        return this.#players[(this.#currentPlayerIndex + 1) % 2];
    }
}

import _ from "lodash-es";
import { Cell } from "./cell";
import { King } from "./pieces/king";
import { Player } from "./player";
import { factoryMenu } from "./factoryMenu";

// TODO: abstract HTML table as board and current board as game

export class Board {
	#cells: Cell[][] = [];
    #selectedCell: Cell | null = null;
    #players = [
        new Player("white"),
        new Player("black")
    ];
    #currentPlayerIndex = 0;
    #factoryMenu = new factoryMenu();

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
                        HTMLTable.classList.remove("piece-in-hand");
                        if (targetCell.piece) {
                            this.nextPlayer.handlePieceLoss();
                        }
                        if (targetCell.type === "factory") {
                            this.currentPlayer.handleFactoryCapture();
                            if (targetCell.playerColor === this.nextPlayer.color) {
                                this.nextPlayer.handleFactoryLoss();
                            }
                        }
                        targetCell.placePiece(this.#selectedCell.piece);
                        this.#selectedCell.removePiece();
                        this.#selectedCell.toggleSelected();
                        this.#selectedCell = null;
                        this.endTurn();
                        return;
                    }
                    
                    // grab piece
                    if (targetCell.piece && targetCell.playerColor === this.currentPlayer.color) {
                        HTMLTable.classList.add("piece-in-hand");
                        this.#selectedCell = targetCell;
                        targetCell.toggleSelected();
                        return;
                    }

                    // open factory menu
                    if (targetCell.type === "factory" && targetCell.playerColor === this.currentPlayer.color) {
                        if (!this.currentPlayer.canPlacePiece()) {
                            alert("You can't place any more pieces. Capture more factories or upgrade them to barracks.");
                            return;
                        }
                        // TODO: cancel
                        this.#factoryMenu.open(piece => {
                            if (this.currentPlayer.gold < piece.cost) {
                                return;
                            }
                            this.currentPlayer.handlePieceBuy(piece);
                            targetCell.placePiece(piece);
                            this.endTurn();
                        }, this.currentPlayer.color, this.currentPlayer.gold);
                        return;
                    }
                }
                this.#cells[y].push(targetCell);
            });
        });
        this.getCell(1, 1).placePiece(new King("white"));
        this.getCell(7, 7).placePiece(new King("black"));
        const factoryCells = [
            [1, 1], [1, 4], [1, 7],
            [4, 1], [4, 4], [4, 7],
            [7, 1], [7, 4], [7, 7]
        ];
        factoryCells.forEach(([x, y]) => {
            this.getCell(x, y).placeFactory();
        });
	}

    private getCell(x: number, y: number) {
        return this.#cells[y][x];
    }

    private endTurn() {
        this.currentPlayer.handleTurnEnd();
        this.#currentPlayerIndex = (this.#currentPlayerIndex + 1) % 2;
        this.currentPlayer.handleTurnStart();
    }

    private get currentPlayer() {
        return this.#players[this.#currentPlayerIndex];
    }

    private get nextPlayer() {
        return this.#players[(this.#currentPlayerIndex + 1) % 2];
    }
}

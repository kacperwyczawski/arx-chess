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
        new Player("white"),
        new Player("black")
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
                        HTMLTable.classList.remove("piece-in-hand");
                        if (targetCell.piece) {
                            this.nextPlayer.handlePieceLoss();
                        }
                        if (targetCell.type) {
                            this.currentPlayer.handleBuildingCapture(targetCell.type);
                            if (targetCell.playerColor === this.nextPlayer.color) {
                                this.nextPlayer.handleBuildingLoss(targetCell.type);
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

                    // open castle menu
                    if (targetCell.type === "castle" && targetCell.playerColor === this.currentPlayer.color) {
                        if (!this.currentPlayer.canPlacePiece()) {
                            alert("You can't place any more pieces. Capture more castles or upgrade them to barracks.");
                            return;
                        }
                        // TODO: cancel
                        this.#castleMenu.open(item => {
                            if (typeof item === "string") {
                                targetCell.setBuilding(item);
                                this.currentPlayer.handleBuildingUpgrade(item);
                                return;
                            }
                            this.currentPlayer.handlePieceBuy(item);
                            targetCell.placePiece(item);
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
        const castleCells = [
            [1, 1], [1, 4], [1, 7],
            [4, 1], [4, 4], [4, 7],
            [7, 1], [7, 4], [7, 7]
        ];
        castleCells.forEach(([x, y]) => {
            this.getCell(x, y).setBuilding("castle");
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

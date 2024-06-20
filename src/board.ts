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
                        if (targetCell.piece) {
                            this.nextPlayer.removePiece();
                        }
                        if (targetCell.type === "factory") {
                            this.currentPlayer.increaseGoldPerTurn();
                            if (targetCell.playerColor === this.nextPlayer.color) {
                                this.nextPlayer.decreaseGoldPerTurn();
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
                        this.#selectedCell = targetCell;
                        targetCell.toggleSelected();
                        return;
                    }

                    // open factory menu
                    if (targetCell.type === "factory" && targetCell.playerColor === this.currentPlayer.color) {
                        this.#factoryMenu.open();
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
        this.currentPlayer.endTurn();
        this.#currentPlayerIndex = (this.#currentPlayerIndex + 1) % 2;
        this.currentPlayer.startTurn();
    }

    private get currentPlayer() {
        return this.#players[this.#currentPlayerIndex];
    }

    private get nextPlayer() {
        return this.#players[(this.#currentPlayerIndex + 1) % 2];
    }
}

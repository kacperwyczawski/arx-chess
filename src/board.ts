import _ from "lodash-es";
import { Cell } from "./cell/cell";
import { King } from "./pieces/king";
import { Player } from "./player";

export class Board {
	private cells: Cell[][] = [];
    private selectedCell: Cell | null = null;
    private players = [
        new Player("white"),
        new Player("black")
    ];
    private currentPlayerIndex = 0;

	constructor(
        HTMLTable: HTMLTableElement
    ) {
		const body = HTMLTable.createTBody();
		const size = 9;
		_.times(size, y => {
            const row = body.insertRow();
            this.cells[y] = [];
            _.times(size, () => {
                const cell = new Cell(row.insertCell());
                cell.onClick = () => {
                    // place piece
                    if (this.selectedCell) {
                        if (cell.piece) {
                            this.currentPlayer.removePiece();
                        }
                        if (cell.type === "factory") {
                            this.currentPlayer.increaseGoldPerTurn();
                            if (cell.playerColor === this.nextPlayer.color) {
                                this.nextPlayer.decreaseGoldPerTurn();
                            }
                        }
                        cell.piece = this.selectedCell.piece;
                        cell.playerColor = this.selectedCell.playerColor;
                        this.selectedCell.piece = null;
                        this.selectedCell = null;
                        this.applyClassNames(HTMLTable);
                        this.endTurn();
                        return;
                    }
                    
                    // grab piece
                    if (
                        (cell.piece && cell.playerColor === this.currentPlayer.color)
                        || (cell.type === "factory" && cell.playerColor === this.currentPlayer.color)) {
                        this.selectedCell = cell;
                        cell.toggleSelected();
                    }
                }
                this.cells[y].push(cell);
            });
        });
        this.getCell(1, 1).playerColor = "white";
        this.getCell(1, 1).piece = new King("white");
        this.getCell(7, 7).playerColor = "black";
        this.getCell(7, 7).piece = new King("black");
        const factoryCells = [
            [1, 1], [1, 4], [1, 7],
            [4, 1], [4, 4], [4, 7],
            [7, 1], [7, 4], [7, 7]
        ];
        factoryCells.forEach(([x, y]) => {
            this.getCell(x, y).type = "factory";
        });
        this.applyClassNames(HTMLTable);
	}

    private get size() {
        return 9;
    }

    private getCell(x: number, y: number) {
        return this.cells[y][x];
    }

    private applyClassNames(table: HTMLTableElement) {
        _.times(this.size, y => {
            _.times(this.size, x => {
                const cell = this.getCell(x, y);
                const HTMLCell = table.rows[y].cells[x];
                HTMLCell.className = "";
                HTMLCell.classList.add(...cell.classNames);
            });
        });
    }

    private endTurn() {
        this.currentPlayer.endTurn();
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
        this.currentPlayer.startTurn();
    }

    private get currentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    private get nextPlayer() {
        return this.players[(this.currentPlayerIndex + 1) % 2];
    }
}

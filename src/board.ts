import _ from "lodash-es";
import { Cell } from "./cell/cell";
import { King } from "./pieces/king";
import { PlayerDisplay } from "./displays/playerDisplay";
import { PieceCountDisplay } from "./displays/pieceCountDisplay";

export class Board {
	private cells: Cell[][] = [];
    private selectedCell: Cell | null = null;
    private playerDisplay = new PlayerDisplay();
    private pieceCountDisplay = new PieceCountDisplay();

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
                    // TODO: highlight selected cell/piece

                    // place piece
                    if (this.selectedCell) {
                        if (cell.piece) {
                            this.pieceCountDisplay.reduce(cell.player!);
                        }
                        cell.piece = this.selectedCell.piece;
                        cell.player = this.selectedCell.player;
                        this.selectedCell.piece = null;
                        this.selectedCell.player = null;
                        this.selectedCell = null;
                        this.applyClassNames(HTMLTable);
                        this.playerDisplay.NextPlayer();
                        return;
                    }
                    
                    // grab piece
                    if (cell.piece && cell.player === this.playerDisplay.currentPlayer) {
                        this.selectedCell = cell;
                    }
                }
                this.cells[y].push(cell);
            });
        });
        this.getCell(1, 1).player = "white";
        this.getCell(1, 1).piece = new King("white");
        this.getCell(7, 7).player = "black";
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
}

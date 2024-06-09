import _ from "lodash-es";
import { Cell } from "./cell";
import { King } from "./pieces/king";

export class Board {
	private cells: Cell[][] = [];

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
                const tableCell = table.rows[y].cells[x];
                tableCell.className = "";
                tableCell.classList.add(...cell.classNames);
            });
        });
    }

	setup(table: HTMLTableElement) {
		const body = table.createTBody();
		const size = 9;
		_.times(size, y => {
            const row = body.insertRow();
            this.cells[y] = [];
            _.times(size, () => {
                row.insertCell();
                const cell = new Cell();
                this.cells[y].push(cell);
            });
        });
        this.cells[1][1].type = "factory";
        this.cells[1][1].player = "white";
        this.cells[1][1].piece = new King("white");
        this.cells[1][4].type = "factory";
        this.cells[1][7].type = "factory";
        this.cells[4][1].type = "factory";
        this.cells[4][4].type = "factory";
        this.cells[4][7].type = "factory";
        this.cells[7][1].type = "factory";
        this.cells[7][4].type = "factory";
        this.cells[7][7].type = "factory";
        this.cells[7][7].player = "black";
        this.cells[7][7].piece = new King("black");
        this.applyClassNames(table);
	}
}

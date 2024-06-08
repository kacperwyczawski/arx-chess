import { Cell } from "./cell"

export class Board {
  private cells: Cell[][] = [
    [ "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty" ],
    [ "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty" ],
    [ "empty", "empty", "factory", "empty", "empty", "factory", "empty", "empty", "factory", "empty", "empty" ],
    [ "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty" ],
    [ "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty" ],
    [ "empty", "empty", "factory", "empty", "empty", "factory", "empty", "empty", "factory", "empty", "empty" ],
    [ "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty" ],
    [ "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty" ],
    [ "empty", "empty", "factory", "empty", "empty", "factory", "empty", "empty", "factory", "empty", "empty" ],
    [ "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty" ],
    [ "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty" ]
  ]

    setup(table: HTMLTableElement) {
        const body = table.createTBody()
        for (const row of this.cells) {
            const tableRow = body.insertRow()
            for (const cell of row) {
                const tableCell = tableRow.insertCell()
                tableCell.classList.add(`cell-${cell}`)
            }
        }
    }
}
import { Cell } from "./cell";
import { Pawn } from "./pieces/pawn";

export class Board {
  #cells: Cell[][] = [];

  get cells() {
    return this.#cells.flat();
  }

  constructor(
    HTMLTable: HTMLTableElement,
    template: string,
    onCellClick: (clickedCell: Cell) => void,
    onCastleClick: (clickedCell: Cell) => void,
  ) {
    const HTMLBody = HTMLTable.createTBody();
    template
      .replace(/ /g, "")
      .split("\n")
      .filter(row => row.length > 0)
      .forEach((row, y) => {
        const HTMLRow = HTMLBody.insertRow()
        this.#cells[y] = [];
        row
          .split("")
          .forEach((symbol) => {
            const cell = new Cell(HTMLRow.insertCell());
            cell.onClick = () => {
              onCellClick(cell)
            }
            cell.onMenu = () => {
              onCastleClick(cell)
            }
            this.#cells[y].push(cell);

            if (symbol === "-") {
            } else if (symbol === "1") {
              cell.placePiece(new Pawn("white"), true);
              cell.setBuilding("castle");
            } else if (symbol === "2") {
              cell.placePiece(new Pawn("black"), true);
              cell.setBuilding("castle");
            } else if (symbol === "w") {
              cell.setBuilding("wall");
            } else if (symbol === "c") {
              cell.setBuilding("castle");
            } else {
              throw new Error("unrecognized symbol")
            }
          })
      })
    HTMLTable.style.setProperty('--cells-horizontaly', this.#cells.length.toString())
  }
}

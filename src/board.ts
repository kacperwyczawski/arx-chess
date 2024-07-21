import { Cell } from "./cell";
import maps from "./maps.txt?raw";
import { Pawn } from "./pieces/pawn";

export class Board {
	#cells: Cell[][] = [];

	get cells() {
		return this.#cells.flat();
	}

	constructor(
		HTMLTable: HTMLTableElement,
		mapName: string,
		onCellClick: (clickedCell: Cell) => void,
		onCastleClick: (clickedCell: Cell) => void,
	) {
		const map = maps
			.split("\n\n")
			.find((s) => s.startsWith(mapName))
			?.replace(/^.*\n/, "")
			?.split("\n");

		if (!map) {
			throw new Error("there is no map with this name");
		}

		const HTMLBody = HTMLTable.createTBody();
		map.forEach((row, y) => {
			const HTMLRow = HTMLBody.insertRow();
			this.#cells[y] = [];
			for (const symbol of row.split("")) {
				const cell = new Cell(HTMLRow.insertCell());
				cell.onClick = () => {
					onCellClick(cell);
				};
				cell.onMenu = () => {
					onCastleClick(cell);
				};
				this.#cells[y].push(cell);

				if (symbol === ".") {
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
					throw new Error("unrecognized symbol");
				}
			}
		});
		HTMLTable.style.setProperty(
			"--cells-horizontaly",
			this.#cells.length.toString(),
		);
	}
}

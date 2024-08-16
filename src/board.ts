import { OldCell } from "./cell";
import maps from "./maps.txt?raw";
import { Pawn } from "./pieces/pawn";

export class OldBoard {
	#cells: OldCell[][] = [];

	get cellsFlat() {
		return this.#cells.flat();
	}

	get cells() {
		return this.#cells;
	}

	constructor(
		HTMLTable: HTMLTableElement,
		mapName: string,
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
			row.split("").forEach((symbol, x) => {
				const cell = new OldCell(HTMLRow.insertCell(), x, y);
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
			});
		});
		HTMLTable.style.setProperty(
			"--cells-horizontaly",
			this.#cells.length.toString(),
		);
	}
}

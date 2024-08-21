import { Pawn } from "../pieces/pawn";
import type { Cell } from "./cell";
import type { Player } from "./player";
import type { Point } from "./point";
const maps: Record<string, { default: string }> = import.meta.glob(
	"../maps/*.txt",
	{
		query: "?raw",
		eager: true,
	},
);

export default class Board {
	#cells: Cell[][] = [];

	get rows() {
		return this.#cells;
	}

	get allCells() {
		return this.#cells.flat();
	}

	get height() {
		return this.#cells.length;
	}

	get width() {
		return this.#cells[0].length;
	}

	constructor(mapName: string, players: Player[]) {
		const map = maps[`../maps/${mapName}.txt`].default.split("\n");
		map.pop();
		map.forEach((row, y) => {
			this.#cells[y] = [];
			row.split("").forEach((symbol, x) => {
				const cell: Cell = {
					owner: null,
					building: null,
					piece: null,
					point: { x, y },
				};
				if (symbol === ".") {
				} else if (symbol === "1") {
					cell.piece = new Pawn("white");
					cell.building = "castle";
					cell.owner = players[0];
				} else if (symbol === "2") {
					cell.piece = new Pawn("black");
					cell.building = "castle";
					cell.owner = players[1];
				} else if (symbol === "w") {
					cell.building = "wall";
				} else if (symbol === "c") {
					cell.building = "castle";
				} else {
					throw new Error("unrecognized symbol");
				}
				this.#cells[y].push(cell);
			});
		});
	}

	cellAt(point: Point) {
		return this.#cells[point.y][point.x];
	}
}

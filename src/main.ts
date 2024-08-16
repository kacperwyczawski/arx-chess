import Panzoom from "@panzoom/panzoom";
import Game from "./game/game.ts";
import { Piece } from "./pieces/piece.ts";

const game = new Game("canyon")
const table = q("#board") as HTMLTableElement;
// new OldGame(board, new URLSearchParams(location.search).has("tutorial"));
table.style.setProperty(
	"--cells-horizontaly",
	game.board.size.toString()
);
const tableBody = table.createTBody()
for (let x = 0; x < game.board.size; x++) {
	const tableRow = tableBody.insertRow()
	for (let y = 0; y < game.board.size; y++) {
		const tableCell = tableRow.insertCell()
		const cell = game.board.cellAt({x, y})
		tableCell.classList.add("cell")
		if (cell.building === "castle") {
			tableCell.classList.add("building");
			const div = document.createElement("div");
			div.title = "Castle"
			div.classList.add("cell-annotation");
			div.textContent = "c"
			tableCell.appendChild(div);
		}
	}
}

renderGame()

Panzoom(table, {
	disableZoom: true,
	startX: window.innerWidth / 2 - table.clientWidth / 2,
	startY: window.innerHeight / 2 - table.clientHeight / 2,
});

function q(selector: string) {
	const element = document.querySelector(selector);
	if (!element) {
		throw new Error(`It's a bug! No element matching '${selector}' found`);
	}
	return element;
}

function allTableCells() {
	return [...table.rows].flatMap((row) => [...row.cells])
}

function renderGame() {
	for (let x = 0; x < game.board.size; x++) {
		for (let y = 0; y < game.board.size; y++) {
			const cell = game.board.cellAt({x, y})
			const tableCell = table.rows[y].cells[x]
			tableCell.classList.remove("selected", "highlighted", "piece-to-move")
			tableCell.style.setProperty(
				"--outline",
				"",
			);
			tableCell.style.setProperty(
				"--background-image-url",
				"",
			);
			if (cell.building === "wall") {
				tableCell.classList.add("wall")
			} else if (cell.building) {
				tableCell.children[0].textContent = cell.building[0];
				(tableCell.children[0] as HTMLElement).title = cell.building
			}
			if (cell.piece) {
				tableCell.style.setProperty(
					"--background-image-url",
					`url('/${cell.piece.name}-${cell.piece.color}.png')`,
				);
				tableCell.classList.add("piece-to-move");
			}
			if (cell.owner) {
				tableCell.style.setProperty(
					"--outline",
					`var(--player-${cell.owner.color})`,
				);
			}
			tableCell.onclick = () => {
				if (cell.piece?.color === game.currentPlayer.color) {
					tableCell.classList.add("selected")
					game.select({x, y})
					for (const point of game.getAvailableMoves({x, y})) {
						const c = table.rows[point.y].cells[point.x]
						c.classList.add("highlighted")
					}
				} else if (tableCell.classList.contains("highlighted")) {
					game.moveTo({x, y})
					game.endTurn()
					if (game.winner) {
						alert(game.winner)
						// TODO: use dialog
					}
					renderGame()
				} else {
					for (const c of allTableCells()) {
						c.classList.remove("selected", "highlighted")
					}
				}
			}
		}
	}
}

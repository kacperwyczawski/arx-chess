import Panzoom from "@panzoom/panzoom";
import Game from "./game/game.ts";

const game = new Game("canyon")
game.afterEndTurn = (winner) => {
	if (winner) {
		alert(winner)
		// TODO: use dialog
	}
	renderGame()
}
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
		const cell = game.board.cellAt({ x, y })
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

const castleMenu = q("#castle-menu") as HTMLDialogElement;
const castleMenuPieces = q("#castle-menu-pieces") as HTMLUListElement;
const castleMenuUpgrades = q("#castle-menu-upgrades") as HTMLUListElement;

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
			const point = { x, y };
			const cell = game.board.cellAt(point)
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
			tableCell.oncontextmenu = null
			if (cell.building === "wall") {
				tableCell.classList.add("wall")
			} else if (cell.building) {
				tableCell.children[0].textContent = cell.building[0];
				(tableCell.children[0] as HTMLElement).title = cell.building
				if (cell.owner === game.currentPlayer) {
					tableCell.oncontextmenu = (event) => {
						event.preventDefault()
						castleMenu.showModal();
						castleMenuPieces.innerHTML = "";
						for (const { piece, available, calculatedPrice } of game.getPiecesToBuy(point)) {
							const li = document.createElement("li");
							li.classList.add("cell");
							li.style.backgroundImage = `url('/${piece.name}-${piece.color}.png')`;
							if (available) {
								li.onclick = () => {
									game.buyPiece(point, piece)
									castleMenu.close();
								};
							} else {
								li.classList.add("not-available");
							}
							const div = document.createElement("div");
							div.classList.add("cell-annotation");
							div.textContent = calculatedPrice.toString();
							li.appendChild(div);
							castleMenuPieces.appendChild(li);
						}
						for (const button of castleMenuUpgrades.querySelectorAll("button")) {
							if (game.currentPlayer.canBuyUpgrade()) {
								button.disabled = true;
							} else {
								button.onclick = () => {
									game.buyUpgrade(point, button.innerText.toLocaleLowerCase())
									castleMenu.close();
								}
							}
						}
					}
				}
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
					game.select(point)
					for (const destination of game.getAvailableMoves(point)) {
						const c = table.rows[destination.y].cells[destination.x]
						c.classList.add("highlighted")
					}
				} else if (tableCell.classList.contains("highlighted")) {
					game.moveTo(point)
				} else {
					for (const c of allTableCells()) {
						c.classList.remove("selected", "highlighted")
					}
				}
			}
		}
	}
}

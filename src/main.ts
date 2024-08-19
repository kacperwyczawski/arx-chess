import Panzoom from "@panzoom/panzoom";
import Game from "./game/game.ts";

// TODO: warn when piece limit is hit

let firstRender = true;
const game = new Game("canyon");
game.afterEndTurn = (winner) => {
	if (winner) {
		gameOverDialog.showModal();
		gameOverDialog.children[0].textContent = `Game over! ${winner[0].toLocaleUpperCase() + winner.substring(1)} is the winner.`;
	}
	renderGame();
};
const table = q("#board") as HTMLTableElement;
// new OldGame(board, new URLSearchParams(location.search).has("tutorial"));
table.style.setProperty("--cells-horizontaly", game.board.size.toString());
const tableBody = table.createTBody();
for (let x = 0; x < game.board.size; x++) {
	const tableRow = tableBody.insertRow();
	for (let y = 0; y < game.board.size; y++) {
		const tableCell = tableRow.insertCell();
		const cell = game.board.cellAt({ x, y });
		tableCell.classList.add("cell");
		if (cell.building === "castle") {
			tableCell.classList.add("building");
			const div = document.createElement("div");
			div.title = "Castle";
			div.classList.add("cell-annotation");
			div.textContent = "c";
			tableCell.appendChild(div);
		}
	}
}

const castleMenu = q("#castle-menu") as HTMLDialogElement;
const castleMenuPieces = q("#castle-menu-pieces") as HTMLUListElement;
const castleMenuUpgrades = q("#castle-menu-upgrades") as HTMLUListElement;
const gameOverDialog = q("#game-over") as HTMLDialogElement;

q("#skip-turn").onclick = () => game.skipTurn();
q("#forfeit").onclick = () => game.forfeit();
q(`#${game.currentPlayer.color} .pieces`).textContent =
	game.currentPlayer.pieces.toString();
q(`#${game.currentPlayer.color} .gold`).textContent =
	game.currentPlayer.gold.toString();
q(`#${game.currentPlayer.color} .gold-per-turn`).textContent =
	game.currentPlayer.goldPerTurn.toString();
q(`#${game.currentPlayer.color} .max-pieces`).textContent =
	game.currentPlayer.maxPieces.toString();

renderGame();

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
	return element as HTMLElement;
}

function allTableCells() {
	return [...table.rows].flatMap((row) => [...row.cells]);
}

function updateValue(element: HTMLElement, newValue: string) {
	if (newValue !== element.textContent) {
		element.textContent = newValue
		element.animate([
			{ opacity: 1 },
			{ opacity: 0 },
			{ opacity: 1 }
		], {
			duration: 200,
		});
	}
}

function renderGame() {
		updateValue(q(`#${game.previousPlayer.color} .pieces`), game.previousPlayer.pieces.toString());
    updateValue(q(`#${game.previousPlayer.color} .gold`), game.previousPlayer.gold.toString());
    updateValue(q(`#${game.previousPlayer.color} .gold-per-turn`), game.previousPlayer.goldPerTurn.toString());
    updateValue(q(`#${game.previousPlayer.color} .max-pieces`), game.previousPlayer.maxPieces.toString());

	if (!firstRender) {
		q("#player-buttons").classList.toggle("white");
		q("#white").classList.toggle("active");

		q("#player-buttons").classList.toggle("black");
		q("#black").classList.toggle("active");
	}

	for (let x = 0; x < game.board.size; x++) {
		for (let y = 0; y < game.board.size; y++) {
			const point = { x, y };
			const cell = game.board.cellAt(point);
			const tableCell = table.rows[y].cells[x];
			tableCell.classList.remove("selected", "highlighted", "piece-to-move");
			tableCell.style.setProperty("--outline", "");
			tableCell.style.setProperty("--background-image-url", "");
			tableCell.oncontextmenu = null;
			if (cell.building === "wall") {
				tableCell.classList.add("wall");
			} else if (cell.building) {
				tableCell.children[0].textContent = cell.building[0];
				(tableCell.children[0] as HTMLElement).title = cell.building;
				if (cell.owner === game.currentPlayer) {
					tableCell.oncontextmenu = (event) => {
						event.preventDefault();
						castleMenu.showModal();
						castleMenuPieces.innerHTML = "";
						for (const {
							piece,
							available,
							calculatedPrice,
						} of game.getPiecesToBuy(point)) {
							const li = document.createElement("li");
							li.classList.add("cell");
							li.style.backgroundImage = `url('/${piece.name}-${piece.color}.png')`;
							if (available) {
								li.onclick = () => {
									game.buyPiece(point, piece);
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
						for (const button of castleMenuUpgrades.querySelectorAll(
							"button",
						)) {
							if (!game.currentPlayer.canBuyUpgrade()) {
								button.disabled = true;
							} else {
								button.disabled = false;
								button.onclick = () => {
									game.buyUpgrade(point, button.innerText.toLocaleLowerCase());
									castleMenu.close();
								};
							}
						}
					};
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
					tableCell.classList.add("selected");
					game.select(point);
					for (const destination of game.getAvailableMoves(point)) {
						const c = table.rows[destination.y].cells[destination.x];
						c.classList.add("highlighted");
					}
				} else if (tableCell.classList.contains("highlighted")) {
					game.moveTo(point);
				} else {
					for (const c of allTableCells()) {
						c.classList.remove("selected", "highlighted");
					}
				}
			};
		}
	}

	firstRender = false;
}

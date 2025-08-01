import Panzoom from "@panzoom/panzoom";
import Game from "./game/game.ts";
import { Point } from "./game/point.ts";
import { createClient, RealtimeChannel } from '@supabase/supabase-js'

const isMultiplayer = new URLSearchParams(document.location.search).get("multiplayer") === "true";
let channel: RealtimeChannel | null;
if (isMultiplayer) {
	const supabase = createClient(
		"https://yyflwqoyllmdwtmqmdyk.supabase.co",
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Zmx3cW95bGxtZHd0bXFtZHlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzODU0NDcsImV4cCI6MjA1MDk2MTQ0N30.8izAiPOC-8-OdIz-Qr2vBD8QvCRyGrGlYv8QocXCsQI")
	const lobby = supabase.channel("lobby");
	// channel = supabase.channel(channelName);
	// channel
	// 	.on(
	// 		"broadcast",
	// 		{ event: "connected" },
	// 		() => console.log("opponent connected")
	// 	)
	// 	.on(
	// 		"broadcast",
	// 		{ event: "test" },
	// 		(res) => console.log("test", res.payload)
	// 	)
	// 	.subscribe();
	// channel
	// 	.send({
	// 		type: "broadcast",
	// 		event: "connected",
	// 		payload: {}
	// 	})
}

const map = new URLSearchParams(document.location.search).get("map");
if (!map) {
	throw new Error();
}
const game = new Game(map);
game.afterEndTurn = (winner) => {
	if (winner) {
		gameOverDialog.showModal();
		gameOverDialog.children[0].textContent = `Game over! ${winner[0].toLocaleUpperCase() + winner.substring(1)} is the winner.`;
	}
	renderGame();
};
const table = q("#board") as HTMLTableElement;
// new OldGame(board, new URLSearchParams(location.search).has("tutorial"));
table.style.setProperty("--cells-horizontaly", game.board.width.toString());
const tableBody = table.createTBody();
for (let y = 0; y < game.board.height; y++) {
	const tableRow = tableBody.insertRow();
	for (let x = 0; x < game.board.width; x++) {
		const tableCell = tableRow.insertCell();
		const cell = game.board.cellAt({ x, y });
		tableCell.classList.add("cell");
		if (cell.building === "castle") {
			tableCell.classList.add("castle");
		}
	}
}

const castleMenu = q("#castle-menu") as HTMLDialogElement;
const castleMenuPieces = q("#pieces") as HTMLUListElement;
const castleMenuLockedPieces = q("#locked-pieces") as HTMLUListElement;
const pieceLimitInfo = q("#piece-limit-info") as HTMLSpanElement;
const gameOverDialog = q("#game-over") as HTMLDialogElement;

q(`#${game.currentPlayer.color} .pieces`).textContent =
	game.currentPlayer.pieces.toString();
q(`#${game.currentPlayer.color} .gold`).textContent =
	game.currentPlayer.gold.toString();
q(`#${game.currentPlayer.color} .max-pieces`).textContent =
	game.currentPlayer.maxPieces.toString();

function forfeit() {
	if (confirm("Are you sure you want to forfeit?")) {
		game.forfeit()
	}
}

q("#black .forfeit").onclick = () => forfeit();
q("#white .forfeit").onclick = () => forfeit();

q("#white .skip-turn").onclick = () => game.skipTurn();
q("#black .skip-turn").onclick = () => game.skipTurn();

renderGame();

Panzoom(table, {
	disableZoom: true,
	startX: window.innerWidth / 2 - table.clientWidth / 2,
	startY: window.innerHeight / 2 - table.clientHeight / 2,
	cursor: "default",
	roundPixels: true,
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
		element.textContent = newValue;
		element.animate([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], {
			duration: 200,
		});
	}
}

function renderGame() {
	updateValue(
		q(`#${game.currentPlayer.color} .pieces`),
		game.currentPlayer.pieces.toString(),
	);
	updateValue(
		q(`#${game.currentPlayer.color} .max-pieces`),
		game.currentPlayer.maxPieces.toString(),
	);
	updateValue(
		q(`#${game.previousPlayer.color} .pieces`),
		game.previousPlayer.pieces.toString(),
	);
	updateValue(
		q(`#${game.previousPlayer.color} .gold`),
		game.previousPlayer.gold.toString(),
	);

	q(`#${game.currentPlayer.color} .player-buttons`).style.visibility = "visible"
	q(`#${game.previousPlayer.color} .player-buttons`).style.visibility = "hidden"

	q(`#${game.currentPlayer.color}`).classList.add("active")
	q(`#${game.previousPlayer.color}`).classList.remove("active")

	for (let x = 0; x < game.board.width; x++) {
		for (let y = 0; y < game.board.height; y++) {
			const point = { x, y };
			const cell = game.board.cellAt(point);
			const tableCell = table.rows[y].cells[x];
			tableCell.classList.remove("selected", "highlighted", "slightly-highlighted", "piece-to-move");
			tableCell.style.setProperty("--outline", "");
			tableCell.style.setProperty("--background-image-url", "");
			if (cell.building === "wall") {
				tableCell.classList.add("wall");
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
				// temp
				channel
					?.send({
						type: "broadcast",
						event: "test",
						payload: point
					})
				if (
					cell.piece?.color === game.currentPlayer.color
				) {
					for (const c of allTableCells()) {
						c.classList.remove("selected", "highlighted", "slightly-highlighted");
						game.unselect();
					}
					tableCell.classList.add("selected");
					game.select(point);
					for (const destination of game.getAvailableMoves(point)) {
						const c = table.rows[destination.y].cells[destination.x];
						c.classList.add("highlighted");
					}
				} else if (cell.piece?.color === game.previousPlayer.color && !tableCell.classList.contains("highlighted")) {
					if (game.hasSelectedPoint) {
						for (const c of allTableCells()) {
							c.classList.remove("selected", "highlighted", "slightly-highlighted");
							game.unselect();
						}
					}
					tableCell.classList.add("selected");
					for (const destination of game.getAvailableMoves(point)) {
						const c = table.rows[destination.y].cells[destination.x];
						c.classList.add("slightly-highlighted");
					}
				} else if (tableCell.classList.contains("highlighted")) {
					game.moveTo(point);
				}
				else if (cell.building === "castle" && cell.owner === game.currentPlayer) {
					openCastleMenu(point)
				} else {
					for (const c of allTableCells()) {
						c.classList.remove("selected", "highlighted", "slightly-highlighted");
						game.unselect();
					}
				}
			};
		}
	}
}

function openCastleMenu(point: Point) {
	castleMenu.showModal();
	castleMenuPieces.innerHTML = "";
	if (game.currentPlayer.hasReachedPieceLimit()) {
		pieceLimitInfo.style.visibility = "hidden"
	} else {
		pieceLimitInfo.style.visibility = "visible"
	}
	for (const { piece, isAvailable } of game.getPiecesToBuy()) {
		const li = document.createElement("li");
		li.classList.add("cell");
		li.style.backgroundImage = `url('/${piece.name}-${piece.color}.png')`;
		if (isAvailable) {
			li.onclick = () => {
				game.buyPiece(point, piece);
				castleMenu.close();
			};
		} else {
			li.classList.add("not-available");
		}
		const div = document.createElement("div");
		div.classList.add("cell-annotation");
		div.textContent = piece.cost.toString();
		li.appendChild(div);
		castleMenuPieces.appendChild(li);
	}
	let lockedPiecesHTML = ""
	for (const piece of game.nextAvailablePieces) {
		let lockedPieceHTML = ""
		for (const requirement of piece.requirements) {
			lockedPieceHTML += `<div class="cell${game.currentPlayer.boughtPieces.has(requirement.name) ? "" : " not-available"}" style="background-image: url('/${requirement.name}-${requirement.color}.png')"></div>`
		}
		lockedPiecesHTML += `<li><div class="cell not-available" style="background-image: url('/${piece.name}-${piece.color}.png')"></div><span>requires:</span>${lockedPieceHTML}</li>`
	}
	castleMenuLockedPieces.innerHTML = lockedPiecesHTML
}

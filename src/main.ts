import Panzoom from "@panzoom/panzoom";
import { Game } from "./game.ts";

const board = document.getElementById("board") as HTMLTableElement;
new Game(board);
Panzoom(board, {
	disableZoom: true,
	startX: window.innerWidth / 2 - board.clientWidth / 2,
	startY: window.innerHeight / 2 - board.clientHeight / 2,
});

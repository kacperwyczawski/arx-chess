import Panzoom from "@panzoom/panzoom";
import { Game } from "./game.ts";
import { q } from "./utils.ts";

const board = q("#board") as HTMLTableElement;
new Game(board);
Panzoom(board, {
	disableZoom: true,
	startX: window.innerWidth / 2 - board.clientWidth / 2,
	startY: window.innerHeight / 2 - board.clientHeight / 2,
});

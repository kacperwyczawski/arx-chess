import "./style.css";
import { Board } from "./board.ts";

const board = new Board();
board.setup(document.querySelector<HTMLTableElement>("#board")!);

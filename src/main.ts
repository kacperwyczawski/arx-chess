import "./style.css";
import { Board } from "./board.ts";

new Board(
    document.querySelector<HTMLTableElement>("#board")!,
    document.querySelector<HTMLElement>("#white")!,
    document.querySelector<HTMLElement>("#black")!
);

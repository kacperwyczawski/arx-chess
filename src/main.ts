import "./style.css";
import { Board } from "./board.ts";

function $(selector: string): HTMLElement {
    return document.querySelector(selector)!;
}

new Board(
    $("#board") as HTMLTableElement,
    $("#white"),
    $("#black"),
    $("#white-pieces"),
    $("#black-pieces"),
    $("#white-max-pieces"),
    $("#black-max-pieces")
);

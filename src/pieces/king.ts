import { Piece } from "./piece";

export class King implements Piece {
    color;

    constructor(color: "white" | "black") {
        this.color = color;
    }

    toString() {
        return "king";
    }
}
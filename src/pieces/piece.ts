export class Piece {
    #color;

    get color() {
        return this.#color;
    }

    get cost() {
        return Infinity;
    }

    constructor(color: "white" | "black") {
        this.#color = color;
    }

    toString() {
        return this.constructor.name.toLowerCase();
    }
}
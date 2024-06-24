export class Piece {
    #color: PlayerColor;

    get color() {
        return this.#color;
    }

    get cost() {
        return Infinity;
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }

    toString() {
        return this.constructor.name.toLowerCase();
    }
}
export class Piece {
    #color: PlayerColor;

    get color() {
        return this.#color;
    }

    get cost() {
        return Infinity;
    }

    get name() {
        return this.constructor.name.toLowerCase();
    }

    constructor(color: PlayerColor) {
        this.#color = color;
    }
}

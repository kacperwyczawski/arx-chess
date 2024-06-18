export class PieceCountDisplay {
    private elements = {
        white: document.querySelector("#white-pieces")!,
        black: document.querySelector("#black-pieces")!
    };

    private counts = {
        white: 1,
        black: 1
    };

    constructor() {
        this.elements.white.textContent = "1";
        this.elements.black.textContent = "1";
    }

    public reduce(player: Player) {
        this.counts[player]--;
        this.elements[player].textContent = this.counts[player].toString();
    }
}
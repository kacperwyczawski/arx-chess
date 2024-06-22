export class Player {
    #mainElement;
    #pieceCountElement;
    #pieceCount = 1;
    #maxPiecesElement;
    #maxPieces = 2;
    #goldElement;
    #gold = 0;
    #goldPerTurnElement;
    #goldPerTurn = 1;
    #color;

    get gold() {
        return this.#gold;
    }

    get color() {
        return this.#color;
    }

    constructor(
        color: PlayerColor
    ) {
        this.#color = color;
        function $(selector: string) {
            return document.querySelector(selector);
        }
        this.#mainElement = $(`#${color}`)!;
        this.#pieceCountElement = $(`#${color}-pieces`)!;
        this.#maxPiecesElement = $(`#${color}-max-pieces`)!;
        this.#goldElement = $(`#${color}-gold`)!;
        this.#goldPerTurnElement = $(`#${color}-gold-per-turn`)!;
        this.#pieceCountElement.textContent = "1";
        this.#maxPiecesElement.textContent = "2";
        this.#goldElement.textContent = "0";
        this.#goldPerTurnElement.textContent = "1";
    }

    removePiece() {
        this.#pieceCount--;
        this.#pieceCountElement.textContent = this.#pieceCount.toString();
    }

    addPiece() {
        this.#pieceCount++;
        this.#pieceCountElement.textContent = this.#pieceCount.toString();
    }

    increaseMaxPieces() {
        this.#maxPieces++;
    }

    decreaseMaxPieces() {
        this.#maxPieces--;
    }

    canPlacePiece() {
        return this.#pieceCount < this.#maxPieces;
    }

    startTurn() {
        this.#mainElement.classList.add("active");
    }

    endTurn() {
        this.#mainElement.classList.remove("active");
        this.#gold += this.#goldPerTurn;
        this.#goldElement.textContent = this.#gold.toString();
    }

    increaseGoldPerTurn() {
        this.#goldPerTurn++;
        this.#goldPerTurnElement.textContent = this.#goldPerTurn.toString();
    }

    decreaseGoldPerTurn() {
        this.#goldPerTurn--;
        this.#goldPerTurnElement.textContent = this.#goldPerTurn.toString();
    }

    decreaseGold(amount = 1) {
        this.#gold -= amount;
        this.#goldElement.textContent = this.#gold.toString();
    }
}
import { Piece } from "./pieces/piece";

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

    canPlacePiece() {
        return this.#pieceCount < this.#maxPieces;
    }

    handleFactoryCapture() {
        this.#maxPieces++;
        this.#maxPiecesElement.textContent = this.#maxPieces.toString();
        this.#goldPerTurn++;
        this.#goldPerTurnElement.textContent = this.#goldPerTurn.toString();
    }

    handleFactoryLoss() {
        this.#maxPieces--;
        this.#maxPiecesElement.textContent = this.#maxPieces.toString();
        this.#goldPerTurn--;
        this.#goldPerTurnElement.textContent = this.#goldPerTurn.toString();
    }

    handlePieceLoss() {
        this.#pieceCount--;
        this.#pieceCountElement.textContent = this.#pieceCount.toString();
    }

    handlePieceBuy(piece: Piece) {
        this.#gold -= piece.cost;
        this.#goldElement.textContent = this.#gold.toString();
        this.#pieceCount++;
        this.#pieceCountElement.textContent = this.#pieceCount.toString();
    }

    handleTurnEnd() {
        this.#gold += this.#goldPerTurn;
        this.#goldElement.textContent = this.#gold.toString();
    }

    handleTurnStart() {
        this.#mainElement.classList.add("active");
    }
}
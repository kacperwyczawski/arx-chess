export class Player {
    private mainElement;
    private pieceCountElement;
    private pieceCount = 1;
    private maxPiecesElement;
    private maxPieces = 2;
    private goldElement;
    private gold = 0;
    private goldPerTurnElement;
    private goldPerTurn = 1;

    constructor(
        public color: PlayerColor
    ) {
        function $(selector: string) {
            return document.querySelector(selector);
        }
        this.mainElement = $(`#${color}`)!;
        this.pieceCountElement = $(`#${color}-pieces`)!;
        this.maxPiecesElement = $(`#${color}-max-pieces`)!;
        this.goldElement = $(`#${color}-gold`)!;
        this.goldPerTurnElement = $(`#${color}-gold-per-turn`)!;
        this.pieceCountElement.textContent = "1";
        this.maxPiecesElement.textContent = "2";
        this.goldElement.textContent = "0";
        this.goldPerTurnElement.textContent = "1";
    }

    public removePiece() {
        this.pieceCount--;
        this.pieceCountElement.textContent = this.pieceCount.toString();
    }

    public addPiece() {
        this.pieceCount++;
        this.pieceCountElement.textContent = this.pieceCount.toString();
    }

    public increaseMaxPieces() {
        this.maxPieces++;
    }

    public decreaseMaxPieces() {
        this.maxPieces--;
    }

    public canPlacePiece() {
        return this.pieceCount < this.maxPieces;
    }

    public startTurn() {
        this.mainElement.classList.add("active");
    }

    public endTurn() {
        this.mainElement.classList.remove("active");
        this.gold += this.goldPerTurn;
        this.goldElement.textContent = this.gold.toString();
    }

    public increaseGoldPerTurn() {
        this.goldPerTurn++;
        this.goldPerTurnElement.textContent = this.goldPerTurn.toString();
    }

    public decreaseGoldPerTurn() {
        this.goldPerTurn--;
        this.goldPerTurnElement.textContent = this.goldPerTurn.toString();
    }
}
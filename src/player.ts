export class Player {
    private mainElement;
    private pieceCountElement;
    private pieceCount = 1;
    private maxPiecesElement;
    private maxPieces = 2;

    constructor(
        public color: PlayerColor
    ) {
        function $(selector: string) {
            return document.querySelector(selector);
        }
        this.mainElement = $(`#${color}`)!;
        this.pieceCountElement = $(`#${color}-pieces`)!;
        this.maxPiecesElement = $(`#${color}-max-pieces`)!;
        this.pieceCountElement.textContent = "1";
        this.maxPiecesElement.textContent = "2";
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

    public toggleActive() {
        this.mainElement.classList.toggle("active");
    }
}
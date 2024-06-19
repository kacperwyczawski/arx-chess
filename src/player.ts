export class Player {
    private mainElement;
    private pieceCountElement;
    private pieceCount;

    color: PlayerColor;

    constructor(
        color: PlayerColor
    ) {
        function $(selector: string) {
            return document.querySelector(selector);
        }
        this.mainElement = $(`#${color}`)!;
        this.pieceCountElement = $(`#${color}-pieces`)!;
        this.pieceCount = 1;
        this.pieceCountElement.textContent = "1";
        this.color = color;
    }

    public removePiece() {
        this.pieceCount--;
        this.pieceCountElement.textContent = this.pieceCount.toString();
    }

    public addPiece() {
        this.pieceCount++;
        this.pieceCountElement.textContent = this.pieceCount.toString();
    }

    public toggleActive() {
        this.mainElement.classList.toggle("active");
    }
}
export class PlayerDisplay {
    private playerElements: [HTMLElement, HTMLElement] =
        [document.querySelector("#white")!, document.querySelector("#black")!]

    public currentPlayer: Player = "white";

    public NextPlayer() {
        this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
        this.playerElements.forEach((element) => {
            element.classList.toggle("active");
        });
    }
}
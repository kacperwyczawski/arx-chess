import { Bishop } from "./pieces/bishop";
import { Knight } from "./pieces/knight";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";
import { Pawn } from "./pieces/pawn";
import { Piece } from "./pieces/piece";

export class factoryMenu {
    #HTMLDialog: HTMLDialogElement;
    #HTMLList;

    constructor() {
        this.#HTMLDialog = document.getElementById('factory-menu') as HTMLDialogElement;
        this.#HTMLList = this.#HTMLDialog.children[0];
    }

    open(
        onBuy: (piece: Piece) => void,
        color: PlayerColor,
        gold: number
    ) {
        this.#HTMLDialog.showModal();
        this.#HTMLList.innerHTML = '';

        // TODO: outsource this to tech tree
        const pieces: Piece[] = [
            new Pawn(color),
            new Rook(color),
            new Knight(color),
            new Bishop(color),
            new Queen(color),
        ];

        // TODO: gray out pieces that player can't afford
        for (const piece of pieces) {
            const li = document.createElement('li');
            li.classList.add('cell');
		    li.style.backgroundImage = `url('${piece.toString()}-${piece.color}.png')`;
            if (piece.cost > gold) {
                li.classList.add('not-affordable');
            } else {
                li.onclick = () => {
                    onBuy(piece);
                    this.#HTMLDialog.close();
                }
            }

            const span = document.createElement('span');
            span.textContent = piece.cost.toString();

            li.appendChild(span);
            this.#HTMLList.appendChild(li);
        }
    }
}
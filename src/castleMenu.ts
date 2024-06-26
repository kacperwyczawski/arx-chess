import { Bishop } from "./pieces/bishop";
import { Knight } from "./pieces/knight";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";
import { Pawn } from "./pieces/pawn";
import { Piece } from "./pieces/piece";

export class castleMenu {
    #HTMLDialog: HTMLDialogElement;
    #HTMLList;

    constructor() {
        this.#HTMLDialog = document.getElementById('castle-menu') as HTMLDialogElement;
        this.#HTMLList = this.#HTMLDialog.children[0];
    }

    open(
        onBuy: (piece: Piece | Building) => void,
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

        const items: {
            cost: number,
            background: string,
            item: Piece | Building
        }[] = [];

        for (const piece of pieces) {
            items.push({
                cost: piece.cost,
                background: `url('${piece.toString()}-${piece.color}.png')`,
                item: piece
            });
        }

        items.push({
                cost: 3,
                background: 'url("upgrade-mine.png")',
                item: 'mine'
            }, {
                cost: 3,
                background: 'url("upgrade-barracks.png")',
                item: 'barracks'
            }
        )

        for (const item of items) {
            const li = document.createElement('li');
            li.classList.add('cell');
            li.style.backgroundImage = item.background;
            if (item.cost > gold) {
                li.classList.add('not-affordable');
            } else {
                li.onclick = () => {
                    onBuy(item.item);
                    this.#HTMLDialog.close();
                }
            }

            const span = document.createElement('span');
            span.textContent = item.cost.toString();

            li.appendChild(span);
            this.#HTMLList.appendChild(li);
        }
    }
}
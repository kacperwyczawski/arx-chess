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
    this.#HTMLList = this.#HTMLDialog.children[1];

    this.#HTMLDialog.children[0].addEventListener("click", () => {
      this.#HTMLDialog.close();
    })
  }

  open(
    onBuy: (piece: Piece | Building) => void,
    color: PlayerColor,
    gold: number,
    isFactory: boolean,
    isOccupied: boolean
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
        background: `url('${piece.name}-${piece.color}.png')`,
        item: piece
      });
    }

    for (const building of ["mine", "barracks", "factory"] as Building[]) {
      items.push({
        cost: 3,
        background: `url("upgrade-${building}.png")`,
        item: building
      })
    }

    for (const item of items) {
      const li = document.createElement('li');
      li.classList.add('cell');
      li.style.backgroundImage = item.background;

      const canAfford = this.#discount(item.cost, isFactory) <= gold;
      const isBuilding = typeof item.item === "string";

      if (canAfford && (isBuilding || !isOccupied)) {
        li.onclick = () => {
          onBuy(item.item);
          this.#HTMLDialog.close();
        }
      } else {
        li.classList.add('not-available');
      }

      const div = document.createElement('div');
      div.classList.add('cell-annotation');
      div.textContent = this.#discount(item.cost, isFactory).toString();
      li.appendChild(div);
      this.#HTMLList.appendChild(li);
    }
  }

  #discount(cost: number, factory: boolean): number {
    return factory ? Math.round(cost * 0.7) : cost
  }
}

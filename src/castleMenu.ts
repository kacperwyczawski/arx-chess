import { Amazon } from "./pieces/amazon";
import { Bishop } from "./pieces/bishop";
import { BishopKnight } from "./pieces/bishopKnight";
import { BishopRook } from "./pieces/bishopRook";
import { Knight } from "./pieces/knight";
import { KnightRook } from "./pieces/knightRook";
import { Pawn } from "./pieces/pawn";
import { PawnBishop } from "./pieces/pawnBishop";
import { PawnKnight } from "./pieces/pawnKnight";
import { PawnRook } from "./pieces/pawnRook";
import type { Piece } from "./pieces/piece";
import { Rook } from "./pieces/rook";
import type { Player } from "./player";

export class castleMenu {
	#HTMLDialog: HTMLDialogElement;
	#HTMLTopList: HTMLOListElement;
	#HTMLList: HTMLOListElement;

	constructor() {
		this.#HTMLDialog = document.getElementById(
			"castle-menu",
		) as HTMLDialogElement;
		this.#HTMLTopList = document.getElementById(
			"castle-menu-top-list",
		) as HTMLOListElement;
		this.#HTMLList = document.getElementById(
			"castle-menu-list",
		) as HTMLOListElement;
		document
			.getElementById("castle-menu-button")
			?.addEventListener("click", () => {
				this.#HTMLDialog.close();
			});
	}

	open(
		onBuyPiece: (piece: Piece) => void,
		onBuyBuilding: (building: Building) => void,
		player: Player,
		gold: number,
		isFactory: boolean,
		isOccupied: boolean,
	) {
		this.#HTMLDialog.showModal();
		this.#HTMLList.innerHTML = "";
		this.#HTMLTopList.querySelectorAll("li").forEach((li) => li.remove());

		const color = player.color;

		const pieces: Piece[] = [
			new Pawn(color),
			new PawnBishop(color),
			new PawnKnight(color),
			new PawnRook(color),
			new Rook(color),
			new Knight(color),
			new KnightRook(color),
			new Bishop(color),
			new BishopKnight(color),
			new BishopRook(color),
			new Amazon(color),
		].filter((p) => player.hasUnlocked(p));

		for (const piece of pieces) {
			const li = document.createElement("li");
			li.classList.add("cell");
			li.style.backgroundImage = `url('${piece.name}-${piece.color}.png')`;
			const canAfford = this.#discount(piece.cost, isFactory) <= gold;
			if (canAfford && !isOccupied) {
				li.onclick = () => {
					onBuyPiece(piece);
					this.#HTMLDialog.close();
				};
			} else {
				li.classList.add("not-available");
			}
			const div = document.createElement("div");
			div.classList.add("cell-annotation");
			div.textContent = this.#discount(piece.cost, isFactory).toString();
			li.appendChild(div);
			this.#HTMLList.appendChild(li);
		}

		for (const building of ["mine", "factory", "barracks"] as Building[]) {
			const li = document.createElement("li");
			li.textContent = `${building.substring(0, 4)}.`;
			const canAfford = this.#discount(3, isFactory) <= gold;
			if (canAfford) {
				li.onclick = () => {
					onBuyBuilding(building);
					this.#HTMLDialog.close();
				};
			} else {
				li.classList.add("not-available");
			}
			this.#HTMLTopList.appendChild(li);
		}
	}

	#discount(cost: number, factory: boolean): number {
		return factory ? Math.round(cost * 0.7) : cost;
	}
}

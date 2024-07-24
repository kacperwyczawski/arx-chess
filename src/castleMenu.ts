import type { Piece } from "./pieces/piece";
import type { Player } from "./player";
import { getAllPieces, q } from "./utils";

export class castleMenu {
	#HTMLDialog: HTMLDialogElement;
	#HTMLTopList: HTMLOListElement;
	#HTMLList: HTMLOListElement;

	constructor() {
		this.#HTMLDialog = q("#castle-menu") as HTMLDialogElement;
		this.#HTMLTopList = q("#castle-menu-top-list") as HTMLOListElement;
		this.#HTMLList = q("#castle-menu-list") as HTMLOListElement;
		q("#castle-menu-button")?.addEventListener("click", () => {
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
		for (const li of this.#HTMLTopList.querySelectorAll("li")) {
			li.remove();
		}

		const pieces = getAllPieces(player.color).filter((p) =>
			player.hasUnlocked(p),
		);

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
			li.textContent = building === "mine"
				? "mine"
				: building === "factory"
					? "fctry"
					: "brcks"
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

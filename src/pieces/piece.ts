import { Cell } from "../cell";

export interface Piece {
	get color(): PlayerColor;
	get cost(): number;
	get name(): string;
	get requirements(): Set<Piece>;
	highlightMoves(cells: Cell[][], x: number, y: number): void;
}

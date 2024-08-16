import Board from "../game/board";
import { Point } from "../game/point";

export interface Piece {
	get color(): PlayerColor;
	get cost(): number;
	get name(): string;
	get requirements(): Set<Piece>;
	getAvailableMoves(board: Board, point: Point): Point[];
}

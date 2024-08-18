import type { Piece } from "../pieces/piece";
import type { Player } from "./player";
import type { Point } from "./point";

export type Cell = {
	owner: Player | null;
	building: Building | null;
	piece: Piece | null;
	point: Point;
};

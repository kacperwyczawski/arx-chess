export interface Piece {
	get color(): PlayerColor;
	get cost(): number;
	get name(): string;
	get requirements(): Set<Piece>;
}

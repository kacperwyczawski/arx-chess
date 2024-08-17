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
import { Piece } from "./pieces/piece";
import { Rook } from "./pieces/rook";


export function getAllPieces(color: PlayerColor): Piece[] {
	return [
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
	];
}

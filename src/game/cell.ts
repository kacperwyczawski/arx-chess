import { Piece } from "../pieces/piece"
import { Player } from "./player"
import { Point } from "./point"

export type Cell = {
  owner: Player | null,
  building: Building | null,
  piece: Piece | null,
  point: Point
}

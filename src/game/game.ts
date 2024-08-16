import Board from "./board"
import { Player } from "./player";
import { Point } from "./point";

export default class Game {
  #board
	#players = [new Player("white"), new Player("black")];
	#currentPlayerIndex = 0
	#winner: PlayerColor | null = null
	#selectedPoint: Point | null = null

	get currentPlayer() {
	  return this.#players[this.#currentPlayerIndex]
	}

	get winner() {
	  return this.#winner
	}

  get board() {
    return this.#board
  }

  get selectedCell() {
    if (!this.#selectedPoint) {
      return null
    }
    return this.board.cellAt(this.#selectedPoint)
  }
  
  constructor(
    mapName: string
  ) {
    this.#board = new Board(mapName, this.#players)
  }

  getAvailableMoves(point: Point) {
    const piece = this.board.cellAt(point).piece
    if (!piece) {
      throw new Error
    }
    return piece.getAvailableMoves(this.board, point)
  }

  select(point: Point) {
    this.#selectedPoint = point
  }

  unselect() {
    this.#selectedPoint = null
  }

  moveTo(point: Point) {
    if (!this.#selectedPoint) {
      throw new Error
    }
    
    this.board.cellAt(point).piece = this.board.cellAt(this.#selectedPoint).piece
    this.board.cellAt(this.#selectedPoint).piece = null
  }

  endTurn() {
		this.currentPlayer.gold += this.currentPlayer.goldPerTurn

		// PLAYER CHANGE
		this.#currentPlayerIndex = (this.#currentPlayerIndex + 1) % 2;

		this.#selectedPoint = null
		for (const cell of this.#board.allCells.filter(
			(cell) =>
				cell.building && cell.piece?.color === this.currentPlayer.color,
		)) {
			cell.owner = this.currentPlayer
		}

		if (!this.#board.allCells.some((cell) => cell.owner?.color === "black")) {
		  this.#winner = "white"
		}

		if (!this.#board.allCells.some((cell) => cell.owner?.color === "white")) {
		  this.#winner = "black"
		}
  }
}

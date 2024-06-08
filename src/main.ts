import './style.css'
import { Board } from './board.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <table id="board"></table>
`

const board = new Board()
board.setup(document.querySelector<HTMLTableElement>('#board')!)
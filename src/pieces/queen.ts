import { Piece } from "./piece";


export class Queen extends Piece {
    get cost() {
        return 9;
    }
}

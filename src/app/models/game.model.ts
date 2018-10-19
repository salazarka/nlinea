
// simple example for indexing data into backend
export class Game {
    constructor(
        public matrix: number[][],
        public size: number = 4,
        public toWin: number = 4,
        public fichasJ1: number,
        public fichasJ2: number,
        public turno: number,
        public jugada: boolean,
        public win: boolean,
        public coordX: number= 0,
        public coordY: number= 0,
        // CONFIG:
        public colorJ1: string = 'rgb(255,0,0)',
        public colorJ2: string = 'rgb(255,0,0)',
        public gameMode: number = 1 // 1: 1 vs 1, 2: 1 vs IA


    ) { }

}


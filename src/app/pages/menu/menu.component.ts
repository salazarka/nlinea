import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { MenuService } from '../../services/service.index';
import { GameService } from '../../services/service.index';
import { Game } from '../../models/game.model';
import { MenuService } from '../../services/service.index';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {
  game: Game;
  name: string;
  @Input() color1: any = 'rgb(255,0,0)';
  @Input() color2: any = 'rgb(255,0,0)';

  constructor( public router: Router, public _gaming: GameService,
    public _settingsService: MenuService) {
    // const params = JSON.stringify(this._settingsService.retrieveData());
    // console.log(params);
    this.game = new Game([], 4, 4, 1, 1, 1, true, false, 0, 0);
    this._settingsService.retrieveData().subscribe(
      result => { // llamar no a un service si no hacer la petición directamente

        this.name = 'Welcome ' + result.name; // verificar el dato de otra manera
      },
      error => {
        console.log(<any>error);
      }
    );
    // this.name = params;
  }

  ngOnInit() {
    // this.showUserName();
    this.paint();
  }
  ingresar() {
    this.router.navigate(['/dashboard']);
  }
  paint() { // RECIBE EL TAMAÑO DEL TABLERO: N X N //debería recibir el obj juego
    const canvas1: any = document.getElementById('player1');
    const canvas2: any = document.getElementById('player2');
    canvas1.width = 1 * 90;  // VARIABLES QUE ACTUALIZAN LOS VALORES DEL CANVAS DE ACUERDO AL TAMAÑO DEL TABLERO
    canvas1.height = 1 * 90;

    canvas2.width = 1 * 90;  // VARIABLES QUE ACTUALIZAN LOS VALORES DEL CANVAS DE ACUERDO AL TAMAÑO DEL TABLERO
    canvas2.height = 1 * 90;
        // se debe cambiar este ciclo x un ngFor y con una variable cargada desde el backend
    if (canvas1.getContext && canvas2.getContext) {
      const ctx1 = canvas1.getContext('2d');
      const ctx2 = canvas2.getContext('2d');
      ctx1.clearRect(0, 0, canvas1.width, canvas1.height); // LIMPIA EL CANVAS
      ctx1.strokeRect(0 * 90, 0 * 90, 90, 90); // ES UNA FICHA CON FORMATO: (x,y,width,height)

      ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // LIMPIA EL CANVAS
      ctx2.strokeRect(0 * 90, 0 * 90, 90, 90); // ES UNA FICHA CON FORMATO: (x,y,width,height)
    }
   }
   setColor(newValue: string, player: string) {
     // console.log(newValue);
     if (player === 'player1') { // le preg q jugador es y lo seteo
       this.game.colorJ1 = newValue;

     } else {
       this.game.colorJ2 = newValue;
     }
     const canvas: any = document.getElementById(player);
     if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = newValue; // DEFINE EL COLOR DE LA FIGURA
      ctx.fillRect(0 * 90, 0 * 90, 90, 90);

     }
   }
   setGame() { // RECIBE EL TAMAÑO DEL TABLERO: N X N //debería recibir el obj juego
    this._gaming.newGame(this.game).subscribe(
      result => {
        this.game.matrix = result.matrix;
        this.game.colorJ1 = result.colorJ1;
        this.game.colorJ2 = result.colorJ2;
        this.game.gameMode = result.gameMode;
        this.ingresar();
      },
      error => {
        console.log(<any>error);
      }

    );
    /* const canvas: any = document.getElementById('stage');
    canvas.width = this.game.size * 90;  // VARIABLES QUE ACTUALIZAN LOS VALORES DEL CANVAS DE ACUERDO AL TAMAÑO DEL TABLERO
    canvas.height = this.game.size * 90;
        // se debe cambiar este ciclo x un ngFor y con una variable cargada desde el backend
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // LIMPIA EL CANVAS
      for ( let i = 0; i <= this.game.size; i++) { // CICLO QUE SE ENCARGA DE INSERTAR CADA FICHA
        for (let j = 0; j <= this.game.size; j++) {
            ctx.strokeRect(i * 90, j * 90, 90, 90); // ES UNA FICHA CON FORMATO: (x,y,width,height)
        }
      }
    } */
    // console.log(stringify(this.game));

   }
}

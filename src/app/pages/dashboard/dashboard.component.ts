import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ThrowStmt } from '../../../../node_modules/@angular/compiler';
import { GameService } from '../../services/service.index';
import { Game } from '../../models/game.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  game: Game;

  control = 0; // VARIABLE PARA COLOCAR UNA FICHA UNA FILA ANTERIOR SI LA ACTUAL ESTA LLENA
  numeros2: number[] = new Array(); // ARREGLO QUE SE USA PARA ALACENAR LOS NUMEROS GENERADOS AL AZAR
  // nameSpace: String;

  constructor( public _gaming: GameService) {

   }
  ngOnInit() {
    // CONSULTAR SERVICE PARA CARGAR JUEGO
    this.drawRectable();

  }

  // -----------------------------------------------------------------------------------------------------
  // FUNCIÓN QUE PINTA UN CUADRO CUANDO LEE UN CLICK EN EL CANVAS
  // -----------------------------------------------------------------------------------------------------
  tryPlay(event) {
    const canvas: any = document.getElementById('stage');
    if (canvas.getContext) { // CHECKEA QUE EL CONTEXTO EXISTA
      const ctx = canvas.getContext('2d');
      const i = event.offsetX; // UBICA LA COORDENADA X
      const j = event.offsetY; // UBICA LA COORDENADA Y
      for (let x = 0; x <= this.game.size; x++) {
        for (let y = 0; y <= this.game.size; y++) {
          if ( (i >= x * 90 && i <= x * 90 + 90) && (j >= y * 90 && j <= y * 90 + 90) ) {
            this.game.coordX = x; // se setean las coordenadas (x, y) del click
            this.game.coordY = y;
            break;
          }
        }
      }
      this._gaming.playGame(this.game).subscribe(
        result => { // CARGA EL JSON CON LOS DATOS QUE RESPONDE EL BACK END
          this.game.matrix = result.matrix; // SE LO ASIGNO A LA VAR TIPO game (game.model)
          this.game.coordX = result.coordX;
          this.game.coordY = result.coordY;
          this.game.jugada = result.jugada;
          this.game.win = result.win;
          this.game.turno = result.turno;
          this.game.colorJ1 = result.colorJ1;
          this.game.colorJ2 = result.colorJ2;
          console.log('MATRIZ: ', this.game.matrix);
          if (this.game.win === true) {
            if (this.game.turno === 1) {
              ctx.fillStyle =  this.game.colorJ2; // 'rgb(160, 140, 160)'; // DEFINE EL COLOR DE LA FIGUTA
              ctx.fillRect(this.game.coordX * 90, this.game.coordY * 90, 90, 90);
              if (confirm("JUGADOR 1 GANA")) {
                console.log("ok");
              } else {
                this.drawRectable();
              }
            } else {
              ctx.fillStyle = this.game.colorJ2; // 'rgb(100, 100, 100)'; // DEFINE EL COLOR DE LA FIGUTA
              ctx.fillRect(this.game.coordX * 90, this.game.coordY * 90, 90, 90);
              if (confirm("JUGADOR 2 GANA")) {
                console.log("ok");
              } else {
                this.drawRectable();
              }
            }
          } else {
            if (this.game.jugada === false) {
              alert('JUGADA INVALIDA');
            } else {
              if (this.game.turno === 2) {
                /* console.log('ESTADO MATRIZ: ', this.game.matrix, '\nTURNO: ', this.game.turno,
                  '\nSE PUEDE JUGAR?: ', this.game.jugada); */
                ctx.fillStyle = this.game.colorJ2; // DEFINE EL COLOR DE LA FIGUTA
                ctx.fillRect(this.game.coordX * 90, this.game.coordY * 90, 90, 90);
              } else {
                ctx.fillStyle = this.game.colorJ1; // DEFINE EL COLOR DE LA FIGUTA
                ctx.fillRect(this.game.coordX * 90, this.game.coordY * 90, 90, 90);
              }
            }
          }

        },
        error => {
          console.log(<any>error);
        }

      );
    }
  }
  // -----------------------------------------------------------------------------------------------------
  // FUNCIÓN QUE SE ENCARGA DE CREAR EL TABLERO DE JUEGO
  // -----------------------------------------------------------------------------------------------------
  drawRectable() { // RECIBE EL TAMAÑO DEL TABLERO: N X N //debería recibir el obj juego
    this._gaming.retrieveGame().subscribe(
      result => {
        this.game = new Game(
          result.matrix,
          result.size,
          result.toWin, 1, 1, 1, true, false, 0, 0,
          result.colorJ1,
          result.colorJ2,
          result.gameMode);
          console.log('MATRIX: ', this.game.matrix);
          console.log('COLOR J1: ', this.game.colorJ1);
          const canvas: any = document.getElementById('stage');
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
          }
        /* this.game.matrix = result.matrix;
        this.game.colorJ1 = result.colorJ1;
        this.game.colorJ2 = result.colorJ2;
        this.game.gameMode = result.gameMode; */
      },
      error => {
        console.log(<any>error);
      }
    );
   }


}

 /*  winCondition(cantidad: number) {
    this.game.toWin = cantidad;
   console.log('Cantidad fichas de gane: ', cantidad);
  }
 */
  // JUGADOR AUTOMATICO
  /*
  jugaadorAutomatico(event) {
    this.random(); // GENERA UNA LISTA DE NUMEROS RANDOM CON EL LA CANTIDAD DE CASILLAS(TAM)
    let yA = this.game.size-1; // PARA COLOCAR LAS FICHAS EN LA FILA BASE DEL TABLERO
    const canvas: any = document.getElementById('stage');
    if (canvas.getContext) { // CHECKEA QUE EL CONTEXTO EXISTA
      let ctx = canvas.getContext('2d');
      let i = event.offsetX; // UBICA LA COORDENADA X
      let j = event.offsetY; // UBICA LA COORDENADA Y
      for (let x = 0; x <= this.game.size; x++) {// voy a suponer que el tablero es de tam 4
        for (let y = 0; y <= this.game.size; y++) {
          if ( (i >= x * 90 && i <= x * 90 + 90) && (j >= y * 90 && j <= y * 90 + 90) ) {
            if ( (y + 1 == this.game.size) && (this.matrix[y][x] == 0) ) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA
              this.matrix[y][x] = 1; // COLOCA FICHA 1
              ctx.fillStyle = 'rgb(160, 140, 160)'; // DEFINE EL COLOR DE LA FIGUTA
              ctx.fillRect(x * 90, y * 90, 90, 90);
              this.turno = 0; // CAMBIO DE TURNO
              this.control++;
              this.verificarGane();

              // LOGICA JUGADOR AUTOMATICO PARA LA BASE DEL TABLERO
                for (let xA = 0; xA <= this.game.size; xA++) { //CICLO PARA RECORRER EL LISTA DE NUMEROS RANDOM 
                  if ( (this.matrix[yA][this.numeros2[xA]] == 0) && (this.turno == 0) ) { // VERIFICA QUE EN LA MATRIZ SE PUEDA COLOCAR LA FICHA
                    this.matrix[yA][this.numeros2[xA]] = 2; // COLOCA FICHA 2 (JUGADOR AUTOMATICO)
                    //console.log(this.matrix)
                    ctx.fillStyle = 'rgb(120, 160, 127)'; // DEFINE EL COLOR DE LA FIGUTA
                    ctx.fillRect(this.numeros2[xA] * 90, yA * 90, 90, 90);
                    this.turno = 1; // CAMBIO DE TURNO
                    this.control++;
                    this.verificarGane();
                  }
                }

                // SI LA FILA BASE ESTA LLENA COLOCA LA FICHA JUGADOR AUTOMATICO 1 FILA ARRIBA
                if (this.control==this.game.size) {
                  for (let xA = 0; xA <= this.game.size; xA++) { //CICLO PARA RECORRER EL LISTA DE NUMEROS RANDOM 
                    if ( (this.matrix[yA-1][this.numeros2[xA]] == 0) && (this.turno == 0) ) { // VERIFICA QUE EN LA MATRIZ SE PUEDA COLOCAR LA FICHA
                      this.matrix[yA-1][this.numeros2[xA]] = 2; // COLOCA FICHA 2 (JUGADOR AUTOMATICO)
                      ctx.fillStyle = 'rgb(120, 160, 127)'; // DEFINE EL COLOR DE LA FIGUTA
                      ctx.fillRect(this.numeros2[xA] * 90, (yA-1) * 90, 90, 90);
                      this.turno = 1; // CAMBIO DE TURNO
                      this.control = 0;
                      this.verificarGane();
                    }
                  }
                }
                
                // LOGICA JUGADOR AUTOMATICO PARA LA BASE DEL TABLERO
              } else if ( (this.matrix[y + 1][x] != 0 ) && (this.matrix[y][x] == 0) && (this.turno == 1) ) { // JUGAR SOBRE UNA FICHA
                this.matrix[y][x] = 1; // FICHA JUGADOR 1
                ctx.fillStyle = 'rgb(160, 140, 160)';
                ctx.fillRect(x * 90, y * 90, 90, 90);
                this.control++;
                this.turno = 0; // CAMBIO DE TURNO
                this.verificarGane();
                //console.log(this.matrix)
                
                // LOGICA JUGADOR AUTOMATICO PARA DEMAS TABLERO
                for (let i = 0; i <= this.game.size; i++) { // CICLO PARA RECORRER EL LISTA DE NUMEROS RANDOM 
                  if ( (this.matrix[y][this.numeros2[i]] == 0) && (this.turno == 0) ) { // VERIFICA QUE EN LA MATRIZ SE PUEDA COLOCAR LA FICHA
                    if ( (this.matrix[y+1][this.numeros2[i]] == 0) ) { // POSICIONA LA FICHA EN LA ANTERIOR FILA SI ESTA VACIA
                      this.matrix[y+1][this.numeros2[i]]=2; // FICHA JUGADOR 2
                      this.turno = 1; // CAMBIO DE TURNO
                      ctx.fillStyle = 'rgb(120, 160, 127)'; // DEFINE EL COLOR DE LA FIGUTA
                      ctx.fillRect(this.numeros2[i] * 90, (y+1) * 90, 90, 90);
                      this.verificarGane();
                    } 
                    else if (this.matrix[y][this.numeros2[i]] == 0){ // SI TIENE UNA FICHA ABAJO SE COLOCA LA FICHA
                      this.matrix[y][this.numeros2[i]] = 2; // FICHA JUGADOR 2
                      this.turno = 1;// CAMBIO DE TURNO
                      ctx.fillStyle = 'rgb(120, 160, 127)'; // DEFINE EL COLOR DE LA FIGUTA
                      ctx.fillRect(this.numeros2[i] * 90, y * 90, 90, 90);
                      this.verificarGane();
                    }
                  }
                }
              }
              else {
                let r = Math.floor ( Math.random()*(this.game.size)) // GENERA NUMERO RANDOM EN EL RANGO DEL TAMAÑO DE LA FILA
                this.matrix[y][r] = 2; // FICHA JUGADOR 2
                ctx.fillStyle = 'rgb(160, 140, 160)';
                ctx.fillRect(r * 90, y * 90, 90, 90);
                this.turno = 1;// CAMBIO DE TURNO
                this.verificarGane();
              }
            }
            //console.log(this.matrix)
          } 
        }
      }
    }

  random() {
    let numeros = []; // ARREGLO PARA ALMACENAR NUMEROS
    while (numeros.length < this.game.size ) { //
      let numeroAleatorio = Math.floor ( Math.random()*(this.game.size)); //GENERA UN NUMERO AL AZAR, RANGO ENTRE 0 Y EL TAMAÑO DE LA FILA
      let existe = false; //CONDICION PARA NO REPETIR NUMEROS
      for (let i=0;i<numeros.length;i++) { // RECORRE EL ARRELGO "NUMEROS"
        if (numeros [i] == numeroAleatorio) { // CONDICION QUE VERIFICA SI EL NUMERO GENERADO ES IGUAL AL NUMERO ALMACENADO
          existe = true; // CONDICION PARA NO REPETIR NUMEROS 
        break;
      }
    }
    if (!existe) { // VERIFICA SI EL NUMERO NO EXISTE
      numeros[numeros.length] = numeroAleatorio; // AGREGA EL NUMERO AL ARREGLO
    }
  }
  this.numeros2 = numeros; //ALMACENA LA SECUENCIA DE NUMEROS EN UN ARREGLO GLOBAL
}
*/
 // VERFICAR GANE
/*   verificarGane() { // falta condicionales
    this.verificarGaneHorizontal();
    this.verificarGaneVertical();
    this.verificarGaneDiagonalArriba();
    this.verificarGaneDiagonalAbajo();

  }
 */
 /* // VERIFICA EL GANE EN HORIZONTAL
  verificarGaneHorizontal() {
    //console.log(this.matrix)
    for (let i = 0; i < this.game.size; i++) { // RECORRE COLUMNAS
      for (let e = 0; e < this.game.size; e++) { // RECORRE FILAS
        if ( (this.matrix[i][e] == 1) && (this.matrix[i][e+1] == 1) ) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
          this.fichasJ1++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
          this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          e++; // VERIFICA SI LA SIGUIENTE FICHA ES DEL JUGADOR 1
          if (this.fichasJ1 >= this.game.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 1 ha ganado");
            this.fichasJ1 = 0;
          }
        }
        if ( (this.matrix[i][e] == 2) && (this.matrix[i][e+1] == 2) ) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
          this.fichasJ2++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 2
          this.matrix[i][e] = 4; // CAMBIA DE 2 A 4 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          e++;// VERIFICA SI LA SIGUIENTE FICHA ES DEL JUGADOR 2
          if (this.fichasJ2 >= this.game.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 2 ha ganado");
            this.fichasJ1 = 0;
          }
        }
      }
    }
  }

  // VERIFICA EL GANE EN VERTICAL
  verificarGaneVertical(){
    for (let i = 0; i < this.game.size; i++) { // RECORRE COLUMNAS
      for (let e = 0; e < this.game.size; e++) { // RECORRE FILAS
        if ( (this.matrix[i][e] == 1) && (this.matrix[i-1][e] == 1) ) { // VERIFICA GANE JUGADOR 1 SOLO PARA 2 FICHAS JUNTAS
          this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          i--; // VERIFICA SI LA ANTERIOR FICHA ES DEL JUGADOR 1
          this.fichasJ1++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
          if (this.fichasJ1+1 >= this.game.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 2 ha ganado");
            this.fichasJ1 = 0;
          }
        }

        if ( (this.matrix[i][e] == 2) && (this.matrix[i-1][e] == 2) ) { // VERIFICA GANE JUGADOR 2 SOLO PARA 2 FICHAS JUNTAS
          this.matrix[i][e] = 4; // CAMBIA DE 2 A 4 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          i--; // VERIFICA SI LA ANTERIOR FICHA ES DEL JUGADOR 1
          this.fichasJ2++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 2
          if (this.fichasJ2 >= this.game.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 2 ha ganado");
            this.fichasJ1 = 0;
          }
        }
      }
    }
  }

  // VERIFICA EL GANE EN DIAGONAL, DE ABAJO A ARRIBA
  verificarGaneDiagonalArriba(){
    for (let i = 0; i < this.game.size; i++) { // RECORRE COLUMNAS
      for (let e = 0; e < this.game.size; e++){ // RECORRE FILAS
        if ( (this.matrix[i][e] == 1) && (this.matrix[i-1][e+1] == 1) ) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
          this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          this.fichasJ1++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
          if (this.fichasJ1 >= this.game.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 1 ha ganado");
            this.fichasJ1 = 0;
          }
        }

        if ( (this.matrix[i][e] == 2) && (this.matrix[i-1][e+1] == 2) ) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
          this.matrix[i][e] = 4; // CAMBIA DE 2 A 4 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          this.fichasJ2++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 2
          if (this.fichasJ2 >= this.game.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 2 ha ganado");
            this.fichasJ1 = 0;
          }
        }
      }
    }
  }

  // VERIFICA EL GANE EN DIAGONAL, DE ARRIBA A ABAJO
  verificarGaneDiagonalAbajo(){
    for (let i = 0; i < this.game.size; i++) { // RECORRE COLUMNAS
      for (let e = 0; e < this.game.size; e++){ // RECORRE FILAS
        if ( (this.matrix[i][e] == 1) && (this.matrix[i-1][e-1] == 1) ) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
          this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          this.fichasJ1++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
          if (this.fichasJ1 >= this.game.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 1 ha ganado");
            this.fichasJ1 = 0;
          }
        }

        if ( (this.matrix[i][e] == 2) && (this.matrix[i-1][e-1] == 2) ) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
          this.matrix[i][e] = 4; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          this.fichasJ2++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
          if (this.fichasJ2 >= this.game.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 2 ha ganado");
            this.fichasJ1 = 0;
          }
        }
      }
    }
  } */


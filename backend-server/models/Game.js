// clase
module.exports = class Game {
    constructor(size, toWin) {
        this.matrix = [];
        this.size = size;
        this.toWin = toWin;
        this.fichasJ1 = 1;
        this.fichasJ2 = 1;
        this.turno = 1;
        this.jugada = true; // verifica si la jugada es posible
        this.win = false;
        this.coordX = 0;
        this.coordY = 0;
        this.userData = '';
        // CONFIG
        this.colorJ1 = '';
        this.colorJ2 = '';
        this.gameMode = 0;
    }

    setConfig(colorJ1, colorJ2, gameMode) {
            this.colorJ1 = colorJ1;
            this.colorJ2 = colorJ2;
            this.gameMode = gameMode;
        }
        /* setUserData(userName) {
            this.userData = userName;
        }
        getUserData() {
            return this.userData;
        } */
    createBoard() { // se puede usar a lo largo d toda la clase la var matrix
        this.matrix = [];
        for (var i = 0; i < this.size; i++) {
            this.matrix[i] = new Array(this.size);
            for (var j = 0; j < this.size; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }
    // 1 VS 1
    tryPlayv1(x, y) {
        this.coordX = x;
        this.coordY = y;
        // console.log('x: ', x, 'y: ', y);
        if (this.turno == 1) { // FICHA JUGADOR 1
            if ((y + 1 === this.size) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J2
                this.matrix[y][x] = 1; // FICHA JUGADOR 2
                this.turno = 2; // CAMBIO DE TURNO
                this.jugada = true;
                this.verificarGaneHorizontalJ1();
            } else if (this.matrix[y + 1][x] !== 0) { // JUGAR SOBRE UNA FICHA
                this.matrix[y][x] = 1; // FICHA JUGADOR 2
                this.turno = 2; // CAMBIO DE TURNO
                this.jugada = true;
                this.verificarGaneHorizontalJ1();
                this.verificarGaneVerticalJ1();
                this.verificarGaneDiagonalArribaJ1();
                this.verificarGaneDiagonalAbajoJ1();
            } else {
                this.turno = 1;
                this.jugada = false;
            }
        } else if (this.turno === 2) { // JUGADOR 2

            if ((y + 1 === this.size) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J2
                this.matrix[y][x] = 2; // FICHA JUGADOR 2
                this.turno = 1; // CAMBIO DE TURNO
                this.jugada = true;
                this.verificarGaneHorizontalJ2();
            } else if (this.matrix[y + 1][x] !== 0) { // JUGAR SOBRE UNA FICHA
                this.matrix[y][x] = 2; // FICHA JUGADOR 2
                this.turno = 1; // CAMBIO DE TURNO
                this.jugada = true;
                this.verificarGaneHorizontalJ2();
                this.verificarGaneVerticalJ2();
                this.verificarGaneDiagonalArribaJ2();
                this.verificarGaneDiagonalAbajoJ2();
            } else {
                this.turno = 2;
                this.jugada = false;
            }
        }
    }
    
    // JUGADOR AUTOMATICO 1 - FACIL
    tryPlayAut1(x, y) {
        console.log("tryPlayAut1");
    
        this.coordX = x;
        this.coordY = y;
        this.random();
        
        if ((y + 1 === this.size) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J2
            this.coordYA++;
            this.matrix[y][x] = 1; // FICHA JUGADOR 2
            this.turno = 2; // CAMBIO DE TURNO
            this.jugada = true;
            this.verificarGaneHorizontalJ1();
            this.verificarGaneVerticalJ1();
            this.verificarGaneDiagonalArribaJ1();
            this.verificarGaneDiagonalAbajoJ1();
            for(var filas = this.size-1; filas >= 0 ;filas--){
                for(var pos = 0; pos<this.size;pos++){
                    if(this.matrix[filas][this.numeros2[pos]] === 0){
                        this.matrix[filas][this.numeros2[pos]] = 2;
                        this.verificarGaneHorizontalJ2();
                        this.verificarGaneVerticalJ2();
                        this.verificarGaneDiagonalArribaJ2();
                        this.verificarGaneDiagonalAbajoJ2();
                        break;
                    }
                }
                break;
            }
        } 
        
        
        else if ( (this.matrix[y + 1][x] !== 0) && (this.matrix[y][x] === 0)){ // JUGAR SOBRE UNA FICHA
            this.matrix[y][x] = 1; // FICHA JUGADOR 2
            this.turno = 2; // CAMBIO DE TURNO
            this.jugada = true;
            this.verificarGaneHorizontalJ1();
            this.verificarGaneVerticalJ1();
            this.verificarGaneDiagonalArribaJ1();
            this.verificarGaneDiagonalAbajoJ1();
            this.verificarVerticalJ1();
            //console.log("f",this.fichasJ1);
            
            if(this.fichasJ1 === this.toWin-1){
                this.matrix[y-1][x] = 2;
                this.fichasJ1=0;
            }

            else {
                for(var filas = this.size-1; filas >= 0 ;filas--){
                for( var pos = 0; pos <= this.size-1; pos++){
                    if(this.matrix[filas][this.numeros2[pos]] === 0){
                        this.matrix[filas][this.numeros2[pos]] = 2;
                        this.verificarGaneHorizontalJ2();
                        this.verificarGaneVerticalJ2();
                        this.verificarGaneDiagonalArribaJ2();
                        this.verificarGaneDiagonalAbajoJ2();
                        return;
                    }
                }}
            }
        } else {
            this.turno = 1;
            this.jugada = false;
        }
    }
    
    // JUGADOR AUTOMATICO 2 - MEDIO
    tryPlay(x, y) {
        this.coordX = x;
        this.coordY = y;
        this.random();
        
        if ((y + 1 === this.size) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J2
            this.coordYA++;
            this.matrix[y][x] = 1; // FICHA JUGADOR 2
            this.turno = 2; // CAMBIO DE TURNO
            this.jugada = true;
            for(var filas = this.size-1; filas >= 0 ;filas--){
                for(var pos = 0; pos<this.size;pos++){
                    if(this.matrix[filas][this.numeros2[pos]] === 0){
                        this.matrix[filas][this.numeros2[pos]] = 2;
                        break;
                    }
                }
                break;
            }
            this.verificarGaneHorizontalJ1();
            this.verificarGaneVerticalJ1();
            this.verificarGaneDiagonalArribaJ1();
            this.verificarGaneDiagonalAbajoJ1();
            
            
        } else if ( (this.matrix[y + 1][x] !== 0) && (this.matrix[y][x] === 0)){ // JUGAR SOBRE UNA FICHA
            this.matrix[y][x] = 1; // FICHA JUGADOR 2
            this.turno = 2; // CAMBIO DE TURNO
            this.jugada = true;
            this.verificarGaneHorizontalJ1();
            this.verificarGaneVerticalJ1();
            this.verificarGaneDiagonalArribaJ1();
            this.verificarGaneDiagonalAbajoJ1();
            this.verificarVerticalJ1();
            //console.log("f",this.fichasJ1);
            //console.log("x",x,"y",y)

            
            if(y != 0){
                if(this.fichasJ1 === this.toWin-1){
                    this.matrix[y-1][x] = 2;
                    this.fichasJ1=0;
                }

                else if( (this.matrix[y-1][x+1] === 0) && (this.matrix[y][x+1] != 0) ){ // "/""
                    this.matrix[y-1][x+1] = 2;
                    //console.log("/");
                    this.verificarGaneHorizontalJ2();
                    this.verificarGaneVerticalJ2();
                    this.verificarGaneDiagonalArribaJ2();
                    this.verificarGaneDiagonalAbajoJ2();
                    return;
                }
                
                else if( (this.matrix[y-1][x-1] === 0) && (this.matrix[y][x-1] != 0) ){ // "\"
                    this.matrix[y-1][x-1] = 2;
                    //console.log("-/");
                    this.verificarGaneHorizontalJ2();
                    this.verificarGaneVerticalJ2();
                    this.verificarGaneDiagonalArribaJ2();
                    this.verificarGaneDiagonalAbajoJ2();
                    return;
                }

                else if( (this.matrix[y][x-1] === 0) && (x-1 < this.size )){ // "anterior"
                    this.matrix[y][x-1] = 2;
                    //console.log("<-");
                    this.verificarGaneHorizontalJ2();
                    this.verificarGaneVerticalJ2();
                    this.verificarGaneDiagonalArribaJ2();
                    this.verificarGaneDiagonalAbajoJ2();
                    return;
                }

                else if( (this.matrix[y][x+1] === 0) && (x+1 < this.size )){ // "siguiente"
                    this.matrix[y][x+1] = 2;
                    //console.log("->");
                    this.verificarGaneHorizontalJ2();
                    this.verificarGaneVerticalJ2();
                    this.verificarGaneDiagonalArribaJ2();
                    this.verificarGaneDiagonalAbajoJ2();
                    return;
                }

                else if( this.matrix[y-1][x] === 0 ){ // "sobre"
                    this.matrix[y-1][x] = 2;
                    //console.log("|");
                    this.verificarGaneHorizontalJ2();
                    this.verificarGaneVerticalJ2();
                    this.verificarGaneDiagonalArribaJ2();
                    this.verificarGaneDiagonalAbajoJ2();
                    return;
                }
            }

            else {
                for(var filas = this.size-1; filas >= 0 ;filas--){
                    for( var pos = 0; pos <= this.size-1; pos++){
                        if(this.matrix[filas][this.numeros2[pos]] === 0){
                            this.matrix[filas][this.numeros2[pos]] = 2;
                            //console.log("demas",filas,pos);
                            this.verificarGaneHorizontalJ2();
                            this.verificarGaneVerticalJ2();
                            this.verificarGaneDiagonalArribaJ2();
                            this.verificarGaneDiagonalAbajoJ2();
                            return;
                        }
                    }
                }
            }

        } else {
            this.turno = 1;
            this.jugada = false;
        }
    }

     
    // JUGADOR AUTOMATICO 3 - DIFICL
    tryPlayAut3(x, y) {
        this.coordX = x;
        this.coordY = y;
        this.random();
        
        if ((y + 1 === this.size) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J2
            this.coordYA++;
            this.matrix[y][x] = 1; // FICHA JUGADOR 2
            this.turno = 2; // CAMBIO DE TURNO
            this.jugada = true;
            for(var filas = this.size-1; filas >= 0 ;filas--){
                for(var pos = 0; pos<this.size;pos++){
                    if(this.matrix[filas][this.numeros2[pos]] === 0){
                        this.matrix[filas][this.numeros2[pos]] = 2;
                        break;
                    }
                }
                break;
            }
            
            
        } else if ( (this.matrix[y + 1][x] !== 0) && (this.matrix[y][x] === 0)){ // JUGAR SOBRE UNA FICHA
            this.matrix[y][x] = 1; // FICHA JUGADOR 2
            this.turno = 2; // CAMBIO DE TURNO
            this.jugada = true;
            
            this.verificarGaneHorizontalJ1();
            this.verificarGaneVerticalJ1();
            this.verificarGaneDiagonalArribaJ1();
            this.verificarGaneDiagonalAbajoJ1();


            this.verificarHorizontalJ1();
            if(this.fichasJ1 === this.toWin){
                //console.log("f",this.fichasJ1);
                for(var filas = this.size-1; filas >= 0 ;filas--){
                    if(this.matrix[filas][x+1] === 0){
                        this.matrix[filas][x+1] = 2;
                        return;
                    }
                    else if(this.matrix[filas][x-1] === 0){
                        this.matrix[filas][x-1] = 2;
                        return;
                    }
                }
            }

            this.verificarVerticalJ1();
            if (this.fichasJ1 === this.toWin-1){
                //console.log("VM",this.matrix[x][y-1]);
                //console.log("S",x,y-1);
                //if(this.matrix[x][y-1] === 0){
                    //console.log("v",y-1,x);
                    this.matrix[y-1][x] = 2;
                    this.fichasJ1=0;
                    //return;
                //}
            }
            
            
            this.verificarDiagonalArribaJ1();
            if( (this.fichasJ1 === this.toWin-1) && (this.matrix[y-1][x+1] === 0) ){
                console.log(x,y);
                if(this.matrix[y][x+1] != 0){
                    this.matrix[y-1][x+1] = 2;
                }
                else{
                    return;
                }
                //console.log("DAR");
            }
            
            this.verificarDiagonalAbajoJ1();
            if( this.fichasJ1 === this.toWin-1 ){
                console.log(y,x-1);
                if(this.matrix[y][x-1] != 0){
                    this.matrix[y-1][x-1] = 2;
                }
                //else if()
                else{
                    return;
                }
                //console.log("DAB");
            }


            else{
                for(var filas = this.size-1; filas >= 0 ;filas--){
                    for( var pos = 0; pos <= this.size-1; pos++){
                        if(this.matrix[filas][this.numeros2[pos]] === 0){
                            this.matrix[filas][this.numeros2[pos]] = 2;
                            //console.log("demas",filas,pos);
                            return;
                        }
                    }
                }
            }

        } else {
            this.turno = 1;
            this.jugada = false;
        }
    }
    // JUGADOR AUTOMATICO 3 - DIFICL
    

    verificarHorizontalJ1(){
        for (var x = 0; x <= this.size-1;  x++) {
            for (var y = 0; y <= this.size-1;  y++) {
                if(this.matrix[x][y] === 1){
                    for(var f= 0; f <= this.size-1; f++ ){
                        if(this.fichasJ1 === this.toWin){
                            return(this.fichasJ1);
                        }
                        if(this.matrix[x][f] === 1){
                            this.fichasJ1++;
                        }
                        else{
                            this.fichasJ1 = 0;
                        }
                    }
                }
                else{
                    this.fichasJ1=0;
                }
            }  
        }
    }
    // VERIFICA FICHAS EN VERTICAL JUGADOR 1
    verificarVerticalJ1(){
        for (var x = 0; x <= this.size-1;  x++) {
            for (var y = 0; y <= this.size-1;  y++) {
                if(this.matrix[x][y] === 1){
                    for(var f= 0; f <= this.size-1; f++ ){
                        if(this.matrix[f][y] === 1){
                            this.fichasJ1++;
                            if(this.fichasJ1 === this.toWin-1){
                                console.log("F",this.fichasJ1);
                                return(this.fichasJ1);
                            }
                        }
                        else{
                            this.fichasJ1 = 0;
                        }
                    }  
                }
                else{
                    this.fichasJ1 = 0;
                }
            }
        }
    }
    
// VERIFICA FICHAS DIAGONAL, DE ARRIBA A ABAJO JUGADOR 1 \
    verificarDiagonalArribaJ1() {
        for (var x = 0; x <= this.size-1; x++) {
            for (var y = 0; y<= this.size-1 ;y++) {
                if(this.matrix[x][y] === 1){
                    var f = x;
                    this.fichasJ1=0;
                    for( var c = y; c < this.size; c++){
                        if(this.matrix[f][c] === 1){
                            this.fichasJ1++;
                            //console.log("F",this.fichasJ1);
                            if(this.fichasJ1 === this.toWin-1){
                                //console.log("F",this.fichasJ1);
                                return(this.fichasJ1);
                            }
                            f--;
                            if (f === -1) {
                                break;
                            }
                        } else { 
                            this.fichasJ1=0;
                            break;}
                        /* if(this.matrix[f][c] != 1){
                            this.fichasJ1DR=0;
                            break;
                        } */
                    }
                    //break;
                }
                if(this.fichasJ1 === this.toWin){
                    break;
                }
                
            }
            if(this.fichasJ1 === this.toWin){
                break;
            }
        }
    }

    // VERIFICA FICHAS DIAGONAL, DE ABAJO A ARRIBA JUGADOR 1 \
    verificarDiagonalAbajoJ1() {
        for (var x = 0; x <= this.size-1; x++) {
            for (var y = 0; y<= this.size-1 ;y++) {
                if(this.matrix[x][y] === 1){
                    var f = x;
                    this.fichasJ1=0;
                    for( var c = y; c >= 0; c--){
                        if(this.matrix[f][c] === 1){
                            this.fichasJ1++;
                            if(this.fichasJ1 === this.toWin-1){
                                //console.log("F",this.fichasJ1);
                                return(this.fichasJ1);
                            }
                            f--;
                            if( (f === -1) ){
                                break;
                            }
                        } else { 
                            this.fichasJ1=0;
                            break;
                        }
                    }
                }
                if(this.fichasJ1 === this.toWin){
                    break;
                }
                
            }
            if(this.fichasJ1 === this.toWin){
                break;
            }
        }
    }

    verificarHorizontalJ1(){
        for (var x = 0; x <= this.size-1;  x++) {
            for (var y = 0; y <= this.size-1;  y++) {
                if(this.matrix[x][y] === 1){
                    for(var f= 0; f <= this.size-1; f++ ){
                        if(this.fichasJ1 === this.toWin){
                            return(this.fichasJ1);
                        }
                        if(this.matrix[x][f] === 1){
                            this.fichasJ1++;
                        }
                        else{
                            this.fichasJ1 = 0;
                        }
                    }
                }
                else{
                    this.fichasJ1=0;
                }
            }  
        }
    }
    // VERIFICA FICHAS EN VERTICAL JUGADOR 1
    verificarVerticalJ1(){
        for (var x = 0; x <= this.size-1;  x++) {
            for (var y = 0; y <= this.size-1;  y++) {
                if(this.matrix[x][y] === 1){
                    for(var f= 0; f <= this.size-1; f++ ){
                        if(this.matrix[f][y] === 1){
                            this.fichasJ1++;
                            if(this.fichasJ1 === this.toWin-1){
                                //console.log("F",this.fichasJ1);
                                return(this.fichasJ1);
                            }
                        }
                        else{
                            this.fichasJ1 = 0;
                        }
                    }  
                }
                else{
                    this.fichasJ1 = 0;
                }
            }
        }
    }
    
// VERIFICA FICHAS DIAGONAL, DE ARRIBA A ABAJO JUGADOR 1 \
    verificarDiagonalArribaJ1() {
        for (var x = 0; x <= this.size-1; x++) {
            for (var y = 0; y<= this.size-1 ;y++) {
                if(this.matrix[x][y] === 1){
                    var f = x;
                    this.fichasJ1=0;
                    for( var c = y; c < this.size; c++){
                        if(this.matrix[f][c] === 1){
                            this.fichasJ1++;
                            //console.log("F",this.fichasJ1);
                            if(this.fichasJ1 === this.toWin-1){
                                //console.log("F",this.fichasJ1);
                                return(this.fichasJ1);
                            }
                            f--;
                            if (f === -1) {
                                break;
                            }
                        } else { 
                            this.fichasJ1=0;
                            break;}
                        /* if(this.matrix[f][c] != 1){
                            this.fichasJ1DR=0;
                            break;
                        } */
                    }
                    //break;
                }
                if(this.fichasJ1 === this.toWin){
                    break;
                }
                
            }
            if(this.fichasJ1 === this.toWin){
                break;
            }
        }
    }

    // VERIFICA FICHAS DIAGONAL, DE ABAJO A ARRIBA JUGADOR 1 \
    verificarDiagonalAbajoJ1() {
        for (var x = 0; x <= this.size-1; x++) {
            for (var y = 0; y<= this.size-1 ;y++) {
                if(this.matrix[x][y] === 1){
                    var f = x;
                    this.fichasJ1=0;
                    for( var c = y; c >= 0; c--){
                        if(this.matrix[f][c] === 1){
                            this.fichasJ1++;
                            if(this.fichasJ1 === this.toWin-1){
                                console.log("F",this.fichasJ1);
                                return(this.fichasJ1);
                            }
                            f--;
                            if( (f === -1) ){
                                break;
                            }
                        } else { 
                            this.fichasJ1=0;
                            break;
                        }
                    }
                }
                if(this.fichasJ1 === this.toWin){
                    break;
                }
                
            }
            if(this.fichasJ1 === this.toWin){
                break;
            }
        }
    }

    random() {
        var numeros = []; // ARREGLO PARA ALMACENAR NUMEROS
        while (numeros.length < this.size ) { //
          let numeroAleatorio = Math.floor ( Math.random()*(this.size)); //GENERA UN NUMERO AL AZAR, RANGO ENTRE 0 Y EL TAMAÑO DE LA FILA
          let existe = false; //CONDICION PARA NO REPETIR NUMEROS
          for (var i=0;i<numeros.length;i++) { // RECORRE EL ARRELGO "NUMEROS"
            if (numeros [i] == numeroAleatorio) { // CONDICION QUE VERIFICA SI EL NUMERO GENERADO ES IGUAL AL NUMERO ALMACENADO
              existe = true; // CONDICION PARA  NO REPETIR NUMEROS 
            break;
          }
        }
        if (!existe) { // VERIFICA SI EL NUMERO NO EXISTE
          numeros[numeros.length] = numeroAleatorio; // AGREGA EL NUMERO AL ARREGLO
        }
      }
      this.numeros2 = numeros; //ALMACENA LA SECUENCIA DE NUMEROS EN UN ARREGLO GLOBAL
    }

    // VERIFICA EL GANE EN HORIZONTAL JUGADOR 1
    verificarGaneHorizontalJ1(){
        for (var x = 0; x <= this.size-1;  x++) {
            for (var y = 0; y <= this.size-1;  y++) {
                if(this.matrix[x][y] === 1){
                    for(var f= 0; f <= this.size-1; f++ ){
                        if(this.matrix[x][f] === 1){
                            this.fichasJ1++;
                            if(this.fichasJ1 >= this.toWin){
                                this.fichasJ1 = 0;
                                this.fichasJ2 = 0;
                                this.turno = 1; // se cambia porque en la llamada, el turno se cambia antes de verificar
                                this.win = true;
                            }
                        }
                        else{
                            this.fichasJ1 = 0;
                        }
                    } 
                }
                else{
                    this.fichasJ1=0;
                }
            } 
            if(this.fichasJ1 >= this.toWin){
                this.fichasJ1 = 0;
                this.fichasJ2 = 0;
                this.turno = 1; // se cambia porque en la llamada, el turno se cambia antes de verificar
                this.win = true;
            } 
        }
    }

    // VERIFICA EL GANE EN HORIZONTAL JUGADOR 2
    verificarGaneHorizontalJ2(){
        for (var x = 0; x <= this.size-1;  x++) {
            for (var y = 0; y <= this.size-1;  y++) {
                if(this.matrix[x][y] === 2){
                    for(var f= 0; f <= this.size-1; f++ ){
                        if(this.matrix[x][f] === 2){
                            this.fichasJ2++;
                            if(this.fichasJ2 >= this.toWin){
                                this.fichasJ1 = 0;
                                this.fichasJ2 = 0;
                                this.turno = 2; // se cambia porque en la llamada, el turno se cambia antes de verificar
                                this.win = true;
                            }
                        }
                        else{
                            this.fichasJ2 = 0;
                        }
                    }  
                }
                else{
                    this.fichasJ2 = 0;
                }
            }
            if(this.fichasJ2 >= this.toWin){
                this.fichasJ1 = 0;
                this.fichasJ2 = 0;
                this.turno = 2; // se cambia porque en la llamada, el turno se cambia antes de verificar
                this.win = true;
            }
        }
    }

    // VERIFICA EL GANE EN VERTICAL JUGADOR 1
    verificarGaneVerticalJ1(){
        for (var x = 0; x <= this.size-1;  x++) {
            for (var y = 0; y <= this.size-1;  y++) {
                if(this.matrix[x][y] === 1){
                    for(var f= 0; f <= this.size-1; f++ ){
                        if(this.matrix[f][y] === 1){
                            this.fichasJ1++;
                            if(this.fichasJ1 >= this.toWin){
                                this.fichasJ1 = 0;
                                this.fichasJ2 = 0;
                                this.turno = 1; // se cambia porque en la llamada, el turno se cambia antes de verificar
                                this.win = true;
                            }
                        }
                        else{
                            this.fichasJ1 = 0;
                        }
                    }  
                }
                else{
                    this.fichasJ1 = 0;
                }
            }
        }
    }

    // VERIFICA EL GANE EN VERTICAL JUGADOR 2
    verificarGaneVerticalJ2(){
        for (var x = 0; x <= this.size-1;  x++) {
            for (var y = 0; y <= this.size-1;  y++) {
                if(this.matrix[x][y] === 2){
                    for(var f= 0; f <= this.size-1; f++ ){
                        if(this.matrix[f][y] === 2){
                            this.fichasJ2++;
                            if(this.fichasJ2 === this.toWin){
                                this.fichasJ1 = 0;
                                this.fichasJ2 = 0;
                                this.turno = 2; // se cambia porque en la llamada, el turno se cambia antes de verificar
                                this.win = true;
                            }
                        }
                        else{
                            this.fichasJ2 = 0;
                        }
                    }  
                }
                else{
                    this.fichasJ2 = 0;
                }
            }
        }
    }

    // VERIFICA EL GANE EN DIAGONAL, DE ARRIBA A ARRIBA JUGADOR 1 /
    verificarGaneDiagonalArribaJ1() {
        for (var x = 0; x <= this.size-1; x++) {
            for (var y = 0; y<= this.size-1 ;y++) {
                if(this.matrix[x][y] === 1){
                    var f = x;
                    this.fichasJ1=0;
                    for( var c = y; c < this.size; c++){
                        if(this.matrix[f][c] === 1){
                            this.fichasJ1++;
                            if(this.fichasJ1 === this.toWin){
                                this.fichasJ1 = 0;
                                this.fichasJ2 = 0;
                                this.turno = 1; // se cambia porque en la llamada, el turno se cambia antes de verificar
                                this.win = true;
                                break;
                            }
                            f--;
                            if (f === -1) {
                                break;
                            }
                        } else { 
                            this.fichasJ1=0;
                            break;}
                        /* if(this.matrix[f][c] != 1){
                            this.fichasJ1DR=0;
                            break;
                        } */
                    }
                    //break;
                }
                if(this.fichasJ1 === this.toWin){
                    break;
                }
                
            }
            if(this.fichasJ1 === this.toWin){
                break;
            }
        }
    }

    // VERIFICA EL GANE EN DIAGONAL, DE ARRIBA A ARRIBA JUGADOR 2 /
    verificarGaneDiagonalArribaJ2() {
        for (var x = this.size-1; x >= 0 ;x--) {
            for (var y = 0; y<= this.size-1 ;y++) {
                if(this.matrix[x][y] === 2){
                    var f = x;
                    this.fichasJ2 = 0;
                    for( var c = y; c < this.size; c++){
                        if(this.matrix[f][c] === 2){
                            this.fichasJ2++;
                            if(this.fichasJ2 === this.toWin){
                                this.fichasJ1 = 0;
                                this.fichasJ2 = 0;
                                this.turno = 2; // se cambia porque en la llamada, el turno se cambia antes de verificar
                                this.win = true;
                                break;
                            }
                            f--;
                            if (f === -1) {
                                break;
                            }
                        } else { 
                            this.fichasJ2=0;
                            break;
                        }
                    }
                }
                if(this.fichasJ2 === this.toWin){
                    break;
                }
                
            }
            if(this.fichasJ2 === this.toWin){
                break;
            }
        }
    }
    
    // VERIFICA EL GANE EN DIAGONAL, DE ABAJO A ARRIBA JUGADOR 1 \
    verificarGaneDiagonalAbajoJ1() {
        for (var x = 0; x <= this.size-1; x++) {
            for (var y = 0; y<= this.size-1 ;y++) {
                if(this.matrix[x][y] === 1){
                    var f = x;
                    this.fichasJ1=0;
                    for( var c = y; c >= 0; c--){
                        if(this.matrix[f][c] === 1){
                            this.fichasJ1++;
                            if(this.fichasJ1 === this.toWin){
                                this.fichasJ1 = 0;
                                this.fichasJ2 = 0;
                                this.turno = 1; // se cambia porque en la llamada, el turno se cambia antes de verificar
                                this.win = true;
                                break;
                            }
                            f--;
                            if( (f === -1) ){
                                break;
                            }
                        } else { 
                            this.fichasJ1=0;
                            break;
                        }
                    }
                }
                if(this.fichasJ1 === this.toWin){
                    break;
                }
                
            }
            if(this.fichasJ1 === this.toWin){
                break;
            }
        }
    }

    // VERIFICA EL GANE EN DIAGONAL, DE ABAJO A ARRIBA JUGADOR 2 \
    verificarGaneDiagonalAbajoJ2() {
        for (var x = 0; x <= this.size-1; x++) {
            for (var y = 0; y<= this.size-1 ;y++) {
                if(this.matrix[x][y] === 2){
                    var f = x;
                    this.fichasJ2 = 0;
                    for( var c = y; c >= 0; c--){
                        if(this.matrix[f][c] === 2){
                            this.fichasJ2++;
                            if(this.fichasJ2 === this.toWin){
                                this.fichasJ1 = 0;
                                this.fichasJ2 = 0;
                                this.turno = 2; // se cambia porque en la llamada, el turno se cambia antes de verificar
                                this.win = true;
                                break;
                            }
                            f--;
                            if (f === -1) {
                                break;
                            }
                        } else { 
                            this.fichasJ2=0;
                            break;
                        }
                    }
                }
                if(this.fichasJ2 === this.toWin){
                    break;
                }
            }
            if(this.fichasJ2 === this.toWin){
                break;
            }
        }
    }
};


/* */

/* for (let x = 0; x <= this.game.size; x++) {
        for (let y = 0; y <= this.game.size; y++) {
          if ( (i >= x * 90 && i <= x * 90 + 90) && (j >= y * 90 && j <= y * 90 + 90) ) {
            if (this.matrix[y][x] === 0) { // VERIFICA QUE LA CASILLA NO TIENE FICHA
              if (this.turno === 1) {// FICHA JUGADOR 1
                if ((y + 1  === this.game.size) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J1
                  this.matrix[y][x] = 1; // COLOCA FICHA 1
                  ctx.fillStyle = 'rgb(160, 140, 160)'; // DEFINE EL COLOR DE LA FIGUTA
                  ctx.fillRect(x * 90, y * 90, 90, 90);
                  this.turno = 2; // CAMBIO DE TURNO
                  this.verificarGane();
                } else if (this.matrix[y + 1][x] !== 0) { // JUGAR SOBRE UNA FICHA
                  this.matrix[y][x] = 1; // FICHA JUGADOR 1
                  ctx.fillStyle = 'rgb(160, 140, 160)';
                  ctx.fillRect(x * 90, y * 90, 90, 90);
                  this.turno = 2; // CAMBIO DE TURNO
                  this.verificarGane();
                } else {
                  alert( 'Jugada invalida, debe de tener una ficha abajo');
                }
              } else if (this.turno === 2) { // JUGADOR 2
                if ((y + 1 === this.game.size) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J2
                  this.matrix[y][x] = 2; // FICHA JUGADOR 2
                  ctx.fillStyle = 'rgb(190, 100, 80)'; // DEFINE EL COLOR DE LA FIGUTA
                  ctx.fillRect(x * 90, y * 90, 90, 90);
                  this.turno = 1; // CAMBIO DE TURNO
                  this.verificarGane();
                } else if (this.matrix[y + 1][x] !== 0) { // JUGAR SOBRE UNA FICHA
                  this.matrix[y][x] = 2; // FICHA JUGADOR 2
                  ctx.fillStyle = 'rgb(190, 100, 80)';
                  ctx.fillRect(x * 90, y * 90, 90, 90);
                  this.turno = 1; // CAMBIO DE TURNO
                  this.verificarGane();
                } else {
                  alert('Jugada invalida, debe de tener una ficha abajo');
                }
              }
            } else {
              alert('Jugada invalida');
            }
          }
        }
      }*/
// --------------INICIO DE ARCHIVO----------------------------

/* punto de entrada javascript que inicializará server
 requires: importación de librerías que se ocupan para que funcione algo*/

/*
var express = require('express');
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());
app.use(bodyParser.json());


app.post('/ingame', function(req, res){
	console.log("");
	console.log("------------------------------------");
	console.log(req.body);
	var coordX = req.body.x;
	var coordY = req.body.y;
	var jugador = req.body.jugador;
	instanciaJuego.realizarJugada(coordX, coordY, jugador);

	//automaticPlayer.solicitarJugada(instanciaJuego._tablero, jugador);
	
	var jugSig = 2;
	if(jugador == 2)
		jugSig = 1;

	console.log("Jugador siguiente: " + jugSig);
	console.log("Jugada válida: "+ instanciaJuego._jugadaValida);
	if(instanciaJuego._jugadaValida == true){
		instanciaJuego._jugadaValida = false;
		res.json({jugadaValida:true, mensaje:"Jugada exitosa", tablero_lleno:instanciaJuego.tablaLlena(), tablero:instanciaJuego._tablero, jugadorSiguiente:jugSig});
	}else{
		res.json({jugadaValida:false, mensaje:"Jugada no válida", tablero_lleno:false, tablero:instanciaJuego._tablero, jugadorSiguiente:jugSig});
	}
	
});


*/
// inicializar variables:


// HABILITANDO CORS CON EXPRESS
/* app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
}); */


// parse application/x-www-form-urlencoded
// configuración de la librería para hacer pruebas en postman con posts
// todo lo que lleva el body lo crea objeto javascripts
var express = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");
var app = express(); // definiendo el server

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// importar rutas:
var juegoRoutes = require('./routes/game');
var appRoutes = require('./routes/app');
// var usuariosRoutes = require('./routes/usuario');



// rutas
// esto es un middleware
// cada vez que se haga una petición a esa ruta haga appRoutes

app.use('/game', juegoRoutes);
app.use('/', appRoutes);

// escuchar peticiones:
app.listen(3000, function() {
    console.log('Express server port 3000: \x1b[32m%s\x1b[0m', 'ONLINE');
});
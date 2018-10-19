// notas: 
// .json devuelve res en un json
// AQUÍ ESTÁN LOS ENDPOINTS DEL JUEGO
// SE ESTÁ USANDO ESTE FRAMEWORK, ESTO SON PUROS IMPORTS
var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// usando modelo de juego
// instancia del modelo 
var Game = require('../models/Game');
var UserData = require('../models/UserData');
// var GameConfig = require('/models/GameConfig'); //tipodeJuego, colores, dimensiones, c/gane
var game;
var userdata;
// var gameConfig;
// endpoints
// BÁSICAMENTE DICE CUANDO SE HAGA UN .get A ESTA RUTA HAGA ESTO:
app.get('/', function(req, res) {

    // .json devuelve res en un json
    res.status(200).json({
        ok: true,
        mensaje: 'OK GET GAME!!'
    });
});
// NOSOTROS ESTAMOS TRABAJANDO ESTA PARA CREAAR LA MATRIZ 
// AQUÍ ES DONDE SE VA SETEAR LA MATRIZ LOGICA Y SE ENVIARÁ AL FRONT END PARA QUE SE PINTE
// SE RECIBE COMO UN JSON, SE PARSEAN LOS DATOS A TIPO MODELO, LUEGO SE ENVÍA EN FORMATO JSON DE NUEVO AL 
// FRONT END
app.post('/setGame', function(req, res) {

    // console.log(req.body.size);
    game = new Game(req.body.size, req.body.toWin);
    game.createBoard();
    game.setConfig(req.body.colorJ1, req.body.colorJ2, req.body.gameMode);
    // setteo la configuración del tablero que viene desde el front req.body.n
    //game.matrix = req.body.matrix; // se asigna lo que viene desde el front, probar desde angular
    res.status(200).json({
        ok: true,
        mensaje: 'OK SET GAME!!',
        matrix: game.matrix,
        colorJ1: game.colorJ1,
        colorJ2: game.colorJ2,
        gameMode: game.gameMode,
        size: game.size
            // colores: gameConfig.colores
    });
});
app.get('/getGame', function(req, res) {

    // console.log(req.body.size);
    // setteo la configuración del tablero que viene desde el front req.body.n
    //game.matrix = req.body.matrix; // se asigna lo que viene desde el front, probar desde angular
    res.status(200).json({
        ok: true,
        mensaje: 'OK GET THE GAME!!',
        matrix: game.matrix,
        colorJ1: game.colorJ1,
        colorJ2: game.colorJ2,
        gameMode: game.gameMode,
        size: game.size
            // colores: gameConfig.colores
    });
});
app.post('/makePlay', function(req, res) {
    game.tryPlay(req.body.coordX, req.body.coordY);

    res.status(200).json({
        ok: true,
        mensaje: 'OK PLAY GAME!!',
        coordX: game.coordX,
        coordY: game.coordY,
        matrix: game.matrix,
        jugada: game.jugada,
        win: game.win,
        turno: game.turno,
        colorJ1: game.colorJ1,
        colorJ2: game.colorJ2
    });
});
app.post('/setUserData', function(req, res) {

    userdata = new UserData(req.body.userName);
    console.log(userdata.getUserData());
    res.status(200).json({
        ok: true,
        mensaje: 'OK USER DATA SET!!',
        userName: userdata.userName

    });
});
app.get('/getUserData', function(req, res) {
    /* game.coordX = req.body.coordX;
    game.coordY = req.body.coordY; */
    var name = userdata.getUserData();


    // console.log(userdata.getUserData());
    res.status(200).json({

        name: name
    });
});
module.exports = app;
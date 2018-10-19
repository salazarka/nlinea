var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cors = require("cors");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Rutas

// petición get en la pág "home" o en la "raíz"
app.get('/', (req, res, next) => {

    // .json devuelve res en un json
    res.status(200).json({
        ok: true,
        mensaje: 'OK REQUEST!!'
    });
});
module.exports = app;
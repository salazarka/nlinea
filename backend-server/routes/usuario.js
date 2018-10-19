var express = require('express');

var app = express();

// "raíz de usuario" en app.js del ROOT se esta definiendo usuarios de esta manera:
/* var usuariosRoutes = require('./routes/usuario'); 
app.use('/usuario', usuariosRoutes); */

// usando modelo de usuarios
var Usuario = require('../models/usuarios');

// Rutas
// petición get en la pág "usuarios" o en la "raíz"
app.get('/', (req, res, next) => {

    // por mongoose se tiene este método que obtiene un listado de usuarios, utilizando nuestro modelo
    // se utiliza un callbak ("funcion de flecha (=>)" ó function(param){} ) q retorna o un error o usuarios):
    // usuarios es un arreglo
    Usuario.find({}, 'nombre email img role')
        .exec(
            function(err, usuarios) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'ERROR CARGANDO USUARIOS',
                        errors: err
                    });
                }
                // le defino como quiero el json
                // ".json" devuelve res en un json
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            });
    /*  

     res.status(200).json({
         ok: true,
         mensaje: 'GET USERS REQUEST!!'
     }); */
});

// actualizar usuario (put)
// agregarle id a la ruta indica que es necesario obligatoriamente
// pedir el recurso con ese id
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    // se hace referencia al modelo
    // sintaxis de mongoose para bd
    // busca ese id y lo carga en usuario
    // se pueden llamar funciones
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario ' + id + ' no existe',
                errors: err
            });
        }
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save(function(err, usuarioGuardado) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }
            res.status(201).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });
    /* res.status(200).json({
        ok: true,
        id: id
    }); */

});

// crear usuario (post)


app.post('/', (req, res) => {

    var body = req.body; // body-parser implementation
    // se crea objeto
    var usuario = new Usuario({ // haciendo referencia al model USUARIOS se declara una var y se define aquí mismo
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        img: body.img,
        role: body.role
    });
    // se guarda y llama a una función para demostración
    usuario.save(function(err, usuarioGuardado) {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });
    });
    // en los .json se declaran objetos
    // se puede asignar variables locales 
    /* res.status(200).json({
        ok: true,
        body: body // para ver lo que estamos posteando
    }); */

});
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe usuario con ese ID',
                errors: { message: 'No existe usuario con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado // para ver lo que estamos posteando
        });


    })

});
module.exports = app;
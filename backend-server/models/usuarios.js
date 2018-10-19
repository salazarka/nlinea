var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};
var usuarioSchema = new Schema({
    nombre: { type: String, require: [true, 'Required name'] },
    email: { type: String, unique: true, require: [true, 'Required e-mail'] },
    password: { type: String, require: [true, 'Required password'] },
    img: { type: String, require: false },
    role: { type: String, require: true, default: 'USER_ROLE', enum: rolesValidos } // creando regla de roles válidos

});

usuarioSchema.plugin(uniqueValidator, { message: 'El correo debe ser único' });

// utilizando este esquema fuera de este archivo, schema de la tabla en la bd
module.exports = mongoose.model('Usuario', usuarioSchema);
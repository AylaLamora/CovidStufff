const { Schema, model } = require('mongoose');

const encuestaSchema = new Schema({
    
    nombre     : { type: String},
    sexo       : { type: String},
    direccion  : { type: String},
    estadocivil: { type: String},
    salud      : { type: String},
    edad       : { type: String},
    date       : { type: String},
    diabetes   : { type: String},
    hiper      : {type: String},
    asma       : { type: String},
    cardiaco   : { type: String},
    tos        : { type: String},
    cabeza     : { type: String},
    olfato     : { type: String},
    garganta   : { type: String},
    muscular   : { type: String},
    gusto      : { type: String},

})

module.exports = model('encuestas', encuestaSchema);
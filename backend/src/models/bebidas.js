const { Schema, model } = require('mongoose');


const bebidasSchema = new Schema({
    
    nombre: { type: String},
    codigo : { type: String},
    ml : { type: Number},
    parent : { type: String}
})

module.exports = model('bebidas', bebidasSchema);
const { Schema, model } = require('mongoose');

const inventarioSchema = new Schema({
    
    nombreCli: { type: String},
    codBebida: { type: String},
    categoria : { type: String},
    nombreBebida : { type: String},
    presentacion : { type: String},
    invInicial : { type: Number},
    compras : { type: Number},
    ventas : { type: Number},
    invTeorico : {type: Number},
    invFinal : { type: Number},
    diferencia : { type: Number},
    clientes: {
         type: Schema.Types.ObjectId,
          ref: "cliente"}
        
})

module.exports = model('inventario', inventarioSchema);
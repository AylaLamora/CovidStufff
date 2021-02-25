const { Schema, model } = require("mongoose");

const clientesSchema = new Schema({
    nombre: { type: String },
    razonSocial: { type: String },
    rfc: { type: String },
    direccion: { type: String },
    colonia: { type: String },
    estado: { type: String },
    cp: { type: Number },
    correo: { type: String },
    telefono: { type: String },
    inventarios: [{ 
        type: Schema.Types.ObjectId,
         ref: "inventario" }],
    recetas: [{
        type: Schema.Types.ObjectId,
         ref: "recetas"}]
});

module.exports = model("cliente", clientesSchema);

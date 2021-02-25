const { Schema, model } = require('mongoose');


let usuariosSchema = new Schema({
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true
        },
        password: {
            type:String,
            required: true
        },
        changes: {
            type:Number,
            required: true,
            default:2
        },
        permisos:{
            type:Boolean,
            default:false
        },
        secreto:{
            type:String,
            default:'trabajador'
        },
        fecha:{
            type:Number,
            default:1
        },
        deletes:{
            type:Number,
            default:2
        }
});

module.exports = model('usuario', usuariosSchema);
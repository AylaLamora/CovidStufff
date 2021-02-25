const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
let clientes  = require('../models/clientes');
const mongoose = require('mongoose');

// const inventario = require('../models/inventario');

router.post('/', async (req, res) => {

    let client = new clientes ({
        nombre:req.body.nombre,
        razonSocial:req.body.razonSocial,
        rfc:req.body.rfc,
        direccion:req.body.direccion,
        colonia:req.body.colonia,
        estado:req.body.estado,
        cp:req.body.cp,
        correo:req.body.correo,
        telefono:req.body.telefono,
        inventario:req.body.inventario,
        recetas:req.body.recetas
    });

    // client._id = new mongoose.Types.ObjectId(); En caso de emergencia, descomentarlo

   await client.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos del cliente' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    let empresa =  {nombre, razonSocial, rfc, direccion, colonia, estado, estado, cp, correo, telefono} = req.body;

    let ID = req.params.id;
    clientes.findByIdAndUpdate(ID, {$set: empresa}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar la empresa: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    clientes.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el cliente: `+ JSON.stringify(err, undefined, 2));}
    });
});



router.get('/', (req,res) => {
    clientes.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo empresa' + JSON.stringify(err, undefined, 2));}
    });
});

/* 
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        clientes.findById(req.params.id, (err, doc) => {
            if(!err) {res.send(doc);}
                else { console.log(`Error en encontrar el cliente: `+ JSON.stringify(err, undefined, 2));}
        });
}); */

module.exports = router;
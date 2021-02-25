const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
let inventario  = require('../models/inventario');
let cliente  = require('../models/clientes');
// let recetas = require('../models/recetas');


router.post('/:_id', async (req, res) => {

    let Pisto = new inventario ({

        nombreCli:req.body.nombreCli,
        codBebida:req.body.codBebida,
        categoria: req.body.categoria,
        nombreBebida:req.body.nombreBebida,
        presentacion:req.body.presentacion,
        invInicial:req.body.invInicial,
        compras:req.body.compras,
        ventas:req.body.ventas,
        invTeorico:req.body.invTeorico,
        invFinal:req.body.invFinal,
        diferencia:req.body.diferencia,
    });
    
    
    const clienteID = await cliente.findById(req.params); //* Buscamos al cliente al que se le va a agregar el inventario

    Pisto.clientes = clienteID._id; 

    await Pisto.save();

    clienteID.inventarios.push(Pisto._id) //* Aqui guardamos el id del inventario en el campo inventario de la colección del cliente que creó ese inventario
    
    await clienteID.save();

    res.send(Pisto);
});

router.put('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        let Pisto =  ({

            nombreCli:req.body.nombreCli,
            codBebida:req.body.codBebida,
            categoria: req.body.categoria,
            nombreBebida:req.body.nombreBebida,
            presentacion:req.body.presentacion,
            invInicial:req.body.invInicial,
            compras:req.body.compras,
            ventas:req.body.ventas,
            invTeorico:req.body.invTeorico,
            invFinal:req.body.invFinal,
            diferencia:req.body.diferencia,
        });

    let ID = req.params.id;
    inventario.findByIdAndUpdate(ID, {$set: Pisto}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el inventario: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.put('/inventario/:id', (req, res) => {


    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    let NewInventory =  ({
        nombreCli:req.body.nombreCli,
        invInicial:req.body.invInicial,
        compras:req.body.compras,
        ventas:req.body.ventas,
        invTeorico:req.body.invTeorico,
        invFinal:req.body.invFinal,
        diferencia:req.body.diferencia,
    });
    let ID = req.params.id;
    inventario.findByIdAndUpdate(ID, {$set: NewInventory}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el inventario: `+ JSON.stringify(err, undefined, 2));}

    })
})


router.put('/nombre/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        let nombre =  ({nombreCli:req.body.nombreCli});

    let ID = req.params.id;
    inventario.findByIdAndUpdate(ID, {$set: nombre}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el inventario: `+ JSON.stringify(err, undefined, 2));}

    })
})


router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    inventario.findByIdAndRemove(req.params.id, (err, doc) => {

        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el inventario: `+ JSON.stringify(err, undefined, 2));}
    });
});





router.get('/', (req,res) => {
    inventario.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo inventario' + JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;

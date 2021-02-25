const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
let bebidas  = require('../models/bebidas');

router.post('/', async (req, res) => {

    let bebida = new bebidas ({

        nombre:req.body.nombre,
        parent:req.body.parent,
        ml:req.body.ml,
        codigo:req.body.codigo,
    });

    
   await bebida.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos del bebida' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        let bebida =  ({

            nombre:req.body.nombre,
            parent:req.body.parent,
            ml:req.body.ml,
            codigo:req.body.codigo,
        });

    let ID = req.params.id;
    bebidas.findByIdAndUpdate(ID, {$set: bebida}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar la bebida: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    bebidas.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el bebidae: `+ JSON.stringify(err, undefined, 2));}
    });
});


router.get('/', (req,res) => {
    bebidas.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos de bebidas' + JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;

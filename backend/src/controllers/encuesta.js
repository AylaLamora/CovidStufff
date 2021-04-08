const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
let encuesta  = require('../models/encuesta');

router.post('/', async (req, res) => {

    let encuestaModel = new encuesta ({
        nombre:req.body.nombre,     
        sexo:req.body.sexo,       
        direccion:req.body.direccion,  
        estadocivil:req.body.estadocivil,
        salud:req.body.salud,      
        edad:req.body.edad,       
        date:req.body.date,       
        diabetes:req.body.diabetes,   
        hiper:req.body.hiper,      
        asma:req.body.asma,       
        cardiaco:req.body.cardiaco,   
        tos:req.body.tos,        
        cabeza:req.body.cabeza,     
        olfato:req.body.olfato,     
        garganta:req.body.garganta,   
        muscular:req.body.muscular,   
        gusto:req.body.gusto,      
    });

    
   await encuestaModel.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos del encuestaModel' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        let encuestaModel =  ({
            nombre:req.body.nombre,     
            sexo:req.body.sexo,       
            direccion:req.body.direccion,  
            estadocivil:req.body.estadocivil,
            salud:req.body.salud,      
            edad:req.body.edad,       
            date:req.body.date,       
            diabetes:req.body.diabetes,   
            hiper:req.body.hiper,      
            asma:req.body.asma,       
            cardiaco:req.body.cardiaco,   
            tos:req.body.tos,        
            cabeza:req.body.cabeza,     
            olfato:req.body.olfato,     
            garganta:req.body.garganta,   
            muscular:req.body.muscular,   
            gusto:req.body.gusto, 
        });

    let ID = req.params.id;
    encuesta.findByIdAndUpdate(ID, {$set: encuestaModel}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar la encuestaModel: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    encuesta.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el encuestaModele: `+ JSON.stringify(err, undefined, 2));}
    });
});


router.get('/', (req,res) => {
    encuesta.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos de encuesta' + JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;

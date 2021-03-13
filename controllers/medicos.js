const {response} = require('express');
const Medico = require('../models/medico');
const getMedicos = async(req,res= response)=>{
    const medicosDB = await Medico.find()
    .populate('hospital','nombre')
    .populate('usuario','nombre img');
    res.json({
        ok:true,
        medico:medicosDB
     })
}

const CrearMedico = async(req,res= response)=>{
    const uid = req.uid;
    const medico = new Medico({
        usuario:uid,
        ...req.body});

    try {
        const medicoDB = await medico.save(); 

        res.json({
            ok:true,
            medico: medicoDB
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }


   
}
const actualizarMedico = (req,res= response)=>{
    res.json({
        ok:true,
        msg:'put'
     })
}

const borrarMedico = (req,res= response)=>{
    res.json({
        ok:true,
        msg:'delete'
     })
}


module.exports = {
    getMedicos,
    actualizarMedico,
    CrearMedico,
    borrarMedico
}
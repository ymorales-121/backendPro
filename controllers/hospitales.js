const {response} = require('express');
const Hospital = require('../models/hospital');
const getHospitales = async(req,res= response)=>{
    const hospitalDB = await Hospital.find().populate('usuario','nombre img');
    res.json({
        ok:true,
        hospital:hospitalDB
     })
}

const CrearHospital = async(req,res= response)=>{
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body});

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok:true,
            hospital: hospitalDB
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error inesperado'
        })
    }    
}
const actualizarHospital = (req,res= response)=>{
    res.json({
        ok:true,
        msg:'put'
     })
}

const borrarHospital = (req,res= response)=>{
    res.json({
        ok:true,
        msg:'delete'
     })
}


module.exports = {
    getHospitales,
    actualizarHospital,
    CrearHospital,
    borrarHospital
}
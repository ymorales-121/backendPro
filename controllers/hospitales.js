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
const actualizarHospital = async(req,res= response)=>{
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg:'No se encontro el hospital por id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario:uid
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true});

        res.json({
            ok:true,
            hospital: hospitalActualizado
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:true,
            msg:'Comuniquese con el administrador'
         });
    }


   
}

const borrarHospital = async (req,res= response)=>{

    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(404).json({
                ok:false,
                msg:'No se encontro el hospital por id'
            });
        }

        await Hospital.findByIdAndDelete(id);
        res.json({
            ok:true,
            mdg:'Hospital Eliminado'
         })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:true,
            msg:'Comuniquese con el administrador'
         });
    }



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
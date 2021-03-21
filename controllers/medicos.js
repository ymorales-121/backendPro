const { response } = require('express');
const Medico = require('../models/medico');
const getMedicos = async (req, res = response) => {
    const medicosDB = await Medico.find()
        .populate('hospital', 'nombre')
        .populate('usuario', 'nombre img');
    res.json({
        ok: true,
        medico: medicosDB
    })
}

const CrearMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }



}
const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medicosDB = await Medico.findById(id);
        if (!medicosDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro al medico por id'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario:uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
}

const borrarMedico = async (req, res = response) => {

    const id = req.params.id;

    try {

        const medicosDB = await Medico.findById(id);
        if (!medicosDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro al medico por id'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }


}


module.exports = {
    getMedicos,
    actualizarMedico,
    CrearMedico,
    borrarMedico
}
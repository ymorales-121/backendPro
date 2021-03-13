//Ruta: /api/hospitales

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validatJWT } = require('../middlewares/validat-jwt');
const router = Router();
const { getHospitales, actualizarHospital, CrearHospital, borrarHospital } = require('../controllers/hospitales');

router.get('/',validatJWT,getHospitales);
router.post('/',
    [
        validatJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ]
    , CrearHospital);

router.put('/:id', [

    ],
    actualizarHospital);


router.delete('/:id', borrarHospital);

module.exports = router;

//Ruta: /api/hospitales

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validat-jwt');
const router = Router();
const { getHospitales, actualizarHospital, CrearHospital, borrarHospital } = require('../controllers/hospitales');

router.get('/',validarJWT,getHospitales);
router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ]
    , CrearHospital);

router.put('/:id', [
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
    ],
    actualizarHospital);


router.delete('/:id',validarJWT, borrarHospital);

module.exports = router;

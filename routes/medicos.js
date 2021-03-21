//Ruta: /api/Medicos

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validat-jwt');
const router = Router();
const { getMedicos, actualizarMedico, CrearMedico, borrarMedico } = require('../controllers/medicos');

router.get('/',validarJWT,getMedicos);
router.post('/',
    [
        validarJWT,
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('hospital','El hospital id debe ser válido').isMongoId(),
        validarCampos
    ]
    , CrearMedico);

router.put('/:id', [
    validarJWT,
    check('nombre','El Nombre es necesario').not().isEmpty(),
    check('hospital','El hospital id debe ser válido').isMongoId(),
    validarCampos
    ],
    actualizarMedico);


router.delete('/:id', validarJWT,borrarMedico);

module.exports = router;

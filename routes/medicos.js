//Ruta: /api/Medicos

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validatJWT } = require('../middlewares/validat-jwt');
const router = Router();
const { getMedicos, actualizarMedico, CrearMedico, borrarMedico } = require('../controllers/medicos');

router.get('/',validatJWT,getMedicos);
router.post('/',
    [
        validatJWT,
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('hospital','El hospital id debe ser válido').isMongoId(),
        validarCampos
    ]
    , CrearMedico);

router.put('/:id', [

    ],
    actualizarMedico);


router.delete('/:id', borrarMedico);

module.exports = router;

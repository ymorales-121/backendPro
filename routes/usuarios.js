//Ruta: /api/usuarios
const { Router } = require('express');
const {check} = require('express-validator');
const {getUsuarios,crearUsuarios,actualizaUsuario,borrarUsuario} = require('../controllers/usuarios');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validat-jwt');
const router = Router();


router.get('/',validarJWT,getUsuarios);
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
]
,crearUsuarios);

router.put('/:id',validarJWT,
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos
],
actualizaUsuario);


router.delete('/:id',validarJWT,borrarUsuario);

module.exports = router;
//api/todo/:busqueda

const {Router} = require('express');
const {getTodo,getDocumentosColeccion} = require('../controllers/busquedas');
const {validatJWT} = require('../middlewares/validat-jwt');
const router = Router();


router.get('/:busqueda',validatJWT,getTodo);

router.get('/coleccion/:tabla/:busqueda',validatJWT,getDocumentosColeccion);

module.exports = router;
//api/uploads/

const {Router} = require('express');
const expressFileUpload = require('express-fileupload');
const {fileUpload,retornaImasgen} = require('../controllers/uploads');
const {validatJWT} = require('../middlewares/validat-jwt');
const router = Router();


router.use(expressFileUpload());

router.put('/:tipo/:id',validatJWT,fileUpload);
router.get('/:tipo/:foto',retornaImasgen);


module.exports = router;
const {Router, json} = require('express');
const {check} = require('express-validator');


const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { 
    crearCategoria, 
    obtenerCategorias, 
    actualizarCategoria, 
    obtenerCategoria, 
    categoriaDelete } = require('../controller/categorias');
const { existeCategoriaxid } = require('../helpers/db-validators');


const router = Router();


//Obtener todas las categorias - publico 
router.get('/',  obtenerCategorias)

//Obtener una categoria por id - publico 
router.get('/:id',[
    check('id', 'No es un id valido ').isMongoId(),
    check('id').custom(existeCategoriaxid),
    validarCampos

] ,obtenerCategoria);

//crear una categoria  - privado  - cualquier persona con un rol valido
router.post('/',[
    validarJWT,
    check('nombre', ' El nombre es obligatorio').not().isEmpty(),
    validarCampos

], crearCategoria);

//Actualizar registro por id -privado
router.put('/:id', [
    validarJWT,
    check('nombre', ' El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido ').isMongoId(),
    check('id').custom(existeCategoriaxid),
    validarCampos
], actualizarCategoria);




//Borrar por una categoria -Admin 
router.delete('/:id', [
     validarJWT,
     esAdminRole,
     check('id', 'No es un id valido ').isMongoId(),
     check('id').custom(existeCategoriaxid),
    validarCampos
], categoriaDelete
 );

module.exports=router;

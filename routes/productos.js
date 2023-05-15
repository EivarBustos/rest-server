const {Router, json} = require('express');
const {check} = require('express-validator');


const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { existeProductoxid, existeCategoriaxid } = require('../helpers/db-validators');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, productoDelete } = require('../controller/productos');


const router = Router();


//Obtener todas las categorias - publico 
router.get('/',  obtenerProductos)

//Obtener una categoria por id - publico 
router.get('/:id',[
    check('id', 'No es un id valido ').isMongoId(),
    check('id').custom(existeProductoxid),
    validarCampos

] ,obtenerProducto);

//crear una categoria  - privado  - cualquier persona con un rol valido
router.post('/',[
    validarJWT,
    check('nombre', ' El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongp').isMongoId(),
    check('categoria').custom(existeCategoriaxid),
    validarCampos
], crearProducto);

//Actualizar registro por id -privado
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un id de Mongp').isMongoId(),
    // check('id', 'No es un id valido ').isMongoId(),
    check('id').custom(existeProductoxid),
    validarCampos
], actualizarProducto);




//Borrar por una categoria -Admin 
router.delete('/:id', [
     validarJWT,
     esAdminRole,
     check('id', 'No es un id valido ').isMongoId(),
     check('id').custom(existeProductoxid),
    validarCampos
], productoDelete
 );

module.exports=router;

const {Router} = require('express');
const {check} = require('express-validator');


const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivos, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controller/uploads');
const { coleccionesPermitidas } = require('../helpers');


const router = Router();


//crear nuevo recurso 

router.post('/',validarArchivoSubir, cargarArchivos);

router.put('/:coleccion/:id', [
    //preguntar si viene la propiedad file 
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c ,['usuarios', 'productos'])),
    validarCampos

], actualizarImagenCloudinary
// actualizarImagen
);

router.get('/:coleccion/:id', [
    //preguntar si viene la propiedad file 
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c ,['usuarios', 'productos'])),
    validarCampos

], mostrarImagen);



module.exports=router;


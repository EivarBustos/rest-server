const {Router} = require('express');
const { check } = require('express-validator');


// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar_jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');

const{
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRol


}= require('../middlewares/index')

const { esRoleValido, correoExiste, existeUsuarioxid } = require('../helpers/db-validators');

const { usuariosGet, 
        usuarioiosPut, 
        usuarioiosPost, 
        usuarioiosDelete, 
        usuarioiosPatch } = require('../controller/usuarios');



const router = Router();


router.get('/',  usuariosGet)
//put se usa para añadir 
router.put('/:id', [
    check('id', 'No es un id valido ').isMongoId(),
    check('id').custom(existeUsuarioxid),
    check('rol').custom(esRoleValido),
    check('correo', 'El correo no es valido').isEmail(),
    validarCampos

], usuarioiosPut );
//post se usa para crear ejm usuario creado exitosamente 
router.post('/',[
    //es un midleware
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El pasword debe tener mas de 5 caracteres').isLength({min: 5}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correoExiste),
    // check('rol', 'No es un rol permitido').isIn(['Admin_rol', 'User_rol']),

    check('rol').custom(esRoleValido),
    validarCampos
], usuarioiosPost );


 router.delete('/:id', [
    
    validarJWT,
    // esAdminRole, (para que solo acepte un rol)
    tieneRol('Admin_rol', 'Ventas_rol', 'Otro_rol'),
    check('id', 'No es un id valido ').isMongoId(),
    check('id').custom(existeUsuarioxid),
    validarCampos
],usuarioiosDelete );


router.patch('/', usuarioiosPatch );

module.exports = router ;
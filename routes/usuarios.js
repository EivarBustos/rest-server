

const {Router} = require('express');
const { usuariosGet, usuarioiosPut, usuarioiosPost, usuarioiosDelete, usuarioiosPatch } = require('../controller/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, correoExiste, existeUsuarioxid } = require('../helpers/db-validators');



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
router.delete('/', usuarioiosDelete );
router.patch('/', usuarioiosPatch );

module.exports = router ;
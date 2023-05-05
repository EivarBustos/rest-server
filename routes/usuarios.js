

const {Router} = require('express');
const { usuariosGet, usuarioiosPut, usuarioiosPost, usuarioiosDelete, usuarioiosPatch } = require('../controller/usuarios');

const router = Router();


router.get('/',  usuariosGet)
//put se usa para añadir 
router.put('/:id', usuarioiosPut );
//post se usa para crear ejm usuario creado exitosamente 
router.post('/', usuarioiosPost );
router.delete('/', usuarioiosDelete );
router.patch('/', usuarioiosPatch );

module.exports = router ;
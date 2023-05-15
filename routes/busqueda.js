
const { Router}= require('express');
const { buscar } = require('../controller/busqueda');

const router = Router();

router.get('/:coleccion/:termino', buscar)


module.exports=router;
const Rol = require('../models/rol.js')


const esRoleValido = async(rol = '')=>{
    const existeRol = await Rol.findOne({rol});
    if(!existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos `)
    }
}

module.exports={
    esRoleValido
}
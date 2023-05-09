const Rol = require('../models/rol.js')
const Usuario = require('../models/usuario.js')


const esRoleValido = async(rol = '')=>{
    const existeRol = await Rol.findOne({rol});
    if(!existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos `)
    }
}


const correoExiste= async(correo ='')=>{

const existeEmail = await Usuario.findOne({correo});
if(existeEmail){
    
        throw new Error(`El corrreo ${correo} ya se encuentra registrado`)
    }


}

const existeUsuarioxid= async(id)=>{
 
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeUsuario = await Usuario.findById( id ).exec();
        if ( !existeUsuario ) {
            throw new Error(`El id ${ id } no existe`);
        }
    } 
};
    
    
    

module.exports={
    esRoleValido,
    correoExiste,
    existeUsuarioxid
}
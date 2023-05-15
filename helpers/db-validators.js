const { Categoria, Usuario, Producto } = require('../models/index.js');
const Rol = require('../models/rol.js')



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

///validar si exite la categoria 

const existeCategoriaxid= async(id)=>{
 
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        
        const existeCategoria = await Categoria.findById(id).exec();
        if ( !existeCategoria) {
            throw new Error(`El id ${ id } no existe`);
        }
    } 
};

//Validar si existe el producto 
const existeProductoxid= async(id)=>{
 
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        
        const existeProducto = await Producto.findById(id).exec();
        if ( !existeProducto) {
            throw new Error(`El id ${ id } no existe`);
        }
    } 
};

    
    
    

module.exports={
    esRoleValido,
    correoExiste,
    existeUsuarioxid,
    existeCategoriaxid,
    existeProductoxid
}
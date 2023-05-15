const { response } = require("express");
const {ObjectId} = require('mongoose').Types;

const {Usuarios, Categoria, Producto} = require('../models')

const colleccionesPermitidas =[
    'usuario',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuario = async (termino='', res= response)=>{
     const esMongoId = ObjectId.isValid(termino);//TRUE

     if(esMongoId){
        const usuario = await Usuarios.findById(termino);
        return res.json({
            //para no regresar null se hace asi para regresar un arreglo vacio
            results:(usuario) ? [usuario] : []
        })
     }

     const regex = new RegExp(termino, 'i')

     const usuarios = await Usuarios.find({
        $or: [
            {nombre : regex,},
            {correo: regex}],
        $and: [{estado:true}]
     });
     res.json({
        //para no regresar null se hace asi para regresar un arreglo vacio
        results : usuarios
    })
}

const buscarCategoria = async (termino='', res= response)=>{
    const esMongoId = ObjectId.isValid(termino);//TRUE

    if(esMongoId){
       const categoria = await Categoria.findById(termino).populate('categoria', 'nombre');
       return res.json({
           //para no regresar null se hace asi para regresar un arreglo vacio
           results:(categoria) ? [categoria] : []
       })
    }

    const regex = new RegExp(termino, 'i')

    const categoria = await Categoria.find({
       $or: [ {nombre : regex}  ],
          
       $and: [{estado:true}]
    });
     
    res.json({
       //para no regresar null se hace asi para regresar un arreglo vacio
       results : categoria
   })
}


const buscarProducto = async (termino='', res= response)=>{
    const esMongoId = ObjectId.isValid(termino);//TRUE

    if(esMongoId){
       const producto = await Producto.findById(termino);
       return res.json({
           //para no regresar null se hace asi para regresar un arreglo vacio
           results:(producto) ? [producto] : []
       })
    }

    const regex = new RegExp(termino, 'i')

    const producto = await Producto.find({
       $or: [ {nombre : regex} ],
          
       $and: [{estado:true}]
    });
    res.json({
       //para no regresar null se hace asi para regresar un arreglo vacio
       results : producto
   })
}





const buscar =(req, res=response)=>{
    const {coleccion, termino} =req.params;

    if(!colleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son : ${colleccionesPermitidas}`

        })
    }
    switch(coleccion){
        case 'usuario':
            buscarUsuario(termino, res)
        break;

        case 'categoria':
            buscarCategoria(termino, res)
        break;

        case 'productos':
            buscarProducto(termino, res)
        break;

        default:
          res.status(500).json({
            msg:'Se le olvido hacer esta busqueda'
          })
    }

}

module.exports={
    buscar
}
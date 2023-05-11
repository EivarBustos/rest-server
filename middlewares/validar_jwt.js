const { response, request } = require('express');

const jwt = require('jsonwebtoken');
const Usuario =require('../models/usuario');
const usuario = require('../models/usuario');



const validarJWT = async(req= request, res = response, next)=>{
 const token =req.header('x-token');

 if( !token) {
    return res.status(401).json({
        msg:'No hay ningun token en la peticion'
    });
 }

try{
    //verificar el json web token 
   const {uid} =jwt.verify(token, process.env.SECRETORPRIVATEKEY);
   

   //Leer el usuario que corresponda al uid 
   const usuario = await Usuario.findById(uid);

   //si el usuaio no existe 
   if (!usuario){
    return res.status(401).json({
        msg: 'Token no valido - usuario no existe en BD'
    })
   }

   //Verificar si el uid esta en estado true 

   if (!usuario.estado){
    return res.status(401).json({
        msg: 'Token no valido - usuario con estado en false'
    })
   }

   req.usuario=usuario;
   next();

}catch(error){
    
    console.log(error);
    res.status(401).json({
        msg:'Token no valido'
    })
}





}

module.exports={
    validarJWT
}
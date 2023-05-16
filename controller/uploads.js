
const fs = require('fs');
const path = require('path');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require("express");
const { subirArchivos } =require("../helpers");

const {Usuarios, Producto} =require('../models')

const cargarArchivos= async (req, res=response)=>{
  
  try{
  //imagenes
  // const nombre = await subirArchivos(req.files,  ['txt', 'pdf','docx'], 'textos');
     const nombre = await subirArchivos(req.files, undefined, 'imgs');

  res.json({
     nombre
  })  

  }catch(msg){
    res.status(400).json({ msg })

  }


}


const actualizarImagen = async(req, res= response)=>{
  //preguntar si viene la propiedad file 
  
  const  {id, coleccion }=req.params;
  
  let modelo;

  switch(coleccion){
    case 'usuarios':
      modelo = await Usuarios.findById(id);
      if (!modelo){
        return res.status(400).json({
          msg: `No exte un Usuario con el id ${id}`
        })
      }
      break;

      case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo){
          return res.status(400).json({
            msg: `No exte un Producto con el id ${id}`
          })
        }
        break;

    default:
      return res.status(500).json({msg : `Se me olvido subir esto`});
  }

  //Limpiar imagen 
  if(modelo.img){
    //Hay que borrar la imagen del servidor 
    const pathImagen = path.join( __dirname, '../uploads/', coleccion,modelo.img);
    if ( fs.existsSync( pathImagen ) ) {
        fs.unlinkSync( pathImagen );
    }
}


  const nombre = await subirArchivos(req.files, undefined, coleccion);
  modelo.img = nombre;
  await modelo.save();

  res.json(modelo)

}

const mostrarImagen = async(req, res=response)=>{

  const  {id, coleccion }=req.params;
  
  let modelo;

  switch(coleccion){
    case 'usuarios':
      modelo = await Usuarios.findById(id);
      if (!modelo){
        return res.status(400).json({
          msg: `No exte un Usuario con el id ${id}`
        })
      }
      break;

      case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo){
          return res.status(400).json({
            msg: `No exte un Producto con el id ${id}`
          })
        }
        break;

    default:
      return res.status(500).json({msg : `Se me olvido subir esto`});
  }

  //Limpiar imagen 
  if(modelo.img){
    //Hay que borrar la imagen del servidor 
    const pathImagen = path.join( __dirname, '../uploads/', coleccion,modelo.img);
    if ( fs.existsSync( pathImagen ) ) {
       return res.sendFile(pathImagen)
  }
 }

const pathNoImage=path.join(__dirname, '../assets/no-image.jpg')
 return res.sendFile(pathNoImage)
}




const actualizarImagenCloudinary = async(req, res= response)=>{
  //preguntar si viene la propiedad file 
  
  const  {id, coleccion }=req.params;
  
  let modelo;

  switch(coleccion){
    case 'usuarios':
      modelo = await Usuarios.findById(id);
      if (!modelo){
        return res.status(400).json({
          msg: `No exte un Usuario con el id ${id}`
        })
      }
      break;

      case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo){
          return res.status(400).json({
            msg: `No exte un Producto con el id ${id}`
          })
        }
        break;

    default:
      return res.status(500).json({msg : `Se me olvido subir esto`});
  }

  //Limpiar imagen 
  if(modelo.img){
    //Hay que borrar la imagen del servidor 
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length -1];
    const [public_id]    = nombre.split('.');
    // console.log(public_id)
    cloudinary.uploader.destroy(public_id);
   
}
  // console.log(req.files.archivo);
  const { tempFilePath} = req.files.archivo
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);


   modelo.img = secure_url;
   await modelo.save();
   res.json(modelo)

}


module.exports={
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}
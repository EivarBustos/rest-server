const path =require('path');
const {v4: uuidv4}= require('uuid');

const subirArchivos=(files, extensionesValidas=['png', 'jpg', 'jpeg', 'gif'], carpeta='')=>{

    return new Promise((resolve, reject)=>{
//aqui bucamos una propiedad en este caso archivo 
const {archivo} = files;
//separar el nombre con la extension 
const nombreCortado = archivo.name.split('.');
//sacar la extension ejem .jpg , .pdf ect 
const extension = nombreCortado [nombreCortado.length -1];

//validar la extension 


if(!extensionesValidas.includes(extension)){
  return reject(`la extension ${extension} no es permitida, estas son las extensiones validas: ${extensionesValidas}`)
  
}

const nombreTempo = uuidv4()+'.'+extension;

//aqui es donde quiero colocar el archivo


const uploadPath =path.join( __dirname, '../uploads/', carpeta,nombreTempo);

archivo.mv(uploadPath, function(err) {
  if (err) {
    return reject(err);
  }

  resolve(nombreTempo)
});


    })

 
}

module.exports={
    subirArchivos
}
const {response, request} = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');


const usuariosGet= async(req= request, res=response) =>{
    // const {q, nombre='No name', apellido} =req.query
    const {limite = 5, desde = 0 }= req.query;
    const query = {estado: true};
    // const usuarios = await Usuario.find(query)
    // .skip(Number(desde))
    // .limit(Number(limite));

    // //saber el total de registros 
    // const total= await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        
    total,
    usuarios
    });
}

const usuarioiosPut = async (req, res) =>{
    //res.status(401).json({
    const {id} = req.params;
    const{_id, password, google, ...resto}=req.body;
    // TODO validar contra base de datos 
    if(password){
        //Encriptar la contraseña 
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
    // msg: 'put API--controlador',
    usuario
    });
};

const usuarioiosPost = async (req, res) =>{
    

    const {nombre,  correo, password, rol } =req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    //Verificar si el correo existe 
   

    //Encriptar la contraseña  genSaltSync() numero de veces para encriptarla , 
    const salt =bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en la base de datos 
    
    await usuario.save();
    res.status(401).json({
    // msg: 'post API--controlador',
    usuario
    });
};

const usuarioiosDelete = async (req, res=response) =>{
    const {id}= req.params;
    // const uid =req.uid;
    //Borrar fisicamente 
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    // const usuarioAutenticado =req.usuario
    res.json({
    usuario,
    // usuarioAutenticado
    });
};

const usuarioiosPatch = (req, res) =>{
    res.status(401).json({
    msg: 'patch API--controlador'
    });
};




module.exports={
    usuariosGet,
    usuarioiosPut,
    usuarioiosPost,
    usuarioiosDelete,
    usuarioiosPatch
}
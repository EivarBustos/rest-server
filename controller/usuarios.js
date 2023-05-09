const {response} = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');


const usuariosGet= (req, res=response) =>{
    const {q, nombre='No name', apellido} =req.query
    res.json({
    msg: 'get API--controlador',
    q,
    nombre,
    apellido
    });
}

const usuarioiosPut = (req, res) =>{
    //res.status(401).json({
    const {id} = req.params;
    res.json({
    msg: 'put API--controlador',
    id
    });
};

const usuarioiosPost = async (req, res) =>{
    

    const {nombre,  correo, password, rol } =req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    //Verificar si el correo existe 
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg:'El corrreo ya se encuentra registrado'
        })

    }

    //Encriptar la contraseña  genSaltSync() numero de veces para encriptarla , 
    const salt =bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en la base de datos 
    
    await usuario.save();
    res.status(401).json({
    msg: 'post API--controlador',
    usuario
    });
};

const usuarioiosDelete = (req, res) =>{
    res.status(401).json({
    msg: 'delete API--controlador'
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
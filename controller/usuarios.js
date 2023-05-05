const {response} = require('express');

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

const usuarioiosPost = (req, res) =>{
    const {nombre, edad} =req.body;
    res.status(401).json({
    msg: 'post API--controlador',
    nombre, edad
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
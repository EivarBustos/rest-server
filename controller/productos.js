const { response, request } = require("express");
const {Producto } =require("../models");

//obtenerProductos -paginado -populate
const obtenerProductos= async(req= request, res=response) =>{
  
    const {limite = 5, desde = 0 }= req.query;
    const query = {estado: true};
  

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        
    total,
    productos
    });
}

//obtenerProducto -populate

const obtenerProducto =async (req, res = response)=>{
    const {id} = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre');

    res.json(producto);
}


const crearProducto = async(req, res= response)=>{

    const {estado, usuario, ...body } =req.body;
        

    const productoDB = await Producto.findOne({nombre:body.nombre })
    //Si ya existe la producto saldra este error 
    if(productoDB){
        return res.status(400).json({
         msg: `El producto ${productoDB.nombre}, ya  existe`   
        });
    }
    //Generar la data a guardar y verifiacr el usuario 
    const data ={
        ...body,
        nombre:body.nombre.toUpperCase(),
        usuario:   req.usuario._id,
      
    }

    //se crea una producto usundo mi model 

    const producto = new Producto(data);

    //Guardar en la BD
    await producto.save();

    res.status(201).json(producto);


}

//actualizarProducto
const actualizarProducto = async (req, res=response) =>{
    const {id} = req.params;
    const{estado,usuario, ...data}=req.body;
   
    data.nombre = data.nombre.toUpperCase();
    data.usuario =req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new:true});

    res.json(producto);
};



//borrarProducto -Estado false
const productoDelete = async (req, res=response) =>{
    const {id}= req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new:true});
   
    res.json(productoBorrado);
};

module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    productoDelete
}
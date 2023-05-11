const { response } = require("express");

const esAdminRole =(req, res= response, next)=>{


    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const {rol, nombre}= req.usuario;
    if (rol !== 'Admin_rol'){
        return res.status(401).json({
            msg:`${nombre} no es administrador-- No puedes hacer esto`
        })
    }

    next();
}

const tieneRol=(...roles)=>{
    //...roles aqui recibo los argumentos 
    //abajo retorna la funcion que se va a ejecutar en la routa delete
    
    return (req, res= response, next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }
    
        //verificar si el rol que esta ejecutando la accion tiene permisos
        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`
            });
        }
        
        next();

    }

}

module.exports={
    esAdminRole,
    tieneRol
}
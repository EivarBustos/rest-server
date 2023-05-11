
const {Schema, model} = require('mongoose');

const UsuarioSchema= Schema({
  nombre: {
    type: String,
    require:[true, 'El nombre es obligatorio ']
  },
  correo: {
    type: String,
    require:[true, 'El correo es obligatorio '],
    unique: true
  },
  password: {
    type: String,
    require:[true, 'El contraseña es obligatoria '],
  },

  img: {
    type: String,
    
  },
  rol: {
    type: String,
    require: true,
    enum:['Admin_rol', 'User_rol']
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: true
  },

});
//No permitir que es POSMAN se muestre la clave y otros 
UsuarioSchema.methods.toJSON = function(){
  const {__v, password, _id, ...usuarioM} = this.toObject();
  //los que si se muestran se guardaran en usuarioM 
  usuarioM.uid=_id;
  return usuarioM;

}

module.exports=model('Usuarios', UsuarioSchema);
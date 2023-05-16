const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        require:true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        //como esta en usuario modelo
        ref: 'Usuarios',
        require: true
    },
    Precio:{
        type: Number,
        default: 0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref: 'Categoria',
        require:true
    },
    descripcion:{
        type:String 
    },
    disponible:{
        type:Boolean,
        default: true
    },

    img:{
        type:String
    },

});
ProductoSchema.methods.toJSON = function(){
    const {__v, estado,  ...data} = this.toObject();
    //los que si se muestran se guardaran en usuarioM 
    return data;
  
  }


module.exports=model('Producto', ProductoSchema);
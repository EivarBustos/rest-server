const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
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
    }
});
CategoriaSchema.methods.toJSON = function(){
    const {__v, estado,  ...data} = this.toObject();
    //los que si se muestran se guardaran en usuarioM 
    return data;
  
  }


module.exports=model('Categoria', CategoriaSchema);
const express = require('express')
const cors = require('cors')

 class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.usuarioPath='/api/usuarios'
        //middlewares
        this.middlewares();
        //Rutas de mi aplicacion 
        this.routes();
        
    }
    middlewares(){
        //CORS Se recomienda siempre usarlo 
        this.app.use(cors());
        //lectura desde postman body raw jason 
        this.app.use(express.json());
        //Directorio Publico 
        this.app.use(express.static('public'));
    }

     
      
    routes(){
     this.app.use(this.usuarioPath, require('../routes/usuarios.js'))  ;


   }

     listen(){
    
        this.app.listen(this.port, ()=>{
        console.log('Servidor corriendo en puerto = ',this.port)
        })
      }
   }

module.exports=Server;
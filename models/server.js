const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.js');

 class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT;

        
        this.paths={
          auth: '/api/auth',
          usuarios: '/api/usuarios',
          categorias:'/api/categorias',
          productos: '/api/productos',
          buscar:  '/api/buscar'
          
        }

        //Conectar a la base de datos 
        this.conectarDB();

        //middlewares
        this.middlewares();
        //Rutas de mi aplicacion 
        this.routes();
        
    }

    async conectarDB(){
      await  dbConnection();
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
     this.app.use(this.paths.usuarios,   require('../routes/usuarios.js'));
     this.app.use(this.paths.auth,       require('../routes/auth.js')),
     this.app.use(this.paths.categorias, require('../routes/categorias.js'));
     this.app.use(this.paths.productos, require('../routes/productos.js'))
     this.app.use(this.paths.buscar, require('../routes/busqueda.js'))



   }

     listen(){
    
        this.app.listen(this.port, ()=>{
        console.log('Servidor corriendo en puerto = ',this.port)
        })
      }
   }

module.exports=Server;
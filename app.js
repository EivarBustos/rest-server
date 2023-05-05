const dotenv = require ('dotenv');
dotenv.config({path:'./.env'});

const Server = require('./models/server')

const server = new Server();


server.listen();




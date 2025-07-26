import express from 'express'
import dotenv from 'dotenv'
import router from './Routes/auth.js';
import cors from 'cors';
import { dbConnection } from './DataBases/confing.js';

dotenv.config()

// console.log(process.env);

// Crear servidaor de express
const app = express();

//Base de datos
dbConnection();

//Cors
app.use(cors())


//Lectura y parseo del body 
app.use( express.json() );

// Directorio publico
//& "Use" es un middleware que es lo que devuelve el servidor cuando el usuario hace una peticion
app.use( express.static('public'));



//Rutas
//& Todo lo que provenga de rquire lo va habilitar en la ruta api
app.use('/api/auth', router) 



// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log( `El servidor esta corriendo ${process.env.PORT}` );
    
} )
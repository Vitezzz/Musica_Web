import express from 'express'
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';

const app = express();//creacion de una app de express

//Configuracion para rutaas de archivos en modulos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));

app.use(cookieParser());

//traduce los archivos 
app.use(express.json());

//Hacemos publica la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//Importamos las rutas
import userRouter from './routes/user.route.js';
import cancionRouter from './routes/cancion.route.js';

//Se declara la ruta
app.use("/api/v1/usuarios", userRouter);
app.use("/api/v1/canciones", cancionRouter);


//exportamos para usarlo
export default app;


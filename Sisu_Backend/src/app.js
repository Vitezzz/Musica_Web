import express from 'express'
import cors from 'cors';

const app = express();//creacion de una app de express

app.use(cors());

//traduce los archivos 
app.use(express.json());

//Importamos las rutas
import userRouter from './routes/user.route.js';
import cancionRouter from './routes/cancion.route.js';

//Se declara la ruta
app.use("/api/v1/usuarios", userRouter);
app.use("/api/v1/canciones", cancionRouter);


//exportamos para usarlo
export default app;


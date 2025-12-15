import dotenv from "dotenv"; //las variables de dotenv se traen aca
import connectDB from "./config/database.js";
import app from "./app.js";

//dotenv sabe que archivos y variables quiero 
dotenv.config({
    path: './.env'
});

//inicia el server
const startServer = async() => {
    try{
        await connectDB();
        //si pasa un error
        app.on("error", (error) =>{
            console.log("ERROR", error)
            throw error;
        });

        //Si el puerto del env esta ocupado usara el 8000
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server corre en puerto : ${process.env.PORT}`)
        })
    }catch(error){
        console.log("Conexion con Mongo fallo :(", error)

    }

}

startServer();
//
import mongoose from "mongoose"//le habla a la base de datos

//async hace que cunado una tarea termine entonces otra debe empezar
const connectDB = async () =>{  

    //Si la app crashea se atrapa el error
    try{
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected :) 
            ${connectionInstance.connection.host}`)
    }catch(error){
        console.log("MongoDB fallo al conectarse");
        process.exit(1);
    }

}

export default connectDB;
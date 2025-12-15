import { Cancion } from "../models/cancion.model.js"

//Crear una cancion
const crearCancion = async (req,res) => {
    try{
        const {nombre, artista, cancionURL,
            duracion, imagenURL
        } = req.body

        if(!nombre || !cancionURL){
            return res.status(400).json({
                message:"Este campo es necesario"
            });
        }


        const cancion = await Cancion.create({nombre, artista,
            cancionURL, duracion, imagenURL
        })

        res.status(201).json({
            message: "Cancion añadida exitosamente :)", cancion
        })
    }catch(error){
        res.status(500).json({
            message:"Error interno del servidor"
        })
    }
}

//Obtiene todas las canciones
const getCanciones = async (req,res) => {
    try{
        const canciones = await Cancion.find();
        res.status(200).json(canciones)
    }catch(error){
        res.status(500).json({
            message:"Error interno del servidor"
        })
    }
}

//actualiza la cancion
const updateCancion = async (req,res) => {
    try{
        //Validacion basica si el body esta empty
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message:"No data provided"
            })
        }

        const cancion = await Cancion.findByIdAndUpdate(req.params.id, req.body,
            {new: true}
        )

        if(!cancion) return res.status(400).json({
            message: "Cancion no encontrada :("
        })

        res.status(200).json({
            message: "Cancion actualizada correctamente :D",
            cancion
        })
    }catch(error){
        res.status(500).json({
            message: "Error Interno del Servidor T-T"
        })
    }
}

//eliminar cancion
const deleteCancion = async (req,res) => {
    try{
        const deleted = await Cancion.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({
            message: "cancion no encontrada T-T"
        })

        res.status(200).json({
            message:"Cancion deleteada con exito >:)"
        })

    }catch(error){
        res.status(500).json({
            message:"Error interno del servidor T-T", error
        })

    }
}

export{
    crearCancion,
    getCanciones,
    updateCancion,
    deleteCancion
};
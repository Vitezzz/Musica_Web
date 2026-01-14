import { Cancion } from "../models/cancion.model.js"

//Crear una cancion
const crearCancion = async (req,res) => {
    try{
        const {nombre, artista,
            duracion, imagenURL
        } = req.body

        if(!nombre){
            return res.status(400).json({
                message:"Este campo es necesario"
            });
        }

        //Validamos si llego el archivo de musica
        if(!req.file){
            return res.status(400).json({
                message: "Debes subir una song de file"
            });
        }

        //Construccion de la URL para el archivo de musica
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const cancionName = req.file.filename;
        const cancionURL = `${serverUrl}/uploads/${cancionName}`;


        const cancion = await Cancion.create({
            nombre, 
            artista,
            cancionURL, 
            duracion, 
            imagenURL, 
            user: req.user.id
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
        const canciones = await Cancion.find({
            user: req.user.id
        }).populate('user');
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

        //copiamos los datos de texto
        let datosParaActualizar = { ...req.body };
        //Si llego un archivo nuevo (audio), generamos su URL y la agregamos
        if(req.file){
            const serverURL = `${req.protocol}://${req.get('host')}`;
            const cancionName = req.file.filename;
            datosParaActualizar.cancionURL = `${serverURL}/uploads/${cancionName}`;
        }

        const cancion = await Cancion.findOneAndUpdate(
           {_id: req.params.id,
            user: req.user.id},
            datosParaActualizar,
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
        const deleted = await Cancion.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        })
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
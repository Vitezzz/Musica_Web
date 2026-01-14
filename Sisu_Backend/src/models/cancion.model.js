import mongoose, {Schema} from "mongoose";
import { User } from "./user.model";

const songSchema = new Schema(
    {
        nombre:{
            type : String,
            required : true,
            trim: true,
        },
        artista: {
            type : String,
            trim: true,
            minLength: 1,
            maxLength: 40,
        },
        cancionURL:{
            type: String,
            required: true
        },
        duracion:{
            type: Number,
            required: false
        },
        imagenURL:{
            type:String,
            default: "https://i.pinimg.com/736x/f7/af/e3/f7afe365756d91e223e74bf48e85de41.jpg"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required : true
        }

    },
    {
        timestamps : true
    },
)

export const Cancion = mongoose.model('Cancion', songSchema)
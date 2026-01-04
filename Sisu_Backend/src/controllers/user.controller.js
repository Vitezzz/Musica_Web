//son los paths - caminos --deciden el tipo de respuesta que tendra
import { User } from "../models/user.model.js"

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //validaciones basicas
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Rellene todos los campos >:(" })
        }

        //verificar si el usuario existe

        const existing = await User.findOne({ email: email.toLowerCase() });

        if (existing) {
            return res.status(400).json({ message: "El papu ya existe" })
        }

        //Crear usuario
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        })
        res.status(201).json({
            message: "Papu registrado",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

        //en caso de que algo falle en el server
    } catch (error) {
        res.status(500).json({ message: "Error Interno", error: error.message })
    }

}

const loginUser = async (req, res) => {
    try {

        //Checa si el usuario ya existe
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) return res.status(400).json({
            message: "User not found"
        })

        //Comparacion de contraseñas
        const isMatch = await user.comparePassword(password);

        const token = await jwt.sign(
            { id: userFound._id }, //(Datos guardados)
            "secret123", //Debe coincidir con la del middleware
            { expiresIn: "1d" } //Tiempo de vida 
        );

        if (!isMatch) return res.status(400).json({
            message: "Credenciales invalidas"
        })

        //Enviamos la cookie
        res.cookie("token", token ,{
            httpOnly: true, //Por seguridad el navegador no deja que JS(front) toque esta cookie
            secure: true, //Solo enviar por http
            sameSite: 'none' //Ayuda con problemas de cookies entre diferentes dominios
        })

        res.status(200).json({
            message: "Papu logueado",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })

    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        })

        if (!user) return res.status(404).json({
            message: "Usuario con carpeta de investigacion"
        })

        res.status(200).json({
            message: "Logout exitoso"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error INterno del Servidor", error
        })
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
};


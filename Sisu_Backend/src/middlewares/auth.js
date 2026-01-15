import jwt from 'jsonwebtoken'

export const authRequired = (req, res, next) =>{
    try{
        //Buscamos el token en las cookies o en el header

        const { token } = req.cookies;

        if(!token) return res.status(401).json({message: "No hay token, autorización denegada"})

        //Verificación del token
        jwt.verify(token, "secret123", (err, user) =>{
            if (err) return res.status(403).json({message: "Token invalido"});

            //Se guarda al usuario en req.user
            req.user = user;
            next();
        })

    }catch(error){
        console.log("Error en authRequired: ", error)
        return res.status(500).json({message: error.message});

    }
};
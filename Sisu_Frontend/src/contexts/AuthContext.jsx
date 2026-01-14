import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';
import { verifyTokenRequest, registerRequest,loginRequest, logoutRequest } from '../api/auth';

export const AuthContext = createContext();

//Hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth debe usarse dentro de un Auth Provider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user , setUser ] = useState(null); //Se guarda el usuario
    const [isAuthenticated, setIsAuthenticated] = useState(false); //para saber si esta logueado
    const [loading, setLoading] = useState(true);//EL tiempo de espera

    const signUp = async (user) => {
    try{
        const res = await registerRequest(user);
        console.log(res.data)
        setUser(res.data);
        setIsAuthenticated(true);
        
    }catch(error){
        console.log(error);
    }
}

const signIn = async (user) => {
    try{
        const res = await loginRequest(user);
        console.log(res.data)
        setUser(res.data);
        setIsAuthenticated(true);
        
    }catch(error){
        console.log(error);
    }
}

const logout = async () => {
    try{
        await logoutRequest()
        setUser(null)
        setIsAuthenticated(false)
    }catch(error){
        console.log(error);
    }
}

    useEffect(() =>{
    async function checkLogin(){
        
        try{
            const res = await verifyTokenRequest();

            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);

        }catch(error){
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
        }
    }
    checkLogin();
}, []);

    return (
    <AuthContext.Provider value={{
        user,
        isAuthenticated,
        loading,
        useAuth,
        verifyTokenRequest,
        signUp,
        signIn,
        logout
    }}>
        {children}
    </AuthContext.Provider>    
);
};



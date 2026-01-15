import axios from 'axios';

// 1. La dirección base de tu Backend (puerto 3000)
const API = 'http://localhost:3000/api/v1';

// 2. Las funciones de Registro y Login
export const registerRequest = (user) => axios.post(`${API}/usuarios/register`, user , { withCredentials: true});
export const loginRequest = (user) => axios.post(`${API}/usuarios/login`, user , { withCredentials: true});
export const logoutRequest = (user) => axios.post(`${API}/usuarios/logout`,{}, { withCredentials: true});

export const verifyTokenRequest = () => axios.get(`${API}/usuarios/verify`, {
    withCredentials: true // 🔑 ¡Crucial! Sin esto no viaja la cookie.
});
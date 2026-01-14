import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const values = {username, email, password}

        await signUp(values);

        navigate("/AllSongs")

        console.log("Datos a enviar: " , values)
      }catch(error){
        console.log("Error: ", error)
      }
    }

  return (
    <>
      <div className="register">
        <h2>Registración</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de Usuario: </label>
          <input type="text" placeholder="usuario"
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required />
          <label>Email :</label>
          <input type="text" placeholder="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required />
          <label>Password :</label>
          <input type="password" placeholder="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
          <div>
            <button type ="submit">Registración</button>
        </div>
        </form>
      </div>
    </>
  );
};

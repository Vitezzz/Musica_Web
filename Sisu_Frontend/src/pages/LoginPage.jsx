import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

    // 1. Quitamos el estado de username, solo necesitamos email y pass
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 2. Extraemos signIn en lugar de signUp
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        // 3. El objeto ya no lleva username
        const values = { email, password }
        
        // 4. Llamamos a la función de logueo
        await signIn(values);

        navigate("/")
        console.log("Sesión iniciada: " , values)
      }catch(error){
        console.log("Error: ", error)
      }
    }

  return (
    <>
      <div className="login"> {/* Cambié la clase a login por si quieres estilos distintos */}
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Aquí borré el input de Usuario */}

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
            <button type ="submit">Entrar</button>
        </div>
        </form>
      </div>
    </>
  );
};
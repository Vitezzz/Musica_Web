import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useMusic } from '../contexts/MusicContext';
import '../css/CrearCancion.css';


export const CrearCancion = () => {

  const { id } = useParams(); //Se lee el id de la url si existe
  const { allSongs, setAllSongs, getSongs } = useMusic(); //Se traen todas las canciones
  const navigate = useNavigate(); //Redirige al terminar

  //"Memoria del componente"
  const [nombre, setNombre] = useState("");
  const [artista, setArtista] = useState("");
  const[cancionFile, setCancionFile] = useState("");
  const[imagenURL, setImagenURL] = useState("");
  const[duracion , setDuracion] = useState(0);

  useEffect(() => {
    if(id){
      //Busca la cancion en la lista de AllSongs que tenga ese ID
      const cancionEditar = allSongs.find(song => song._id === id);
      
      //Si se encuentra se actualizan los states
      if (cancionEditar){
        setNombre(cancionEditar.nombre);
        setArtista(cancionEditar.artista);
        setImagenURL(cancionEditar.imagenURL);
        setDuracion(cancionEditar.duracion);
      }
    }
  }, [id, allSongs])

  const handleSubmit = async (e) =>{
    e.preventDefault(); // <== Evita que la pagina recargue

    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("artista", artista);
      formData.append("imagenURL", imagenURL);
      // Usamos la duración calculada (state)
      formData.append("duracion", duracion); 

      if (cancionFile) {
        formData.append("cancion_file", cancionFile);
      }

      // --- AQUÍ EMPIEZA LA DECISIÓN ---
      if (id) {
        // ==============================
        // MODO EDICIÓN (Tiene ID)
        // ==============================
        await axios.patch(`http://localhost:3000/api/v1/canciones/updateCancion/${id}`, formData, {
          withCredentials: true
        });
        
        alert("Canción actualizada correctamente :D");
        
        await getSongs(); // Actualizamos la lista
        navigate("/AllSongs");    // Nos vamos al inicio

      } else {
        // ==============================
        // MODO CREACIÓN (No tiene ID)
        // ==============================
        // IMPORTANTE: Este bloque está dentro del ELSE, por eso no se mezcla
        const respuesta = await axios.post("http://localhost:3000/api/v1/canciones/crearCancion", formData, {
          withCredentials : true
        });
        
        console.log("Song guardada con éxito", respuesta.data);
        alert("Canción guardada exitosamente :)");

        await getSongs(); // Actualizamos la lista

        // Limpiar el formulario
        setNombre("");
        setArtista("");
        setCancionFile(null);
        setImagenURL("");
        setDuracion(0);
      }

    } catch (error) {
      console.log("Error:", error);
      alert("Hubo un error al procesar la solicitud :(");
    }

  }

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if(file){
      setCancionFile(file);

      //Obtener la duración del audio
      const audio = new Audio(URL.createObjectURL(file));
      audio.onloadedmetadata = () => {
        //Se guarda la duración en segundos (redondeado)
        setDuracion(Math.round(audio.duration));
      }
    }
  }

  return (
    <div className="canciones">
      <h2>Songs</h2>
      <form className="crear-Cancion" onSubmit={handleSubmit}>
        <h3>Crear new song</h3>
        <div className="song-create-form">
          <label>Nombre de la Song: </label>
          <input type="text" 
          placeholder="Song"
          value = {nombre} //El input muestra lo de la variable nombre
          onChange={(e) => setNombre(e.target.value)} //Se actualiza el nombre al escribir 
          required />
          <label>Nombre del artist: </label>
          <input type="text"
           placeholder="artist"
           value= {artista}
           onChange={(e) => setArtista(e.target.value)} 
           required />
          <hr />{" "}
          <div class="input-group">
            <label>
             Subir cancion archivo .mp3:
            </label>
            <input
              type="file"
              name="cancion_file"
              accept='.mp3, audio/*'
              onChange = {handleFileChange}
              required = {!id} //Solo es obligatorio si NO hay id
            />
          </div>
          <div>
            <label>Subir Imagen: </label>
            <input type = "url" 
            name="imagen_song" 
            accept="image/*"
            value={imagenURL}
            onChange={(e) => setImagenURL(e.target.value)} />
          </div>
          <div>
            <button type="submit">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

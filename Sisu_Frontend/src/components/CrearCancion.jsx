import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useMusic } from '../contexts/MusicContext';
import '../css/CrearCancion.css';


export const CrearCancion = () => {

  const { id } = useParams(); //Se lee el id de la url si existe
  const { allSongs, setAllSongs } = useMusic(); //Se traen todas las canciones
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
        setCancionURL(cancionEditar.cancionURL);
        setImagenURL(cancionEditar.imagenURL);
      }
    }
  }, [id, allSongs])

  const handleSubmit = async (e) =>{
    e.preventDefault(); // <== Evita que la pagina recargue

    //Creamos un formdata 
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("artista", artista);
    formData.append("imagenURL", imagenURL);
    formData.append("duracion", 0);
    formData.append("cancion_file", cancionFile)

    try{

      if(id){
        //Modo edicion
        // --- MODO EDICIÓN (Pendiente) ---
        // Por ahora solo avisamos, porque editar archivos requiere otra lógica
        alert("La edición de archivos la veremos más adelante. Intenta crear una canción nueva.");

        //navigate("/");

      }else{

        //Se envia el paquete al back
      const respuesta = await axios.post("http://localhost:3000/api/v1/canciones/crearCancion", formData);

      console.log("Song guardada con exito", respuesta.data);
      alert("Cancion guardada exitosamente :)")

      //Limpiar el formulario
      setNombre("");
      setArtista("");
      setCancionFile(null);
      setImagenURL("");

      }

    }catch(error){
      console.log("Error al guardar: ", error)
      alert("Hubo error al guardar la song: (")
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
              onChange = {(e) => setCancionFile(e.target.files[0])}
              required
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

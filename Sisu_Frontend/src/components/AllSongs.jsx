import { useMusic } from '../contexts/MusicContext';
import { Link } from 'react-router-dom'
import '../css/AllSongs.css';
import axios from 'axios'

export const AllSongs = () =>{
    const { allSongs,setAllSongs, handlePlaySong, currentTrackIndex } = useMusic();

    const handleDelete = async (e, songId) => {
        e.stopPropagation();//Evita que la musica empiece a sonar al querer borrar la cancion

        //Confirmacion para no borrar por error
        if(!window.confirm("Seguro de borrar esta canción?")) return;

        try{
            console.log("Borrado song: ", songId)

            const respuesta = await axios.delete(`http://localhost:3000/api/v1/canciones/deleteCancion/${songId}`)

            setAllSongs((prevSongs) => prevSongs.filter(song => song._id !== songId)); //Actualiza la lista en react

        }catch(error){
            console.log("Error al borrar: " , songId)
        }
    }

    if (allSongs.length === 0) {
        return <h2>No hay canciones registradas aún T-T </h2>;
    }
    return (
        <div className="all-songs">
            <h2>Numero de Canciones: ({allSongs.length})</h2>
            <div className="songs-grid">
                    {allSongs.map((song,key) => (
                        <div key={song._id}
                        className = {`song-card ${currentTrackIndex === key? "active" : ""}`}
                         onClick={() => handlePlaySong(song,key)}>
                            <div className="song-info">
                                <h3>{song.nombre}</h3>
                                <img src={song.imagenURL} alt={song.nombre}/>
                                <p>{song.artista}</p>
                                <span>{Math.trunc(song.duracion / 60)}</span>
                                <span>{song.createdAt}</span>
                            </div>
                            <div>
                                {currentTrackIndex === key ? "▶️" : "🎵"}
                            </div>
                            <button><Link to={`/editarCancion/${song._id}`}>✏️</Link></button>
                            <div>
                                <button onClick={(e) => handleDelete(e, song._id)}>🗑️</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
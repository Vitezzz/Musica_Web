import { useMusic } from '../contexts/MusicContext';
import { Link } from 'react-router-dom';
import '../css/AllSongs.css';
import axios from 'axios';

export const AllSongs = () => {
    // Traemos todo lo necesario del contexto
    const { allSongs, getSongs, handlePlaySong, currentTrackIndex, formatTime } = useMusic();

    const handleDelete = async (e, songId) => {
        e.stopPropagation(); // Evita que la música suene al dar clic en borrar

        // Confirmación
        if (!window.confirm("¿Seguro de borrar esta canción?")) return;

        try {
            // Borramos en el backend
            await axios.delete(`http://localhost:3000/api/v1/canciones/deleteCancion/${songId}`);
            
            console.log("Canción borrada ID:", songId);
            
            // Actualizamos la lista automáticamente
            await getSongs();

        } catch (error) {
            console.log("Error al borrar:", error);
            alert("Hubo un error al intentar borrar la canción.");
        }
    };

    if (allSongs.length === 0) {
        return <h2 style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>No hay canciones registradas aún T-T</h2>;
    }

    return (
        <div className="all-songs">
            <h2>Número de Canciones: ({allSongs.length})</h2>
            <div className="songs-grid">
                {allSongs.map((song, key) => (
                    <div key={song._id}
                        className={`song-card ${currentTrackIndex === key ? "active" : ""}`}
                        onClick={() => handlePlaySong(song, key)}>

                        {/* 1. LA PORTADA (Sin bordes, ocupando todo el ancho) */}
                        <div className="card-image">
                            <img src={song.imagenURL} alt={song.nombre} />
                            {/* Capa oscura con botón Play al pasar el mouse */}
                            <div className="play-overlay">
                                {currentTrackIndex === key ? "🔊" : "▶"}
                            </div>
                        </div>

                        {/* 2. LA INFO (Con padding para que el texto no pegue al borde) */}
                        <div className="card-content">
                            <h3>{song.nombre}</h3>
                            <p>{song.artista}</p>
                            
                            <div className="meta-info">
                                {/* Usamos formatTime si existe, si no mostramos el valor directo */}
                                <span>⏱ {formatTime ? formatTime(song.duracion) : song.duracion}</span>
                                
                                {/* Formateamos la fecha si existe */}
                                <span>📅 {song.createdAt ? song.createdAt.split('T')[0] : ''}</span>
                            </div>
                        </div>

                        {/* 3. BARRA DE BOTONES (Pegada al fondo) */}
                        <div className="card-actions">
                            {/* Botón Editar */}
                            <Link to={`/editarCancion/${song._id}`} 
                                  className="action-btn edit" 
                                  onClick={(e) => e.stopPropagation()}>
                                ✏️ Editar
                            </Link>
                            
                            {/* Botón Borrar */}
                            <button className="action-btn delete" 
                                    onClick={(e) => handleDelete(e, song._id)}>
                                🗑️ Borrar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
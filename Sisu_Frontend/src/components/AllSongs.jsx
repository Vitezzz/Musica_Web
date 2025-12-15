import { useMusic } from '../contexts/MusicContext';
import '../css/AllSongs.css';

export const AllSongs = () =>{
    const { allSongs, handlePlaySong, currentTrackIndex } = useMusic();

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
                        </div>
                    ))}
            </div>
        </div>
    );
};
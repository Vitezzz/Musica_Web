import { useEffect, useRef } from "react";
import '../css/MusicPlayer.css';
import { useMusic } from "../contexts/MusicContext";

export const MusicPlayer = () => {
  const { currentTrack, 
    formatTime, 
    currentTime, 
    duration, 
    setDuration, 
    setCurrentTime, 
    nextTrack, 
    previousTrack,
    isPlaying,
    pause,
    volume,
    setVolume,
    play } = useMusic();
    
  const audioRef = useRef(null);

  // 1. Efecto para manejar Play/Pause y Volumen
  useEffect(() => {
    const audio = audioRef.current;
    if(!audio) return;
    
    audio.volume = volume;
    
    if(isPlaying){
        // Usamos una promesa para evitar errores si el play es muy rápido
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Esperando carga para reproducir...", error);
            });
        }
    }else{
        audio.pause();
    }
  }, [isPlaying, volume, currentTrack]); 

  // 2. Efecto simple para resetear visualmente al cambiar canción
  useEffect(() =>{
    const audio = audioRef.current;
    if(!audio) return;

    setDuration(0); 
    setCurrentTime(0);
    audio.load(); // Forzamos la carga del nuevo archivo

  }, [currentTrack, setDuration, setCurrentTime]);

  // 3. HANDLERS MÁS SEGUROS (Directos en la etiqueta audio)
  const onLoadedMetadata = (e) => {
      const seconds = e.currentTarget.duration;
      setDuration(seconds);
      // Si debería estar sonando, intentamos play de nuevo por seguridad
      if(isPlaying) e.currentTarget.play().catch(e => console.error(e));
  };

  const onTimeUpdate = (e) => {
      setCurrentTime(e.currentTarget.currentTime);
  };

  const handleSeek = (e) =>{
    const newTime = parseFloat(e.target.value);
    if(audioRef.current) audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }

  const handleVolume = (e) =>{
    setVolume(parseFloat(e.target.value));
  }

  if (!currentTrack) return null;

  // Cálculo para la barra de progreso visual (CSS variable)
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player">
      {/* ✅ SOLUCIÓN AL ERROR DE 0:00 
         Usamos los eventos onLoadedMetadata, onTimeUpdate, etc. 
         directamente aquí en lugar de addEventListener.
      */}
      <audio 
        ref={audioRef} 
        src={currentTrack.cancionURL} 
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={nextTrack}
      />
      
       {/* Estructura actualizada para el CSS Retro */}
       <div className="song-info">
        <img src={currentTrack.imagenURL} alt="Cover" />
        <div className="song-details">
            <h4>{currentTrack.nombre}</h4>
            <p>{currentTrack.artista}</p>
        </div>
       </div>

       <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <input type ="range"
         min="0" 
         max={duration || 0} 
         step="0.1" 
         value={currentTime || 0}
         className="progress-bar"
         onChange={handleSeek}
         style={{"--progress" : `${progressPercentage}%`}}
        />
        <span className="time">{formatTime(duration)}</span>
       </div>

       <div className="controls">
        <button className="control-btn" onClick={previousTrack}>⏪</button>
        <button className="control-btn play-btn" 
        onClick={() => (isPlaying ? pause() : play())}>
          {isPlaying ? "||" : "▶"}
        </button>
        <button className="control-btn" onClick={nextTrack}>⏭️</button>
       </div>

       <div className="volume-control"> 
        <span>🔊</span>
        <input type="range" 
         min="0" max="1" step="0.05" 
         className="volume-slider"
         onChange={handleVolume}
         value={volume} />
       </div>
    </div>
  )
}
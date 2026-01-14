import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const MusicContext = createContext();

export const MusicProvider = ({children}) =>{

    const [allSongs, setAllSongs] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentTrackIndex, setCurrentTrackIndex]= useState(0);
    const [currentTime, setCurrentTime]= useState(0);
    const [duration, setDuration]= useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume ]= useState(1);

    const getSongs = async () =>{
            try{
                //Peticion al backend puente con el bakc
                const response = await axios.get("http://localhost:3000/api/v1/canciones/getCancion", { 
                    withCredentials : true
                });

                console.log("Datos recibidos del backend: ", response.data)

                //Se guarada la lista completa
                setAllSongs(response.data);
                // "Si llegaron canciones, pon la primera (índice 0) como la actual"
                if (response.data.length > 0) {
                    setCurrentTrack(response.data[0]); // <--- Esto es lo que querías hacer
                    setCurrentTrackIndex(0);
                }
            }catch(error){
                console.error("Error cargando canciones: ", error)
            }
        };

    useEffect(() => {
        getSongs();
    }, [])    
    
        //Controla la reproduccion de la cancion
        const handlePlaySong = (song, index) =>{
            //Se refiere a la cancion actual que se reproduce
            setCurrentTrack(song);
            //Se refiere al indice de la lista en que se encuentra
            setCurrentTrackIndex(index);
    
            setIsPlaying(true);
        }
    
        //Reproducir siguiente cancion
        const nextTrack = () => {
            setCurrentTrackIndex((prev) => {
                const nextIndex = (prev + 1) % allSongs.length;
                setCurrentTrack(allSongs[nextIndex]);
                return nextIndex;
            });
            setIsPlaying(true);
        }
    
         //Reproducir cancion anterior
        const previousTrack = () => {
            setCurrentTrackIndex((prev) => {
                const nextIndex = prev === 0 ? allSongs.length -1 : prev - 1;
                setCurrentTrack(allSongs[nextIndex]);
                return nextIndex;
            })
            setIsPlaying(true);
        }
    
        const formatTime = (time) => {
            if(isNaN(time) || time === undefined) return "0:00"
    
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            
            //El padstart es para que los segundos no aparezca asi de 1 si no 01
            return `${minutes}:${seconds.toString().padStart(2,"0")}`;
    
        }
    
        const play = () => setIsPlaying(true);
        const pause = () => setIsPlaying(false);
    
    return <MusicContext.Provider value={{allSongs,getSongs,
        setAllSongs,
        handlePlaySong, 
        currentTrackIndex,
        currentTrack,
        setCurrentTime, 
        currentTime, 
        formatTime,
        duration, 
        setDuration, 
        nextTrack, 
        previousTrack,
        play,
        pause,
        isPlaying,
        volume,
        setVolume}}>{children}
        </MusicContext.Provider>
};

export const useMusic = () =>{
    const contextValue = useContext(MusicContext)
    if(!contextValue){
        throw new Error("useMusic must be used inside of MusicProvider")
    }
    return contextValue;
}
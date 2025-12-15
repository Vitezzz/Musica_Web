export const CrearCancion = () => {
  return (
    <div className="canciones">
      <h2>Songs</h2>
      <div className="crear-Cancion">
        <h3>Crear new song</h3>
        <div className="song-create-form">
          <label>Nombre de la Song: </label>
          <input type="text" placeholder="Song" required />
          <label>Nombre del artist: </label>
          <input type="text" placeholder="artist" required />
          <div class="input-group">
            <label>Opción A: Sube tu archivo mp3/wav</label>
            <input type="file" name="cancion_archivo" accept="audio/*" />
          </div>
          <hr />{" "}
          <div class="input-group">
            <label>
              Opción B: O pega un link (YouTube, SoundCloud, URL directa)
            </label>
            <input
              type="url"
              name="cancion_url"
              placeholder="https://ejemplo.com/cancion.mp3"
            />
          </div>
          <div>
            <label>Subir Imagen: </label>
            <input type = "file" name="imagen_song" accept="image/*" />
          </div>
          <div>
            <button type="submit">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

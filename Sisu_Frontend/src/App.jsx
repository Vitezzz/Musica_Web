import './App.css'
import { MusicPlayer } from "./components/MusicPlayer";
import { AllSongs } from "./components/AllSongs";
import { CrearCancion } from './components/CrearCancion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './contexts/MusicContext';
import { Navbar } from './components/Navbar';


function App() {
  return (
    <>
    <BrowserRouter>
    <MusicProvider>
    <div className="app">
      <Navbar />
      <main>
      <div>
        <MusicPlayer/>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<AllSongs/>}/>
          <Route path="/CrearCancion" element={<CrearCancion />}/>
          <Route path="/editarCancion/:id" element={<CrearCancion />}/>
        </Routes>
      </div>
    </main>
    </div>
    </MusicProvider>
    </BrowserRouter>
    </>
  )
}

export default App

import "./App.css";
import { MusicPlayer } from "./components/MusicPlayer";
import { AllSongs } from "./components/AllSongs";
import { CrearCancion } from "./components/CrearCancion";
import { RegisterPage } from "./components/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicProvider } from "./contexts/MusicContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Navbar } from "./components/Navbar";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <MusicProvider>
            <div className="app">
              <Navbar />
              <main>
                <div>
                  <MusicPlayer />
                </div>
                <div>
                  <Routes>
                    <Route path="/" element={<AllSongs />} />
                    <Route path="/CrearCancion" element={<CrearCancion />} />
                    <Route
                      path="/editarCancion/:id"
                      element={<CrearCancion />}
                    />
                    <Route path="/RegisterPage" element={<RegisterPage />} />
                    <Route path="/LoginPage" element={<LoginPage />} />
                  </Routes>
                </div>
              </main>
            </div>
          </MusicProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

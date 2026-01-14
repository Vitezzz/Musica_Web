import "../css/Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link className="brand-link" to="/">
          🃏 Music Player
        </Link>
      </div>

      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link
              to="/AllSongs"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Lista de Songs
            </Link>
            <Link
              to="/CrearCancion"
              className={`nav-link ${
                location.pathname === "/addSongs" ? "active" : ""
              }`}
            >
              Add Canciones
            </Link>
            <Link to="/logout" onClick={() => logout()} className="nav-link">Unregister</Link>
          </>
        ) : (
          <>
            <Link to="/" className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}>Login</Link>
            <Link to="/RegisterPage" className={`nav-link ${location.pathname === "/addSongs" ? "active" : ""}`}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

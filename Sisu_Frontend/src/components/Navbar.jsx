import '../css/Navbar.css';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
    const location = useLocation();
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link className="brand-link" to="/">🃏 Music Player</Link>
        </div>
        <div className="navbar-links">
            <Link to ="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            Lista de Songs
            </Link>
            <Link to ="/CrearCancion" className={`nav-link ${location.pathname === "/addSongs" ? "active" : ""}`}>
            Add Canciones 
            </Link>
        </div>
    </nav>
}
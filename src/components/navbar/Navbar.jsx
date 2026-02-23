import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { BiTask } from "react-icons/bi";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <BiTask />
            </div>
            
            <div className="nav-links">
                <NavLink to="/tasks">Tareas</NavLink>
                <NavLink to="/categories">Categorías</NavLink>
                <NavLink to="/tags">Etiquetas</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;

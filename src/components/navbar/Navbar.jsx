import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { BiTask } from "react-icons/bi";

function Navbar() {
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

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

            {user && (
                <div className="nav-user">
                    <span>{user.name}</span>
                    <button className="btn-logout" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;

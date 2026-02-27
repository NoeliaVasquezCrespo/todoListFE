import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../../services/auth.service";
import "../../assets/styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(form);
            localStorage.setItem("token", response.accessToken);
            localStorage.setItem("user", JSON.stringify(response.user));

            Swal.fire({
                icon: "success",
                title: "Bienvenido a Todo App"
            });

            navigate("/tasks");

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message
            });
        }
    };

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <h2>INICIAR SESIÓN</h2>
                <div className="form-img"></div>

                <form className="form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange} required />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="btn-submit">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

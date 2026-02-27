import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { create, update, getOne } from "../../services/category.service";
import "../../assets/styles/Form.css";
import Swal from 'sweetalert2'

function CategoryForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        color: "#000000",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (isEdit) {
            loadCategory();
        }
    }, [id]);

    const loadCategory = async () => {
        try {
            const data = await getOne(id);

            setFormData({
                name: data.name || "",
                description: data.description || "",
                color: data.color || "#000000",
            });
        } catch (err) {
            console.error("Error cargando categoría:", err);
            setError("No se pudo cargar la categoría");
        }
    };

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name.trim()) {
            setError("El nombre es obligatorio");
            return;
        }

        if (!formData.description.trim()) {
            setError("La descripción es obligatoria");
            return;
        }

        try {
            if (isEdit) {
                await update(id, formData);
                Swal.fire({
                    title: "Correcto",
                    text: "Categoría modificada correctamente",
                    icon: "success"
                });
            } else {
                await create(formData);
                Swal.fire({
                    title: "Correcto",
                    text: "Categoría creada correctamente",
                    icon: "success"
                });
            }

            navigate("/categories");

        } catch (err) {
            setError(err.message || "Error inesperado");

            Swal.fire({
                title: "Error",
                text: err.message,
                icon: "error"
            });
        }
    };

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <h2>{isEdit ? "EDITAR CATEGORÍA" : "CREAR CATEGORÍA"}</h2>

                {error && <p className="error-text">{error}</p>}

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Color</label>
                        <input type="color" name="color" value={formData.color} onChange={handleChange} className="color-input" required />
                    </div>

                    <div className="form-buttons">
                        <button type="button" className="btn-cancel" onClick={() => navigate("/categories")}>
                            Cancelar
                        </button>

                        <button type="submit" className="btn-submit">
                            {isEdit ? "Actualizar" : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoryForm;
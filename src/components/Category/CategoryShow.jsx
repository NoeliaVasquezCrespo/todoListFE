import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../../services/category.service";
import "../../assets/styles/Form.css";

function CategoryShow() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getOne(id);
                setCategory(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategory();
    }, [id]);

    if (!category) return <p>Error: No se encuentra la categoría</p>;

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <h2>DETALLE DE CATEGORÍA</h2>

                <p><strong>Nombre:</strong> {category.name}</p>
                <p><strong>Descripción:</strong> {category.description}</p>

                <p>
                    <strong>Color:</strong>{" "}
                    <span style={{ backgroundColor: category.color, padding: "3px 10px", borderRadius: "4px" }}>
                        {category.color}
                    </span>
                </p>

                <div className="form-buttons">
                    <button className="btn-cancel" onClick={() => navigate("/categories")}>
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CategoryShow;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../../services/tag.service";
import "../../assets/styles/Form.css";

function TagShow() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tag, setTag] = useState(null);

    useEffect(() => {
        const fetchTag = async () => {
            try {
                const data = await getOne(id);
                setTag(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTag();
    }, [id]);

    if (!tag) return <p>Error: No se encuentra la etiqueta</p>;

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <h2>DETALLE DE ETIQUETA</h2>

                <p><strong>Nombre:</strong> {tag.name}</p>
                <p><strong>Descripción:</strong> {tag.description}</p>

                <p>
                    <strong>Color:</strong>{" "}
                    <span style={{ backgroundColor: tag.color, padding: "3px 10px", borderRadius: "4px" }}>
                        {tag.color}
                    </span>
                </p>

                <div className="form-buttons">
                    <button className="btn-cancel" onClick={() => navigate("/tags")}>
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TagShow;

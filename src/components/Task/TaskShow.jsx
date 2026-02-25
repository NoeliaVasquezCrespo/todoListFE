import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../../services/task.service";
import "../../assets/styles/Task.css";

function TaskShow() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);

    useEffect(() => {
        loadTask();
    }, []);

    const loadTask = async () => {
        try {
            const res = await getOne(id);
            setTask(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!task) return <p>Error: No se encuentra la tarea</p>;

    return (
        <div className="show-wrapper">
            <div className="show-card">
                <h2 className="show-title">Título: {task.title}</h2>
                <p className="show-description"> {task.description || "Sin descripción"}</p>

                <div className="show-section">
                    <strong>Categoría:</strong>
                    <span className="category-badge">
                        {task.category?.name || "Sin categoría"}
                    </span>
                </div>

                <div className="show-section">
                    <strong>Etiquetas:</strong>
                    <div className="tags-container">
                        {task.tags?.length ? (
                            task.tags.map(tag => (
                                <span key={tag.id} className="tag-badge"
                                    style={{
                                        backgroundColor: tag.color || "#ccc"
                                    }}
                                > {tag.name} </span>
                            ))
                        ) : (
                            <span>No tiene etiquetas</span>
                        )}
                    </div>
                </div>

                <div className="show-section">
                    <strong>Estado:</strong>
                    <span
                        className={`status-badge ${task.status ? "completed" : "pending"}`}>
                        {task.status ? "Completada" : "Pendiente"}
                    </span>
                </div>

                <div className="show-buttons">
                    <button className="btn-cancel" onClick={() => navigate("/tasks")}>
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskShow;

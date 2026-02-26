import { useEffect, useState } from "react";
import { create } from "../../services/task.service";
import { getAll as getAllCategories } from "../../services/category.service";
import { getAll as getAllTags } from "../../services/tag.service";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Form.css";

function TaskForm() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const catRes = await getAllCategories();
        const tagRes = await getAllTags();
        setCategories(catRes.categories);
        setTags(tagRes.tags);
    };

    const handleTagChange = (tagId) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(selectedTags.filter(id => id !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            description,
            category_id: categoryId,
            tags: selectedTags,
            status: false
        };

        await create(data);
        navigate("/tasks");
    };

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <h2>CREAR TAREA</h2>
                <form className="form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Título</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Categoría</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="form-select" >
                            <option value="">Seleccione una categoría</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Etiquetas</label>

                        <details className="multiselect">
                            <summary className="multiselect-btn">
                                Seleccionar etiquetas
                            </summary>

                            <div className="multiselect-dropdown">
                                {tags.map(tag => (
                                    <label key={tag.id} className="multiselect-option">
                                        <input type="checkbox" checked={selectedTags.includes(tag.id)} onChange={() => handleTagChange(tag.id)} />
                                        <span className="tag-label"
                                            style={{
                                                backgroundColor: `${tag.color}20`,
                                                color: tag.color
                                            }}
                                        >
                                            {tag.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </details>
                    </div>

                    <div className="form-buttons">
                        <button type="button" className="btn-cancel" onClick={() => navigate("/tasks")}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-submit">
                            Guardar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default TaskForm;


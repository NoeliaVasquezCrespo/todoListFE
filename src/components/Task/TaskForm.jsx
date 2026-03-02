import { useEffect, useState } from "react";
import { create } from "../../services/task.service";
import { getAll as getAllCategories } from "../../services/category.service";
import { getAll as getAllTags } from "../../services/tag.service";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Form.css";
import Swal from "sweetalert2";
import Select from "react-select";

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
        try {
            const catRes = await getAllCategories();
            const tagRes = await getAllTags();

            setCategories(catRes.data || []);
            setTags(tagRes.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const tagOptions = tags.map(tag => ({
        value: tag.id,
        label: tag.name,
        color: tag.color
    }));

    const customStyles = {
        multiValue: (styles, { data }) => ({
            ...styles,
            backgroundColor: data.color + "20", 
            borderRadius: 20
        }),
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
            fontWeight: 500
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                color: "white"
            }
        }),
        option: (styles, { data, isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isSelected
                ? data.color
                : isFocused
                ? data.color + "10"
                : "white",
            color: isSelected ? "white" : data.color,
            cursor: "pointer"
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            description,
            category_id: categoryId,
            tags: selectedTags.map(tag => tag.value),
            status: false
        };

            await create(data);
            Swal.fire({
                title: "Correcto",
                text: "Tarea creada correctamente",
                icon: "success"
            });
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

                        <Select options={tagOptions}
                            isMulti
                            value={selectedTags}
                            onChange={setSelectedTags}
                            placeholder="Seleccionar etiquetas..."
                            closeMenuOnSelect={false}
                            styles={customStyles}
                        />
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


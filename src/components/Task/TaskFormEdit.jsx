import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne, update } from "../../services/task.service";
import { getAll as getAllCategories } from "../../services/category.service";
import { getAll as getAllTags } from "../../services/tag.service";
import "../../assets/styles/Form.css";
import Swal from "sweetalert2";
import Select from "react-select";

function TaskFormEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    category_id: "",
    tags: [],
    status: false
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOne(id);
        const taskData = response.data;

        setTask({
          title: taskData.title || "",
          description: taskData.description || "",
          category_id: taskData.category_id || "",
          tags: taskData.tags ? taskData.tags.map(tag => tag.id) : [],
          status: taskData.status ?? false
        });

        const catData = await getAllCategories();
        setCategories(catData.data || []);

        const tagData = await getAllTags();
        setTags(tagData.data || []);

      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setTask({ ...task, [name]: checked });
    } else if (name === "category_id") {
      setTask({ ...task, category_id: parseInt(value) });
    } else {
      setTask({ ...task, [name]: value });
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
    try {
      await update(id, task);
      Swal.fire({
        title: "Correcto",
        text: "Tarea modificada correctamente",
        icon: "success"
      });
      navigate("/tasks");
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
        <h2>EDITAR TAREA</h2>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input name="title" value={task.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <input name="description" value={task.description} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <select name="category_id" value={task.category_id} onChange={handleChange} required className="form-select">
              <option value="">Seleccione una categoría</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}> {cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Etiquetas</label>

            <Select options={tagOptions}
              isMulti
              placeholder="Seleccionar etiquetas..."
              closeMenuOnSelect={false}
              styles={customStyles}
              value={tagOptions.filter(option =>
                task.tags.includes(option.value)
              )}
              onChange={(selected) =>
                setTask({
                  ...task,
                  tags: selected ? selected.map(tag => tag.value) : []
                })
              }
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="status" checked={task.status} onChange={handleChange} /> Completada
            </label>
          </div>

          <div className="form-buttons">
            <button type="button" className="btn-cancel" onClick={() => navigate("/tasks")}>
              Cancelar
            </button>

            <button type="submit" className="btn-submit">
              Actualizar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default TaskFormEdit;

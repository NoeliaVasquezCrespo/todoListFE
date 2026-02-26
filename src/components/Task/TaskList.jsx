import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import { getAll, remove } from "../../services/task.service";
import "../../assets/styles/List.css";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Task.css";
import { FcOk, FcHighPriority } from "react-icons/fc";
import Swal from "sweetalert2";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getAll();
      setTasks(response.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar tarea?",
      text: "Esta tarea será eliminada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        await remove(id);
        setTasks(tasks.filter(task => task.id !== id));

        Swal.fire({
          title: "Correcto",
          text: "La tarea fue eliminada correctamente.",
          icon: "success"
        });

      } catch (err) {
        Swal.fire({
          title: "Error",
          text: err.message || "No se pudo eliminar la tarea",
          icon: "error"
        });
      }
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="title">Lista de Tareas</h2>

      <button
        className="create-btn"
        onClick={() => navigate("/tasks/create")}
      > <FaPlusCircle /> Agregar nueva tarea </button>

      <table className="table">
        <thead>
          <tr>
            <th>Estado</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoria</th>
            <th>Etiquetas</th>
            <th>Opciones</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <span
                  className={`status-icon ${task.status ? "completed" : "pending" }`}>
                  {task.status ? <FcOk />: <FcHighPriority />}
                </span>
              </td>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                {task.category?.name || "Sin categoría"}
              </td>
              <td>
                {task.tags?.map(tag => (
                  <span
                    key={tag.id}
                    className="tag"
                    style={{ backgroundColor: tag.color || "#ccc" }}
                  >
                    {tag.name}
                  </span>
                ))}
              </td>

              <td>
                <div className="actions-container">
                  <button className="action-btn btn-view" onClick={() => navigate(`/tasks/${task.id}`)}>
                    <FaEye size={16} />
                  </button>

                  <button className="action-btn btn-edit"  onClick={() => navigate(`/tasks/edit/${task.id}`)}>
                    <FaEdit size={16} />
                  </button>

                  <button className="action-btn btn-delete" onClick={() => handleDelete(task.id)}>
                    <FaTrash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;

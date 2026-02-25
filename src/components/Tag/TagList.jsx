import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import { getAll, remove } from "../../services/tag.service";
import "../../assets/styles/List.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function TagList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    loadtags();
  }, []);

  const loadtags = async () => {
    try {
      const response = await getAll();
      setTags(response.tags);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar etiqueta?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!result.isConfirmed) return;
    try {
      await remove(id);
      setTags(tags.filter(t => t.id !== id));
      Swal.fire({
        title: "Correcto",
        text: "La etiqueta fue eliminada correctamente",
        icon: "success"
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err.message || "No se pudo eliminar la etiqueta",
        icon: "error"
      });
    }
  };

  return (
    <div className="container">
      <h2 className="title">Lista de Etiquetas</h2>

      <button
        className="create-btn"
        onClick={() => navigate("/tags/create")}
      > <FaPlusCircle /> Agregar nueva etiqueta </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Color</th>
            <th>Opciones</th>
          </tr>
        </thead>

        <tbody>
          {tags.map(({ id, name, description, color }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{description}</td>

              <td>
                <span
                  className="color-box"
                  style={{ backgroundColor: color }}
                />
              </td>

              <td>
                <div className="actions-container">
                  <button className="action-btn btn-view" onClick={() => navigate(`/tags/${id}`)}>
                    <FaEye size={16} />
                  </button>

                  <button className="action-btn btn-edit" onClick={() => navigate(`/tags/edit/${id}`)}>
                    <FaEdit size={16} />
                  </button>

                  <button className="action-btn btn-delete" onClick={() => handleDelete(id)}>
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

export default TagList;

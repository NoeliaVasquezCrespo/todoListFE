import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaPlusCircle  } from "react-icons/fa";
import { getAll, remove } from "../../services/category.service";
import "../../assets/styles/List.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    loadCategories();
  }, [page]);

  const loadCategories = async () => {
    try {
      const response = await getAll(page);
      setCategories(response.data);
      setLastPage(response.last_page);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar categoría?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!result.isConfirmed) return;

    try {
      await remove(id);

      setCategories(categories.filter(c => c.id !== id));

      Swal.fire({
        title: "Correcto",
        text: "La categoría fue eliminada correctamente",
        icon: "success"
      });

    } catch (err) {
      console.error(err);

      Swal.fire({
        title: "Error",
        text: err.message || "No se pudo eliminar la categoría",
        icon: "error"
      });
    }
  };

  return (
    <div className="container">
      <h2 className="title">Lista de Categorías</h2>

      <button
        className="create-btn"
        onClick={() => navigate("/categories/create")}
      > <FaPlusCircle /> Agregar nueva categoría </button>

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
          {categories.map(({ id, name, description, color }) => (
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
                  <button className="action-btn btn-view"  onClick={() => navigate(`/categories/${id}`)}>
                    <FaEye size={16} />
                  </button>

                  <button className="action-btn btn-edit" onClick={() => navigate(`/categories/edit/${id}`)}>
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
     <div className="pagination">
        <button disabled={page === 1}  onClick={() => setPage(prev => prev - 1)}>
          Anterior
        </button>

        <span>Página {page} de {lastPage}</span>

        <button disabled={page === lastPage} onClick={() => setPage(prev => prev + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default CategoryList;

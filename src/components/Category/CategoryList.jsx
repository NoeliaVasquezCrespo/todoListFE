import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaPlusCircle  } from "react-icons/fa";
import { getAllCategories } from "../../services/category.service";
import "../../assets/styles/List.css";
import { useNavigate } from "react-router-dom";


function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.categories);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="category-container">
      <h2 className="category-title">Lista de Categorías</h2>

      <button
        className="create-btn"
        onClick={() => navigate("/categories/create")}
      > <FaPlusCircle /> Agregar nueva categoría </button>

      <table className="category-table">
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
                  className="category-color-box"
                  style={{ backgroundColor: color }}
                />
              </td>

              <td>
                <div className="actions-container">
                  <button className="action-btn btn-view">
                    <FaEye size={16} />
                  </button>

                  <button className="action-btn btn-edit">
                    <FaEdit size={16} />
                  </button>

                  <button className="action-btn btn-delete">
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

export default CategoryList;

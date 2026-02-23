import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { getAllCategories } from "../services/category.service";
import "./CategoryList.css";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then(res => setCategories(res.categories))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="category-container">
      <h2 className="category-title">Lista de Categorías</h2>

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

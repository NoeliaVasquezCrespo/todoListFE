import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { getAll } from "./services/task.service";
import CategoryList from "./components/Category/CategoryList";
import CategoryForm from "./components/Category/CategoryForm";
import CategoryShow from "./components/Category/CategoryShow";

function App() {
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAll();
        console.log("Lista de tareas:", data);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/categories" />} />
        <Route path="/tasks" />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/create" element={<CategoryForm />} />
        <Route path="/categories/:id" element={<CategoryShow />} />
        <Route path="/tags" />
      </Routes>
    </div>
  );
}

export default App;
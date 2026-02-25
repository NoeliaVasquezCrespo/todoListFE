import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { getAll } from "./services/task.service";
import CategoryList from "./components/Category/CategoryList";
import CategoryForm from "./components/Category/CategoryForm";
import CategoryShow from "./components/Category/CategoryShow";

import TagList from "./components/Tag/TagList";
import TagForm from "./components/Tag/TagForm";
import TagShow from "./components/Tag/TagShow";

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
        <Route path="/categories/edit/:id" element={<CategoryForm />} />
        <Route path="/categories/:id" element={<CategoryShow />} />

        <Route path="/tags" element={<TagList />} />
        <Route path="/tags/create" element={<TagForm />} />
        <Route path="/tags/edit/:id" element={<TagForm />} />
        <Route path="/tags/:id" element={<TagShow />} />
      </Routes>
    </div>
  );
}

export default App;
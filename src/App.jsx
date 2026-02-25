import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import TaskList from "./components/Task/TaskList";
import TaskForm from "./components/Task/TaskForm";

import CategoryList from "./components/Category/CategoryList";
import CategoryForm from "./components/Category/CategoryForm";
import CategoryShow from "./components/Category/CategoryShow";

import TagList from "./components/Tag/TagList";
import TagForm from "./components/Tag/TagForm";
import TagShow from "./components/Tag/TagShow";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/categories" />} />
        
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/create" element={<TaskForm />} />

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
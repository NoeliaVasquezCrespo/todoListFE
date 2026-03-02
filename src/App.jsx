import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ProtectedRoute from "./components/Login/ProtectedRoute";

import TaskList from "./components/Task/TaskList";
import TaskForm from "./components/Task/TaskForm";
import TaskShow from "./components/Task/TaskShow";
import TaskFormEdit from "./components/Task/TaskFormEdit";

import CategoryList from "./components/Category/CategoryList";
import CategoryForm from "./components/Category/CategoryForm";
import CategoryShow from "./components/Category/CategoryShow";

import TagList from "./components/Tag/TagList";
import TagForm from "./components/Tag/TagForm";
import TagShow from "./components/Tag/TagShow";

import Login from "./components/Login/Login";

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return (
    <div>
      {token && location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={token ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/tasks"
          element={
            <ProtectedRoute> <TaskList /> </ProtectedRoute>
          }
        />
        <Route path="/tasks/create"
          element={
            <ProtectedRoute> <TaskForm /> </ProtectedRoute>
          }
        />
        <Route path="/tasks/edit/:id"
          element={
            <ProtectedRoute> <TaskFormEdit /> </ProtectedRoute>
          }
        />
        <Route path="/tasks/:id"
          element={
            <ProtectedRoute> <TaskShow /> </ProtectedRoute>
          }
        />

        <Route path="/categories"
          element={
            <ProtectedRoute> <CategoryList /> </ProtectedRoute>
          }
        />
        <Route path="/categories/create"
          element={
            <ProtectedRoute> <CategoryForm /> </ProtectedRoute>
          }
        />
        <Route path="/categories/edit/:id"
          element={
            <ProtectedRoute> <CategoryForm /> </ProtectedRoute>
          }
        />
        <Route path="/categories/:id"
          element={
            <ProtectedRoute> <CategoryShow /> </ProtectedRoute>
          }
        />
        <Route path="/tags"
          element={
            <ProtectedRoute> <TagList /> </ProtectedRoute>
          }
        />
        <Route path="/tags/create"
          element={
            <ProtectedRoute> <TagForm /> </ProtectedRoute>
          }
        />
        <Route path="/tags/edit/:id"
          element={
            <ProtectedRoute> <TagForm /> </ProtectedRoute>
          }
        />
        <Route path="/tags/:id"
          element={
            <ProtectedRoute> <TagShow /> </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
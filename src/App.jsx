import React, { useEffect } from "react";
import { getAll } from "./services/tarea.service";

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

  return <h1>Tareas</h1>;
}

export default App;
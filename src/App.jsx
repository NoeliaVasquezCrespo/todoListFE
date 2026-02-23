import React, { useEffect } from "react";
import { getAll } from "./services/task.service";
import CategoryList from "./components/CategoryList";

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
      <CategoryList />
    </div>
  )
}

export default App;
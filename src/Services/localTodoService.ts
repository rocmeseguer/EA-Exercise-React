import { useState } from "react";
import { ITodo } from "../Model/Todo";

// Servicio que encapsula la lógica de tareas
export const useLocalTodoService = () => {

  // Guardamos los datos en un Array local
  const [tasks, setTasks] = useState<ITodo[]>([]);

  // Generar un ID de tarea basado en la marca de tiempo actual
  const getCurrentTimestamp = (): number => new Date().getTime();

  // Agregar una nueva tarea
  const addANewTask = (task: ITodo): void =>
    setTasks([
      ...tasks,
      { ...task, completed: false, id: getCurrentTimestamp() },
    ]);

  // Eliminar una tarea por ID
  const deleteATask = (id: number): void =>
    setTasks(tasks.filter((task) => task.id !== id));

  return {
    tasks,
    addANewTask,
    deleteATask,
  };
};

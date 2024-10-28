import { ITodo } from "../Model/Todo";
import { BiSolidTrash } from "react-icons/bi";

interface Props {
  task: ITodo;
  deleteATask?: (id: number) => void;
}

export const TaskCard = ({ task, deleteATask }: Props) => (
  <div className="w3-card">
    <div className="w3-panel">
      <h3>{task.title}</h3>
      <p>ID: {task.id}</p>
      <p>Completed: {task.completed?.toString()}</p>
      <p>{task.description}</p>

      {/* Renderiza el botón solo si deleteATask está definido */}
      { deleteATask && (
      <button
        className="w3-button w3-red"
        onClick={() => task.id && deleteATask && deleteATask(task.id)}
      >
        Delete <BiSolidTrash />
      </button>
      )}
      <p></p>
    </div>
  </div>
);

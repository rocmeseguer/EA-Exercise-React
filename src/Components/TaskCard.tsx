import { ITodo } from "../Model/Todo";
import { BiSolidTrash } from "react-icons/bi";

interface Props {
  task: ITodo;
  deleteATask?: (id: number) => void;
}

export const TaskCard = ({ task, deleteATask }: Props) => (
  <div className="box">
    <div className="content">
      <h3 className="title is-4">{task.title}</h3>
      <p>ID: {task.id}</p>
      <p>Completed: {task.completed?.toString()}</p>
      <p>{task.description}</p>

      {/* Renderiza el botón solo si deleteATask está definido */}
      {deleteATask && (
        <button
          className="button is-danger"
          onClick={() => task.id && deleteATask && deleteATask(task.id)}
        >
          Delete <BiSolidTrash />
        </button>
      )}
    </div>
  </div>
);


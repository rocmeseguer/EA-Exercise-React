import { ITodo } from "../Model/Todo";

interface Props {
  task: ITodo;
  deleteATask?: (id: number) => void;
}

export const TaskCard = ({ task, deleteATask }: Props) => (
  <div className="card card-body bg-secondary rounded-0">
    <h3>{task.title}</h3>
    <p>ID: {task.id}</p>
    <p>Completed: {task.completed?.toString()}</p>
    <p>{task.description}</p>
    

    {/* Renderiza el botón solo si deleteATask está definido */}
    { deleteATask && (
    <button
      className="btn btn-danger btn-block"
      onClick={() => task.id && deleteATask && deleteATask(task.id)}
    >
      Delete
    </button>
    )}
  </div>
);

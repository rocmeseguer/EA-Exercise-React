import { ITodo } from "../Model/Todo";
import { BiSolidTrash, BiEdit } from "react-icons/bi";

interface Props {
  task: ITodo;
  deleteATask?: (id: number) => void;
  editATask?: (task: ITodo) => void;
}

export const TaskCard = ({ task, deleteATask, editATask }: Props) => (
  <div className="box">
    <div className="content">
      <h3 className="title is-4">{task.title}</h3>
      <p>ID: {task.id}</p>
      <p>Completed: {task.completed?.toString()}</p>
      <p>{task.description}</p>

      <div className="buttons">
        {editATask && (
          <button
            className="button is-info"
            onClick={() => editATask({ ...task, completed: !task.completed })}
          >
            Complete <BiEdit />
          </button>
        )}
        {deleteATask && (
          <button
            className="button is-danger"
            onClick={() => task.id && deleteATask(task.id)}
          >
            Delete <BiSolidTrash />
          </button>
        )}
      </div>
    </div>
  </div>
);


import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { ITodo } from "../Model/Todo";
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  addANewTask: (task: ITodo) => void;
}

type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const inititalState = {
  title: "",
  description: "",
  completed: false
};

export const TaskForm = ({ addANewTask }: Props) => {
  const [task, setTask] = useState<ITodo>(inititalState);
  const titleInput = useRef<HTMLInputElement>(null);

  const handleNewTask = (e: FormEvent<HTMLFormElement>): any => {
    e.preventDefault();
    addANewTask(task);
    setTask(inititalState);
    titleInput.current?.focus();
  };

  const handleInputChange = ({ target: { name, value } }: HandleInputChange) =>
    setTask({ ...task, [name]: value });

  return (
    <div className="box">
      <h1 className="title is-4">Add a Task</h1>
      <form onSubmit={handleNewTask}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              placeholder="Write a Title"
              name="title"
              onChange={handleInputChange}
              value={task.title}
              className="input"
              autoFocus
              ref={titleInput}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              onChange={handleInputChange}
              name="description"
              className="textarea"
              placeholder="Write a Description"
              value={task.description}
            ></textarea>
          </div>
        </div>

        <div className="control">
          <button type="submit" className="button is-black">
            Save <AiOutlinePlus />
          </button>
        </div>
      </form>
    </div>
  );
};

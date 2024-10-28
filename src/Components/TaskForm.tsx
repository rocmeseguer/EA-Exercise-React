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
    <div className="w3-card">
      <div className=" w3-panel">
        <h1>Add a Task</h1>

        <form onSubmit={handleNewTask}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Write a Title"
            name="title"
            onChange={handleInputChange}
            value={task.title}
            className="w3-input"
            autoFocus
            ref={titleInput}
          />
          <p></p>
          <label>Description</label>
          <textarea
            onChange={handleInputChange}
            name="description"
            className="w3-input"
            placeholder="Write a Description"
            value={task.description}
          ></textarea>
          <p></p>
          <button type="submit" className="w3-button w3-black">
            Save <AiOutlinePlus />
          </button>
          <p></p>
        </form>
      </div>
    </div>
  );
};

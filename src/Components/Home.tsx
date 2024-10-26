import React from 'react';
import { useLocalTodoService } from '../Services/localTodoService';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';


export const Home: React.FC = () => {
    const { tasks, addANewTask, deleteATask } = useLocalTodoService();

    return (
        <div>
            <h2>Home</h2>
            <div className="containerFlex">
                <div className="column">
                    <TaskForm addANewTask={addANewTask} />
                </div>
                <div className="column">
                    <TaskList tasks={tasks} deleteATask={deleteATask} />
                </div>
            </div>
        </div>
    );
  }

export default Home;
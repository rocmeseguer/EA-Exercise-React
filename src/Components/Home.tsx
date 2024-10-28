import React from 'react';
import { useLocalTodoService } from '../Services/localTodoService';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';


export const Home: React.FC = () => {
    const { tasks, addANewTask, deleteATask } = useLocalTodoService();

    return (
        <div>
            <h2>Home</h2>
            <div className="w3-row">
                <div className="w3-col s6">
                    <TaskForm addANewTask={addANewTask} />
                </div>
                <div className="w3-col s6">
                    <TaskList tasks={tasks} deleteATask={deleteATask} />
                </div>
            </div>
        </div>
    );
  }

export default Home;
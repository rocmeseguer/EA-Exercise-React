import React from 'react';
import { useLocalTodoService } from '../Services/localTodoService';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';


export const Home: React.FC = () => {
    const { tasks, addANewTask, deleteATask, editATask } = useLocalTodoService();

    return (
        <div className="container">
            <h2 className="title is-3">Home</h2>
            <div className="columns">
                <div className="column is-one-thirds">
                    <TaskForm addANewTask={addANewTask} />
                </div>
                <div className="column">
                    <TaskList 
                        tasks={tasks} 
                        deleteATask={deleteATask} 
                        editATask={editATask}
                    />
                </div>
            </div>
        </div>
    );
  }

export default Home;
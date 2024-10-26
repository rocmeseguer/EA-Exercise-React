
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getTodoById } from '../Services/todoService';
import { TaskCard } from "./TaskCard";

import { ITodo } from '../Model/Todo';

export const Item: React.FC = () => { 
    const { id } = useParams<{ id: string }>();
    const [todo, setTodo] = useState<ITodo>();

    // Función para obtener los datos del Todo
    const fetchTodo = async () => {
        if (id) {
            const getTodo = await getTodoById(id);
            setTodo(getTodo);
        }
    };

    useEffect( () => {
        fetchTodo();
    }, [id])

    return (
        <div>
            {todo && <TaskCard task={todo} />}
        </div>

    );
  }

export default Item;
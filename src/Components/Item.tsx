import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { getTodoById } from '../Services/todoService';
import { TaskCard } from "./TaskCard";
import { ITodo } from '../Model/Todo';

export const Item: React.FC = () => { 
    const { id } = useParams<{ id: string }>();
    const [todo, setTodo] = useState<ITodo>();

    const fetchTodo = useCallback(async () => {
        if (id) {
            const getTodo = await getTodoById(id);
            setTodo(getTodo);
        }
    }, [id]);

    useEffect( () => {
        fetchTodo();
    }, [fetchTodo])

    return (
        <div>
            {todo && <TaskCard task={todo} />}
        </div>

    );
  }

export default Item;
import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ITodo } from '../Model/Todo';
import { getAllTodos } from '../Services/todoService';

type InputChange = ChangeEvent<HTMLInputElement>;

export const Items: React.FC = () => {

    const [todos, setTodos] = useState<ITodo[]>([])
    const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([])

    const fetchTodos = async () => {
        const getTodos = await getAllTodos();
        setTodos(getTodos);
        setFilteredTodos(getTodos);
    };


    useEffect( () => {
        fetchTodos();
    }, [])

    const handleInputChange = (e: InputChange) => {
        e.preventDefault();
        setFilteredTodos(
            todos.filter(function(item) {
                return item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
                }
            )
        )
    }

    return (
        <div>
            <h2>Items</h2>
            <div className="w3-panel">
                <h3>Filter</h3>
                <form>
                    <input 
                        type="text" 
                        name="filter"
                        onChange={handleInputChange}
                        autoFocus
                    >
                    </input>
                </form>
            </div>

            <div className="w3-panel">
                <ul className="w3-ul w3-border">
                { filteredTodos.map ( todo => {
                    return <li>
                        <Link  to={`/items/${todo.id}`} > { todo.title } </Link>
                    </li>
                    }
                )}
                </ul>
            </div>
        </div>

    );
  }

  export default Items;
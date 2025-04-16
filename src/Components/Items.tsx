import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
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
        <div className="container">
            <h2 className="title is-3">Items</h2>
            <div className="field">
                <label className="label">Filter</label>
                <div className="control">
                    <input 
                        className="input" 
                        type="text" 
                        name="filter"
                        onChange={handleInputChange}
                        autoFocus
                    />
                </div>
            </div>

            <div className="panel">
                <p className="panel-heading">Todos</p>
                <ul className="list">
                    {filteredTodos.map(todo => (
                        <li key={todo.id} className="panel-block">
                            <Link to={`/items/${todo.id}`} className="has-text-link">{todo.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
  }

  export default Items;
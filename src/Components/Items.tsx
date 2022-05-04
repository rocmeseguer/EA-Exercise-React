import './Items.css';

import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ITodo } from '../Model/Todo';

type InputChange = ChangeEvent<HTMLInputElement>;

function Items() {

    const [todos, setTodos] = useState<ITodo[]>([])
    const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([])

    const getData = async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodos(res.data);
        setFilteredTodos(res.data);
    }

    useEffect( () => {
        getData();
    }, [])

    const handleInputChange = (e: InputChange) => {
        e.preventDefault();
        console.log(e.target.name, e.target.value );
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

            <ul>
            { filteredTodos.map ( todo => {
                return <li>
                    <Link  to={`/items/${todo.id}`} > { todo.title } </Link>
                </li>
                }
            )}
            </ul>
        </div>

    );
  }

  export default Items;
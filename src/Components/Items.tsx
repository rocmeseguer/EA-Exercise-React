import './Items.css';

import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ITodo } from '../Model/Todo';

function Items() {

    const [todos, setTodos] = useState<ITodo[]>([])

    const getData = async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodos(res.data);
    }

    useEffect( () => {
        getData();
    }, [])

    return (
        <div>
            <h2>Items</h2>
            <ul>
            { todos.map ( todo => {
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
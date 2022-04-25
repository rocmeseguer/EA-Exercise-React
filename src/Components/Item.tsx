
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import { ITodo } from '../Model/Todo';

function Item() {
    const { id } = useParams();

    const [todo, setTodo] = useState<ITodo>()

    const getData = async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos/' + id);
        setTodo(res.data);
        console.log(res.data)
    }

    useEffect( () => {
        getData();
    }, [])

    return (
        <div>
            <h2>Item ID: { id } </h2>

            <div>Title: { todo?.title }</div>

            <div>Completed: { todo?.completed }</div>
        
        </div>

    );
  }

  export default Item;
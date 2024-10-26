import axios from 'axios';
import { ITodo } from '../Model/Todo';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Función para obtener un Todo por ID
export const getTodoById = async (id: string): Promise<ITodo> => {
  const res = await axios.get<ITodo>(`${API_URL}/${id}`);
  return res.data;
};

// Función para obtener todos los Todo
export const getAllTodos = async (): Promise<ITodo[]> => {
    const res = await axios.get<ITodo[]>(`${API_URL}`);
    return res.data;
}
import { Link } from 'react-router-dom';
import { Todo } from '../../models/todo.model';
import { EmptyState } from '../common/EmptyState';

interface TodoLinkListProps {
  todos: readonly Todo[];
  /** Texto de búsqueda actual, para personalizar el mensaje de "sin resultados". */
  query: string;
}

/** Listado compacto de tareas con enlace a su detalle (`/items/:id`). */
export const TodoLinkList = ({ todos, query }: TodoLinkListProps): JSX.Element => {
  if (todos.length === 0) {
    return (
      <EmptyState
        title={query.trim() === '' ? 'No hay tareas' : `Ninguna tarea coincide con "${query}"`}
        description="Prueba con otro texto de búsqueda o crea una tarea desde Inicio."
      />
    );
  }

  return (
    <ul className="menu w-full rounded-box bg-base-100 p-2 shadow-md">
      {todos.map(
        (todo: Todo): JSX.Element => (
          <li key={todo.id}>
            <Link to={`/items/${todo.id}`} className="flex justify-between">
              <span className={todo.completed ? 'line-through opacity-60' : ''}>{todo.title}</span>
              <span className={`badge badge-sm ${todo.completed ? 'badge-success' : 'badge-ghost'}`}>
                {todo.completed ? 'Hecha' : 'Pendiente'}
              </span>
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};

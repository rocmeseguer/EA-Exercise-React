import { BiTaskX } from 'react-icons/bi';
import { Todo, TodoId } from '../../models/todo.model';
import { EmptyState } from '../common/EmptyState';
import { TodoCard } from './TodoCard';

interface TodoListProps {
  todos: readonly Todo[];
  isPending: (id: TodoId) => boolean;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

/**
 * Lista presentacional: transforma datos en elementos con `map` (función pura).
 *
 * La `key` va en el elemento MÁS EXTERNO que devuelve el `map` (aquí el `<li>`)
 * y debe ser un identificador ESTABLE y ÚNICO (el id de la BD), nunca el índice:
 * así React sabe qué elemento es cuál entre renders y puede insertar/eliminar
 * nodos del DOM de forma mínima y correcta.
 */
export const TodoList = ({ todos, isPending, onToggle, onDelete }: TodoListProps): JSX.Element => {
  if (todos.length === 0) {
    return (
      <EmptyState
        title="Todavía no hay tareas"
        description="Crea la primera con el formulario."
        icon={<BiTaskX className="h-16 w-16" aria-hidden="true" />}
      />
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {todos.map(
        (todo: Todo): JSX.Element => (
          <li key={todo.id}>
            <TodoCard
              todo={todo}
              isPending={isPending(todo.id)}
              onToggle={onToggle}
              onDelete={onDelete}
              detailPath={`/items/${todo.id}`}
            />
          </li>
        ),
      )}
    </ul>
  );
};

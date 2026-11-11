import { BiRefresh } from 'react-icons/bi';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { Spinner } from '../components/common/Spinner';
import { PageHeader } from '../components/layout/PageHeader';
import { TodoFilter } from '../components/todos/TodoFilter';
import { TodoLinkList } from '../components/todos/TodoLinkList';
import { useTodoFilter } from '../controllers/useTodoFilter';
import { useTodos } from '../controllers/useTodos';

/**
 * Vista "/items": listado filtrable. Reutiliza el MISMO estado global que Home
 * (si ya se cargó allí, aquí no se repite la petición).
 * El texto del filtro es estado LOCAL (`useTodoFilter`).
 */
export const ItemsPage = (): JSX.Element => {
  const { todos, status, error, reload } = useTodos();
  const { query, filteredTodos, handleQueryChange } = useTodoFilter(todos);
  const isLoading: boolean = status === 'idle' || status === 'loading';

  return (
    <section className="flex flex-col gap-4">
      <PageHeader
        title="Mis tareas"
        subtitle={`${filteredTodos.length} de ${todos.length} tareas`}
        actions={
          <button type="button" className="btn btn-outline btn-sm" onClick={(): void => void reload()} disabled={isLoading}>
            <BiRefresh aria-hidden="true" /> Recargar
          </button>
        }
      />
      <TodoFilter value={query} onChange={handleQueryChange} />

      {isLoading && <Spinner message="Cargando tareas..." />}
      {status === 'error' && <ErrorAlert message={error ?? 'Error desconocido.'} onRetry={(): void => void reload()} />}
      {status === 'success' && <TodoLinkList todos={filteredTodos} query={query} />}
    </section>
  );
};

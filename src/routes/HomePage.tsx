import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { PageHeader } from '../components/layout/PageHeader';
import { TodoForm } from '../components/todos/TodoForm';
import { TodoList } from '../components/todos/TodoList';
import { TodoListSkeleton } from '../components/todos/TodoListSkeleton';
import { TodoStats } from '../components/todos/TodoStats';
import { useConfirmDelete } from '../controllers/useConfirmDelete';
import { useTodoMutations } from '../controllers/useTodoMutations';
import { useTodos } from '../controllers/useTodos';
import { Todo } from '../models/todo.model';

/**
 * Vista "/" (contenedor). Obtiene datos y acciones de los controllers y decide
 * QUÉ pintar según el ciclo de vida de la petición: Cargando, Error o Éxito.
 * No contiene ni un solo `fetch`: eso es cosa de la capa de servicios.
 */
export const HomePage = (): JSX.Element => {
  const { todos, status, error, reload, isPending } = useTodos();
  const { addTodo, toggleTodo, removeTodo } = useTodoMutations();
  const confirmDelete = useConfirmDelete();

  // Los controllers devuelven promesas; la vista las lanza sin esperar ("fire and forget")
  // porque el feedback (toast, estado pendiente) ya lo gestiona el controller.
  const handleToggle = (todo: Todo): void => void toggleTodo(todo);
  const handleConfirmDelete = (): void => confirmDelete.confirm((todo: Todo): void => void removeTodo(todo.id));

  /** Renderizado condicional del panel derecho según `status`. */
  const renderTodos = (): JSX.Element => {
    if (status === 'idle' || status === 'loading') return <TodoListSkeleton />;
    if (status === 'error') {
      return <ErrorAlert message={error ?? 'Error desconocido.'} onRetry={(): void => void reload()} />;
    }
    return (
      <div className="flex flex-col gap-4">
        <TodoStats todos={todos} />
        <TodoList todos={todos} isPending={isPending} onToggle={handleToggle} onDelete={confirmDelete.requestDelete} />
      </div>
    );
  };

  return (
    <section>
      <PageHeader title="Inicio" subtitle="Crea, completa y elimina tareas sincronizadas con la API REST." />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <TodoForm onSubmit={addTodo} />
        </div>
        <div className="lg:col-span-2">{renderTodos()}</div>
      </div>

      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        title="Eliminar tarea"
        message={`¿Seguro que quieres eliminar "${confirmDelete.candidate?.title ?? ''}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={confirmDelete.cancel}
      />
    </section>
  );
};

import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { Spinner } from '../components/common/Spinner';
import { PageHeader } from '../components/layout/PageHeader';
import { TodoCard } from '../components/todos/TodoCard';
import { useConfirmDelete } from '../controllers/useConfirmDelete';
import { useTodoDetail } from '../controllers/useTodoDetail';

/**
 * Vista "/items/:id". El parámetro `:id` de la URL es la "fuente de verdad" de
 * qué tarea mostrar, así la vista funciona también al recargar o compartir el enlace.
 */
export const ItemDetailPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { todo, isLoading, error, isPending, toggle, remove } = useTodoDetail(id);
  const confirmDelete = useConfirmDelete();

  const handleConfirmDelete = (): void =>
    confirmDelete.confirm((): void => {
      void remove().then((deleted: boolean): void => {
        // Tras borrar en el servidor, el recurso ya no existe: volvemos al listado.
        if (deleted) navigate('/items', { replace: true });
      });
    });

  return (
    <section className="flex max-w-2xl flex-col gap-4">
      <Link to="/items" className="btn btn-ghost btn-sm w-fit">
        <BiArrowBack aria-hidden="true" /> Volver al listado
      </Link>
      <PageHeader title="Detalle de la tarea" subtitle={`GET /todos/${id ?? ''}`} />

      {isLoading && <Spinner message="Cargando tarea..." />}
      {error !== null && <ErrorAlert message={error} />}
      {todo !== null && (
        <TodoCard
          todo={todo}
          isPending={isPending}
          onToggle={(): void => void toggle()}
          onDelete={confirmDelete.requestDelete}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        title="Eliminar tarea"
        message={`¿Seguro que quieres eliminar "${confirmDelete.candidate?.title ?? ''}"?`}
        confirmLabel="Eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={confirmDelete.cancel}
      />
    </section>
  );
};

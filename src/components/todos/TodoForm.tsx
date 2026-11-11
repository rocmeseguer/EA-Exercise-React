import { BiPlus } from 'react-icons/bi';
import { useTodoForm } from '../../controllers/useTodoForm';
import { Todo, TodoFormValues } from '../../models/todo.model';

interface TodoFormProps {
  /** Acción a ejecutar al enviar. El formulario no sabe que hay una API detrás. */
  onSubmit: (values: TodoFormValues) => Promise<Todo | null>;
}

/** Formulario de alta. Su estado (valores de los inputs) es LOCAL: ver `useTodoForm`. */
export const TodoForm = ({ onSubmit }: TodoFormProps): JSX.Element => {
  const { values, isSubmitting, canSubmit, titleRef, handleChange, handleSubmit } = useTodoForm(onSubmit);

  return (
    <form
      className="card bg-base-100 shadow-md"
      onSubmit={(event): void => void handleSubmit(event)}
      aria-busy={isSubmitting}
    >
      <div className="card-body gap-4">
        <h2 className="card-title">Nueva tarea</h2>

        <label className="form-control w-full">
          <span className="label-text mb-1 font-medium">Título *</span>
          <input
            ref={titleRef}
            type="text"
            name="title"
            placeholder="Escribe un título"
            className="input input-bordered w-full"
            value={values.title}
            onChange={handleChange}
            disabled={isSubmitting}
            autoFocus
            required
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1 font-medium">Descripción</span>
          <textarea
            name="description"
            placeholder="Escribe una descripción (opcional)"
            className="textarea textarea-bordered w-full"
            rows={3}
            value={values.description}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </label>

        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm" aria-hidden="true" />
            ) : (
              <BiPlus aria-hidden="true" />
            )}
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </form>
  );
};

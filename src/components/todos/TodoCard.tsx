import { BiCheckCircle, BiSolidTrash, BiUndo } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Todo } from '../../models/todo.model';

interface TodoCardProps {
  todo: Todo;
  /** `true` mientras hay una petición de escritura en curso sobre esta tarea. */
  isPending?: boolean;
  /** Callbacks opcionales: si no se pasan, el botón correspondiente no se pinta. */
  onToggle?: (todo: Todo) => void;
  onDelete?: (todo: Todo) => void;
  /** Si se indica, el título enlaza al detalle. */
  detailPath?: string;
}

/**
 * Tarjeta presentacional ("tonta"): todo lo que necesita llega por props, que
 * son de SOLO LECTURA. No modifica `todo`: notifica al padre mediante callbacks
 * (los datos bajan, los eventos suben).
 */
export const TodoCard = ({ todo, isPending = false, onToggle, onDelete, detailPath }: TodoCardProps): JSX.Element => (
  <article
    className={`card h-full border-l-4 bg-base-100 shadow-md transition-opacity ${
      todo.completed ? 'border-success' : 'border-warning'
    } ${isPending ? 'opacity-60' : ''}`}
    aria-busy={isPending}
  >
    <div className="card-body gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className={`card-title text-lg ${todo.completed ? 'line-through opacity-70' : ''}`}>
          {detailPath ? (
            <Link to={detailPath} className="link-hover link">
              {todo.title}
            </Link>
          ) : (
            todo.title
          )}
        </h3>
        <span className={`badge shrink-0 ${todo.completed ? 'badge-success' : 'badge-warning'}`}>
          {todo.completed ? 'Completada' : 'Pendiente'}
        </span>
      </div>

      <p className="text-sm text-base-content/70">{todo.description || 'Sin descripción.'}</p>
      <p className="font-mono text-xs text-base-content/40">ID: {todo.id}</p>

      {(onToggle || onDelete) && (
        <div className="card-actions justify-end">
          {onToggle && (
            <button
              type="button"
              className={`btn btn-sm ${todo.completed ? 'btn-ghost' : 'btn-success'}`}
              disabled={isPending}
              onClick={(): void => onToggle(todo)}
            >
              {todo.completed ? <BiUndo aria-hidden="true" /> : <BiCheckCircle aria-hidden="true" />}
              {todo.completed ? 'Reabrir' : 'Completar'}
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="btn btn-outline btn-error btn-sm"
              disabled={isPending}
              onClick={(): void => onDelete(todo)}
            >
              <BiSolidTrash aria-hidden="true" /> Eliminar
            </button>
          )}
        </div>
      )}
    </div>
  </article>
);

import { Todo } from '../../models/todo.model';

interface TodoStatsProps {
  todos: readonly Todo[];
}

/** Función pura: cuenta las tareas completadas sin modificar el array. */
export const countCompleted = (todos: readonly Todo[]): number =>
  todos.filter((todo: Todo): boolean => todo.completed).length;

/** Resumen numérico. Es un valor DERIVADO: se calcula en cada render, no se guarda en estado. */
export const TodoStats = ({ todos }: TodoStatsProps): JSX.Element => {
  const completed: number = countCompleted(todos);
  const pending: number = todos.length - completed;

  return (
    <div className="stats stats-horizontal w-full bg-base-100 shadow-md">
      <div className="stat">
        <div className="stat-title">Total</div>
        <div className="stat-value text-2xl">{todos.length}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Completadas</div>
        <div className="stat-value text-2xl text-success">{completed}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Pendientes</div>
        <div className="stat-value text-2xl text-warning">{pending}</div>
      </div>
    </div>
  );
};

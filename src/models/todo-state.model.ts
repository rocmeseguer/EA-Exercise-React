import { RequestStatus } from './api.model';
import { Todo, TodoId } from './todo.model';

/**
 * Forma del estado GLOBAL de tareas (gestionado con Context + useReducer).
 * Todo es `readonly`: el reducer siempre devuelve un objeto nuevo.
 */
export interface TodoState {
  readonly todos: readonly Todo[];
  /** Estado de la carga del listado (`GET /todos`). */
  readonly status: RequestStatus;
  readonly error: string | null;
  /** Ids de las tareas con una petición de escritura en curso (PATCH / DELETE). */
  readonly pendingIds: readonly TodoId[];
}

/**
 * Acciones que pueden modificar el estado global.
 *
 * Es una "unión discriminada" por la propiedad `type`: dentro de cada `case`
 * del reducer, TypeScript sabe exactamente qué `payload` hay disponible.
 *
 * Fíjate en que las acciones de escritura (`todo_added`, `todo_updated`,
 * `todo_removed`) se lanzan DESPUÉS de que el servidor confirme la operación:
 * el estado local es un reflejo fiel de la base de datos remota.
 */
export type TodoAction =
  | { type: 'fetch_todos_start' }
  | { type: 'fetch_todos_success'; payload: readonly Todo[] }
  | { type: 'fetch_todos_error'; payload: string }
  | { type: 'todo_added'; payload: Todo }
  | { type: 'todo_updated'; payload: Todo }
  | { type: 'todo_removed'; payload: TodoId }
  | { type: 'mutation_start'; payload: TodoId }
  | { type: 'mutation_end'; payload: TodoId };

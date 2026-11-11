import { Todo, TodoId } from '../models/todo.model';
import { TodoAction, TodoState } from '../models/todo-state.model';

export const initialTodoState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
  pendingIds: [],
};

/**
 * Reducer: función PURA `(estadoActual, acción) => estadoNuevo`.
 *
 * Reglas de oro:
 *  - No muta `state`: siempre devuelve un objeto nuevo (spread, map, filter).
 *  - No tiene efectos secundarios (nada de fetch, timers ni console.log).
 *  - Mismo input => mismo output. Por eso es trivial de testear y de depurar
 *    (ver `todo.reducer.test.ts`).
 */
export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'fetch_todos_start':
      return { ...state, status: 'loading', error: null };
    case 'fetch_todos_success':
      return { ...state, status: 'success', todos: action.payload };
    case 'fetch_todos_error':
      return { ...state, status: 'error', error: action.payload };

    // --- Sincronización tras una escritura CONFIRMADA por el servidor ---
    case 'todo_added':
      // Añadir: array nuevo con los elementos anteriores + el nuevo (nunca `push`).
      return { ...state, todos: [...state.todos, action.payload] };
    case 'todo_updated':
      // Modificar: `map` devuelve un array nuevo; solo se sustituye el elemento afectado.
      return {
        ...state,
        todos: state.todos.map((todo: Todo): Todo => (todo.id === action.payload.id ? action.payload : todo)),
      };
    case 'todo_removed':
      // Eliminar: `filter` devuelve un array nuevo sin el elemento (nunca `splice`).
      return { ...state, todos: state.todos.filter((todo: Todo): boolean => todo.id !== action.payload) };

    // --- Peticiones de escritura en curso (para deshabilitar botones) ---
    case 'mutation_start':
      return { ...state, pendingIds: [...state.pendingIds, action.payload] };
    case 'mutation_end':
      return { ...state, pendingIds: state.pendingIds.filter((id: TodoId): boolean => id !== action.payload) };

    default: {
      // Comprobación exhaustiva: si alguien añade una acción nueva a `TodoAction`
      // y olvida tratarla aquí, TypeScript dará un error de compilación.
      const unhandled: never = action;
      return unhandled;
    }
  }
};

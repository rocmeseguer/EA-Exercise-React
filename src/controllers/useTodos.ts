import { useCallback, useEffect } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { RequestStatus } from '../models/api.model';
import { Todo, TodoId } from '../models/todo.model';
import { getErrorMessage } from '../services/http.service';
import { getTodos } from '../services/todo.service';

/**
 * Controller (Custom Hook) del LISTADO de tareas (`GET /todos`).
 *
 * Hace de "pegamento" entre la UI y la lógica:
 *   Componente -> useTodos() -> todo.service -> API REST
 *                    \-> dispatch(acción) -> reducer -> Context -> re-render
 *
 * El componente solo recibe datos y callbacks; no sabe nada de fetch, de
 * reducers ni de cómo se gestionan los errores.
 */

export interface UseTodosResult {
  todos: readonly Todo[];
  status: RequestStatus;
  error: string | null;
  reload: () => Promise<void>;
  isPending: (id: TodoId) => boolean;
}

export const useTodos = (): UseTodosResult => {
  const { state, dispatch } = useTodoContext();

  // `useCallback` mantiene la misma referencia de función entre renders,
  // así puede usarse como dependencia de `useEffect` sin provocar bucles.
  const loadTodos = useCallback(async (): Promise<void> => {
    dispatch({ type: 'fetch_todos_start' });
    try {
      const todos: readonly Todo[] = await getTodos();
      dispatch({ type: 'fetch_todos_success', payload: todos });
    } catch (error: unknown) {
      dispatch({ type: 'fetch_todos_error', payload: getErrorMessage(error) });
    }
    // Sin `finally`: no hay un booleano `isLoading` que "apagar", porque la
    // transición loading -> success | error ya la hace el reducer en try/catch.
  }, [dispatch]);

  // Efecto: cargar las tareas SOLO la primera vez (estado 'idle').
  // Como los datos viven en el estado global, si volvemos a esta vista
  // se reutilizan sin repetir la petición (caché en memoria).
  useEffect((): void => {
    if (state.status === 'idle') {
      void loadTodos();
    }
  }, [state.status, loadTodos]);

  const isPending = useCallback((id: TodoId): boolean => state.pendingIds.includes(id), [state.pendingIds]);

  return {
    todos: state.todos,
    status: state.status,
    error: state.error,
    reload: loadTodos,
    isPending,
  };
};

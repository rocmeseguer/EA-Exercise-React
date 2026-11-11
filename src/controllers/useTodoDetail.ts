import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { Todo, TodoId } from '../models/todo.model';
import { getErrorMessage, isAbortError } from '../services/http.service';
import { getTodoById } from '../services/todo.service';
import { useTodoMutations } from './useTodoMutations';

/**
 * Controller (Custom Hook) del DETALLE de una tarea (`GET /todos/:id`).
 *
 * Estrategia:
 *  1. Si la tarea ya está en el estado global (la cargó el listado), se usa
 *     directamente: cero peticiones extra y siempre sincronizada.
 *  2. Si no (p. ej. se entra directamente por URL a /items/3), se pide a la API
 *     y se guarda en estado LOCAL (`useState`): es un dato efímero de esta vista.
 */

export interface UseTodoDetailResult {
  todo: Todo | null;
  isLoading: boolean;
  error: string | null;
  isPending: boolean;
  toggle: () => Promise<void>;
  remove: () => Promise<boolean>;
}

/** Función pura: normaliza el parámetro de la URL (`undefined` si no hay id). */
export const parseTodoId = (rawId: string | undefined): TodoId | null => {
  const id: string = (rawId ?? '').trim();
  return id === '' ? null : id;
};

export const useTodoDetail = (rawId: string | undefined): UseTodoDetailResult => {
  const { state } = useTodoContext();
  const { toggleTodo, removeTodo } = useTodoMutations(); // Composición de hooks
  const todoId: TodoId | null = parseTodoId(rawId);

  // Valor DERIVADO del estado global: se calcula, no se duplica en otro useState.
  const cachedTodo: Todo | null = useMemo(
    (): Todo | null => state.todos.find((todo: Todo): boolean => todo.id === todoId) ?? null,
    [state.todos, todoId],
  );

  // Estado local para el caso "no estaba en el estado global".
  const [fetchedTodo, setFetchedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect((): (() => void) | void => {
    if (todoId === null || cachedTodo !== null) return;

    // AbortController: si el id cambia o el componente se desmonta antes de que
    // llegue la respuesta, cancelamos la petición. Así evitamos "race conditions"
    // (una respuesta antigua que pisa a una nueva) y actualizar un componente desmontado.
    const controller: AbortController = new AbortController();

    const load = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);
      setFetchedTodo(null);
      try {
        const todo: Todo = await getTodoById(todoId, controller.signal);
        setFetchedTodo(todo);
      } catch (err: unknown) {
        if (isAbortError(err)) return; // Cancelación voluntaria: no es un error de la UI.
        setError(getErrorMessage(err));
      } finally {
        // Se ejecuta tanto si hubo éxito como error: apagamos el indicador de carga
        // (salvo que la petición se haya cancelado y el efecto ya no esté vigente).
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void load();

    // Función de limpieza del efecto.
    return (): void => controller.abort();
  }, [todoId, cachedTodo]);

  // Solo usamos la tarea descargada si corresponde al id actual de la URL
  // (evita mostrar un instante la tarea anterior al navegar entre detalles).
  const todo: Todo | null = cachedTodo ?? (fetchedTodo?.id === todoId ? fetchedTodo : null);

  const toggle = useCallback(async (): Promise<void> => {
    if (todo === null) return;
    const updated: Todo | null = await toggleTodo(todo);
    // Si la tarea no estaba en el estado global, sincronizamos también la copia local.
    if (updated !== null && cachedTodo === null) setFetchedTodo(updated);
  }, [todo, cachedTodo, toggleTodo]);

  const remove = useCallback(
    async (): Promise<boolean> => (todo === null ? false : removeTodo(todo.id)),
    [todo, removeTodo],
  );

  if (todoId === null) {
    return { todo: null, isLoading: false, error: 'Identificador de tarea no válido.', isPending: false, toggle, remove };
  }

  return {
    todo,
    isLoading: cachedTodo === null && isLoading,
    error: cachedTodo === null ? error : null,
    isPending: state.pendingIds.includes(todoId),
    toggle,
    remove,
  };
};

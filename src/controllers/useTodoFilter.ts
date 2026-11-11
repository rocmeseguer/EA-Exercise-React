import { ChangeEvent, useMemo, useState } from 'react';
import { Todo } from '../models/todo.model';

/**
 * Controller del FILTRO del listado. Es estado LOCAL (`useState`): solo le
 * interesa a una vista y no tiene sentido compartirlo globalmente.
 *
 * La lista filtrada NO se guarda en otro estado: se DERIVA de `todos` + `query`.
 * Guardarla aparte (como hacía la versión anterior) obliga a mantener dos
 * copias sincronizadas y es fuente de bugs.
 */

/** Función pura: mismo input => mismo output, sin tocar el array original. */
export const filterTodosByTitle = (todos: readonly Todo[], query: string): readonly Todo[] => {
  const normalized: string = query.trim().toLowerCase();
  if (normalized === '') return todos;
  return todos.filter((todo: Todo): boolean => todo.title.toLowerCase().includes(normalized));
};

export interface UseTodoFilterResult {
  query: string;
  filteredTodos: readonly Todo[];
  handleQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const useTodoFilter = (todos: readonly Todo[]): UseTodoFilterResult => {
  const [query, setQuery] = useState<string>('');

  const filteredTodos: readonly Todo[] = useMemo(
    (): readonly Todo[] => filterTodosByTitle(todos, query),
    [todos, query],
  );

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => setQuery(event.target.value);

  return { query, filteredTodos, handleQueryChange };
};

import { useState } from 'react';
import { Todo } from '../models/todo.model';

/**
 * Estado LOCAL de UI para el modal "¿Seguro que quieres eliminar...?".
 * La visibilidad del modal se deriva de si hay una tarea pendiente de confirmar:
 * un único `useState<Todo | null>` en lugar de dos (`isOpen` + `todo`) que
 * podrían quedar desincronizados.
 */
export interface UseConfirmDeleteResult {
  candidate: Todo | null;
  isOpen: boolean;
  requestDelete: (todo: Todo) => void;
  cancel: () => void;
  /** Ejecuta la acción real y cierra el modal. */
  confirm: (action: (todo: Todo) => void) => void;
}

export const useConfirmDelete = (): UseConfirmDeleteResult => {
  const [candidate, setCandidate] = useState<Todo | null>(null);

  const requestDelete = (todo: Todo): void => setCandidate(todo);
  const cancel = (): void => setCandidate(null);
  const confirm = (action: (todo: Todo) => void): void => {
    if (candidate !== null) action(candidate);
    setCandidate(null);
  };

  return { candidate, isOpen: candidate !== null, requestDelete, cancel, confirm };
};

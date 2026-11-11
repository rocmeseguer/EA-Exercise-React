import { createContext, Dispatch, ReactNode, useContext, useMemo, useReducer } from 'react';
import { TodoAction, TodoState } from '../models/todo-state.model';
import { initialTodoState, todoReducer } from './todo.reducer';

/**
 * Estado GLOBAL de tareas: Context API + useReducer.
 *
 *  - `useReducer` centraliza CÓMO cambia el estado (lógica predecible, tipo Redux).
 *  - `Context` resuelve DÓNDE está disponible: cualquier componente descendiente
 *    puede leerlo sin pasar props manualmente nivel a nivel ("prop drilling").
 *
 * Las páginas Home e Items comparten así la misma copia de los datos de la API:
 * una tarea creada en Home aparece al instante en Items sin volver a pedirla.
 */

interface TodoContextValue {
  readonly state: TodoState;
  readonly dispatch: Dispatch<TodoAction>;
}

// `undefined` como valor por defecto: permite detectar un uso fuera del Provider.
const TodoContext = createContext<TodoContextValue | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  // Memoizamos `value`: si no, se crearía un objeto nuevo en cada render del
  // Provider y TODOS los consumidores se re-renderizarían aunque nada cambiase.
  const value: TodoContextValue = useMemo((): TodoContextValue => ({ state, dispatch }), [state]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

/**
 * Hook de acceso al contexto. Encapsula `useContext` y garantiza, en tiempo de
 * ejecución y de tipos, que el valor nunca es `undefined`.
 */
export const useTodoContext = (): TodoContextValue => {
  const context: TodoContextValue | undefined = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext debe usarse dentro de un <TodoProvider>.');
  }
  return context;
};

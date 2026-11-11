import { Todo } from '../models/todo.model';
import { TodoState } from '../models/todo-state.model';
import { initialTodoState, todoReducer } from './todo.reducer';

/**
 * Un reducer es una función pura: se prueba sin montar React ni simular la red.
 */
const todoA: Todo = { id: '1', title: 'A', description: '', completed: false };
const todoB: Todo = { id: '2', title: 'B', description: '', completed: true };
const loaded: TodoState = { ...initialTodoState, status: 'success', todos: [todoA, todoB] };

describe('todoReducer', () => {
  it('pasa a "loading" y limpia el error al empezar la carga', () => {
    const state: TodoState = todoReducer({ ...initialTodoState, error: 'x' }, { type: 'fetch_todos_start' });
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('añade una tarea sin mutar el array original', () => {
    const created: Todo = { id: '3', title: 'C', description: '', completed: false };
    const next: TodoState = todoReducer(loaded, { type: 'todo_added', payload: created });
    expect(next.todos).toEqual([todoA, todoB, created]);
    expect(loaded.todos).toHaveLength(2); // el estado anterior sigue intacto
    expect(next.todos).not.toBe(loaded.todos);
  });

  it('sustituye solo la tarea actualizada y conserva la referencia de las demás', () => {
    const updated: Todo = { ...todoA, completed: true };
    const next: TodoState = todoReducer(loaded, { type: 'todo_updated', payload: updated });
    expect(next.todos[0]).toBe(updated);
    expect(next.todos[1]).toBe(todoB);
  });

  it('elimina una tarea por id', () => {
    const next: TodoState = todoReducer(loaded, { type: 'todo_removed', payload: '1' });
    expect(next.todos).toEqual([todoB]);
  });

  it('marca y desmarca una tarea como pendiente de escritura', () => {
    const pending: TodoState = todoReducer(loaded, { type: 'mutation_start', payload: '1' });
    expect(pending.pendingIds).toEqual(['1']);
    expect(todoReducer(pending, { type: 'mutation_end', payload: '1' }).pendingIds).toEqual([]);
  });
});

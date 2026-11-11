import { filterTodosByTitle } from '../controllers/useTodoFilter';
import { isTodoResponseDto, Todo, toCreateTodoDto, toTodo } from './todo.model';

describe('DTOs y mappers de Todo', () => {
  it('acepta DTOs con id numérico (JSONPlaceholder) o _id (MongoDB)', () => {
    expect(isTodoResponseDto({ id: 1, title: 't', completed: false })).toBe(true);
    expect(isTodoResponseDto({ _id: 'abc', title: 't', completed: true, description: 'd' })).toBe(true);
  });

  it('rechaza respuestas con forma incorrecta', () => {
    expect(isTodoResponseDto(null)).toBe(false);
    expect(isTodoResponseDto({ id: 1, title: 't' })).toBe(false);
    expect(isTodoResponseDto({ title: 't', completed: false })).toBe(false);
  });

  it('normaliza el DTO al modelo de dominio', () => {
    expect(toTodo({ _id: 'abc', title: 't', completed: true })).toEqual({
      id: 'abc',
      title: 't',
      description: '',
      completed: true,
    });
    expect(toTodo({ id: 7, title: 't', completed: false }).id).toBe('7');
  });

  it('crea el DTO de alta limpiando espacios y como pendiente', () => {
    expect(toCreateTodoDto({ title: '  Hola ', description: ' ' })).toEqual({
      title: 'Hola',
      description: '',
      completed: false,
    });
  });

  it('filtra por título sin distinguir mayúsculas', () => {
    const todos: readonly Todo[] = [
      { id: '1', title: 'Estudiar React', description: '', completed: false },
      { id: '2', title: 'Comprar pan', description: '', completed: false },
    ];
    expect(filterTodosByTitle(todos, 'react').map((todo: Todo): string => todo.id)).toEqual(['1']);
    expect(filterTodosByTitle(todos, '  ')).toBe(todos);
  });
});

import {
  CreateTodoDto,
  isTodoResponseDto,
  isTodoResponseDtoArray,
  Todo,
  TodoId,
  TodoResponseDto,
  toTodo,
  UpdateTodoDto,
} from '../models/todo.model';
import { API_BASE_URL, httpDelete, httpGet, httpPatch, httpPost } from './http.service';
import { mockCreateTodo, mockDeleteTodo, mockGetTodoById, mockGetTodos, mockUpdateTodo } from './todo.mock';

/**
 * Servicio de tareas: traduce operaciones de dominio ("crea esta tarea") a
 * llamadas HTTP concretas contra la API REST.
 *
 *   GET    /todos        -> TodoResponseDto[]
 *   GET    /todos/:id    -> TodoResponseDto
 *   POST   /todos        -> TodoResponseDto   (201 Created)
 *   PATCH  /todos/:id    -> TodoResponseDto   (200 OK)
 *   DELETE /todos/:id    -> (204 No Content)
 *
 * Son funciones puras respecto a React: no usan hooks ni conocen la UI,
 * por lo que se pueden testear y reutilizar en cualquier contexto.
 * Siempre devuelven MODELOS DE DOMINIO (`Todo`), nunca DTOs crudos.
 */

const USE_MOCK: boolean = API_BASE_URL === null;
const RESOURCE: string = '/todos';

/** `encodeURIComponent` evita que un id con caracteres raros rompa la URL. */
const todoPath = (id: TodoId): string => `${RESOURCE}/${encodeURIComponent(id)}`;

export const getTodos = async (signal?: AbortSignal): Promise<readonly Todo[]> => {
  const dtos: readonly TodoResponseDto[] = USE_MOCK
    ? await mockGetTodos(signal)
    : await httpGet<TodoResponseDto[]>(RESOURCE, isTodoResponseDtoArray, signal);
  return dtos.map(toTodo);
};

export const getTodoById = async (id: TodoId, signal?: AbortSignal): Promise<Todo> => {
  const dto: TodoResponseDto = USE_MOCK
    ? await mockGetTodoById(id, signal)
    : await httpGet<TodoResponseDto>(todoPath(id), isTodoResponseDto, signal);
  return toTodo(dto);
};

export const createTodo = async (payload: CreateTodoDto): Promise<Todo> => {
  const dto: TodoResponseDto = USE_MOCK
    ? await mockCreateTodo(payload)
    : await httpPost<TodoResponseDto>(RESOURCE, payload, isTodoResponseDto);
  return toTodo(dto);
};

export const updateTodo = async (id: TodoId, changes: UpdateTodoDto): Promise<Todo> => {
  const dto: TodoResponseDto = USE_MOCK
    ? await mockUpdateTodo(id, changes)
    : await httpPatch<TodoResponseDto>(todoPath(id), changes, isTodoResponseDto);
  return toTodo(dto);
};

export const deleteTodo = async (id: TodoId): Promise<void> =>
  USE_MOCK ? mockDeleteTodo(id) : httpDelete(todoPath(id));

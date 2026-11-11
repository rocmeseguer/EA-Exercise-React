import { CreateTodoDto, TodoResponseDto, UpdateTodoDto } from '../models/todo.model';
import { HttpError } from './http.service';

/**
 * SERVIDOR SIMULADO en memoria. Se usa cuando no hay `REACT_APP_API_URL`.
 *
 * Imita el contrato REST de la API de Express (mismos DTOs, mismos códigos
 * de error), de modo que el resto de la app no nota la diferencia.
 * Los datos se pierden al recargar la página, igual que si se reseedease la BD.
 *
 * Nota: `database` es una variable `let` porque simula el disco del servidor,
 * pero NUNCA se muta: cada operación le asigna un array nuevo.
 */

const MOCK_LATENCY_MS: number = 500;

let database: readonly TodoResponseDto[] = [
  { id: 1, title: 'Repasar el Virtual DOM', description: 'Leer la sección 2 de CONCEPTS.md.', completed: true },
  { id: 2, title: 'Arrancar la API de Express', description: 'npx tsx watch src/index.ts', completed: false },
  { id: 3, title: 'Configurar REACT_APP_API_URL', description: 'Copiar .env.example como .env.local.', completed: false },
  { id: 4, title: 'Estudiar Context + useReducer', description: '', completed: false },
];
let nextId: number = database.length + 1;

/** Simula la latencia de red respetando la cancelación (`AbortSignal`), como `fetch`. */
const simulateLatency = (signal?: AbortSignal): Promise<void> =>
  new Promise<void>((resolve, reject): void => {
    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(resolve, MOCK_LATENCY_MS);
    signal?.addEventListener('abort', (): void => {
      clearTimeout(timeoutId);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });

const notFound = (id: string): HttpError => new HttpError('http', `La tarea ${id} no existe. (404)`, 404);

const findById = (id: string): TodoResponseDto | undefined =>
  database.find((todo: TodoResponseDto): boolean => String(todo.id) === id);

/** GET /todos */
export const mockGetTodos = async (signal?: AbortSignal): Promise<readonly TodoResponseDto[]> => {
  await simulateLatency(signal);
  return database;
};

/** GET /todos/:id */
export const mockGetTodoById = async (id: string, signal?: AbortSignal): Promise<TodoResponseDto> => {
  await simulateLatency(signal);
  const found: TodoResponseDto | undefined = findById(id);
  if (found === undefined) throw notFound(id);
  return found;
};

/** POST /todos -> 201 Created */
export const mockCreateTodo = async (dto: CreateTodoDto): Promise<TodoResponseDto> => {
  await simulateLatency();
  if (dto.title === '') {
    throw new HttpError('http', 'El título es obligatorio. (422)', 422);
  }
  const created: TodoResponseDto = { ...dto, id: nextId };
  nextId += 1;
  database = [...database, created];
  return created;
};

/** PATCH /todos/:id -> 200 OK */
export const mockUpdateTodo = async (id: string, changes: UpdateTodoDto): Promise<TodoResponseDto> => {
  await simulateLatency();
  const current: TodoResponseDto | undefined = findById(id);
  if (current === undefined) throw notFound(id);
  const updated: TodoResponseDto = { ...current, ...changes };
  database = database.map((todo: TodoResponseDto): TodoResponseDto => (todo === current ? updated : todo));
  return updated;
};

/** DELETE /todos/:id -> 204 No Content */
export const mockDeleteTodo = async (id: string): Promise<void> => {
  await simulateLatency();
  if (findById(id) === undefined) throw notFound(id);
  database = database.filter((todo: TodoResponseDto): boolean => String(todo.id) !== id);
};

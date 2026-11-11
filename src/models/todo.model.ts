/**
 * Modelos de la entidad "Tarea" (Todo).
 *
 * Distinguimos dos tipos de "forma":
 *  - DTO (Data Transfer Object): lo que viaja por la red. Lo dicta el backend.
 *  - Modelo de dominio: lo que usa la UI. Lo decidimos nosotros.
 *
 * El servicio traduce de uno a otro (ver `toTodo`). Así, si el backend cambia
 * (p. ej. Mongo devuelve `_id` en vez de `id`), solo se toca una función.
 */

/** Identificador de tarea en el dominio: siempre `string` (como los params de la URL). */
export type TodoId = string;

/** Modelo de dominio. `readonly`: una tarea nunca se modifica in situ. */
export interface Todo {
  readonly id: TodoId;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
}

/**
 * DTO de RESPUESTA (lo que devuelve la API).
 * Toleramos `id` numérico (JSONPlaceholder, json-server) o `_id` (MongoDB/Express).
 */
export interface TodoResponseDto {
  readonly id?: number | string;
  readonly _id?: string;
  readonly title: string;
  readonly description?: string;
  readonly completed: boolean;
}

/** DTO de CREACIÓN (cuerpo de `POST /todos`): el id lo asigna el servidor. */
export interface CreateTodoDto {
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
}

/** DTO de MODIFICACIÓN PARCIAL (cuerpo de `PATCH /todos/:id`). */
export type UpdateTodoDto = Partial<CreateTodoDto>;

/** Datos que rellena el usuario en el formulario. */
export interface TodoFormValues {
  readonly title: string;
  readonly description: string;
}

// ---------------------------------------------------------------------------
// Type guards: validación en TIEMPO DE EJECUCIÓN.
// TypeScript desaparece al compilar; lo que llega por la red es `unknown`.
// Validarlo evita hacer un `as Todo` "a ciegas".
// ---------------------------------------------------------------------------

export const isTodoResponseDto = (value: unknown): value is TodoResponseDto => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  const hasId: boolean =
    typeof candidate.id === 'number' ||
    typeof candidate.id === 'string' ||
    typeof candidate._id === 'string';
  const hasValidDescription: boolean =
    candidate.description === undefined || typeof candidate.description === 'string';
  return (
    hasId &&
    hasValidDescription &&
    typeof candidate.title === 'string' &&
    typeof candidate.completed === 'boolean'
  );
};

export const isTodoResponseDtoArray = (value: unknown): value is TodoResponseDto[] =>
  Array.isArray(value) && value.every(isTodoResponseDto);

// ---------------------------------------------------------------------------
// Funciones puras de transformación (mappers).
// ---------------------------------------------------------------------------

/** DTO -> dominio. Normaliza el id y rellena los campos opcionales. */
export const toTodo = (dto: TodoResponseDto): Todo => ({
  id: String(dto._id ?? dto.id),
  title: dto.title,
  description: dto.description ?? '',
  completed: dto.completed,
});

/** Formulario -> DTO de creación. Una tarea nueva siempre empieza pendiente. */
export const toCreateTodoDto = (values: TodoFormValues): CreateTodoDto => ({
  title: values.title.trim(),
  description: values.description.trim(),
  completed: false,
});

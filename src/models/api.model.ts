/**
 * Tipos relacionados con la comunicación HTTP con la API REST.
 * No dependen del dominio (tareas): sirven para cualquier recurso.
 */

/**
 * Ciclo de vida de una petición asíncrona.
 * Una unión de literales es más expresiva y segura que varios booleanos
 * (`isLoading`, `hasError`...) que podrían contradecirse entre sí.
 */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/** Métodos HTTP que usa la aplicación (CRUD). */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** Categorías de error HTTP que la UI puede querer distinguir. */
export type HttpErrorKind =
  | 'network' // No hay conexión o el servidor no responde
  | 'timeout' // La petición ha tardado demasiado
  | 'http' // El servidor ha respondido con un código 4xx / 5xx
  | 'invalid_response'; // El cuerpo no tiene la forma esperada

/**
 * Formato de error que devuelve la API de Express del curso:
 *   { "message": "...", "code": "NOT_FOUND" }
 */
export interface ApiErrorBody {
  readonly message: string;
  readonly code?: string;
}

/** Firma genérica de un type guard: permite validar cualquier respuesta. */
export type TypeGuard<T> = (value: unknown) => value is T;

/** Type guard del cuerpo de error de la API. */
export const isApiErrorBody = (value: unknown): value is ApiErrorBody => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.message === 'string';
};

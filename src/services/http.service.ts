import { HttpErrorKind, HttpMethod, isApiErrorBody, TypeGuard } from '../models/api.model';

/**
 * Capa de servicios: cliente HTTP genérico.
 *
 * Esta es la ÚNICA parte de la aplicación que sabe que existe `fetch`.
 * Los componentes no hacen peticiones: llaman a hooks (controllers), que a su
 * vez llaman a servicios. Así, si mañana cambiamos `fetch` por `axios`, solo
 * se toca este fichero.
 */

/**
 * URL base de la API de Express. Se configura con la variable de entorno
 * `REACT_APP_API_URL` (fichero `.env.local`), p. ej.:
 *   REACT_APP_API_URL=http://localhost:4000/api
 * Si no está definida, `todo.service.ts` usa el servidor simulado (mock).
 */
const rawApiUrl: string | undefined = process.env.REACT_APP_API_URL;
export const API_BASE_URL: string | null =
  rawApiUrl !== undefined && rawApiUrl.trim() !== '' ? rawApiUrl.replace(/\/+$/, '') : null;

const DEFAULT_TIMEOUT_MS: number = 8000;

/** Error de dominio propio: transporta la categoría y el código HTTP. */
export class HttpError extends Error {
  readonly kind: HttpErrorKind;
  readonly status: number | null;

  constructor(kind: HttpErrorKind, message: string, status: number | null = null) {
    super(message);
    this.name = 'HttpError';
    this.kind = kind;
    this.status = status;
    // Necesario al heredar de Error con target ES5 para que `instanceof` funcione.
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

/** ¿El error se debe a que alguien canceló la petición (p. ej. al desmontar)? */
export const isAbortError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === 'AbortError';

/**
 * Convierte cualquier error (`unknown`) en un mensaje apto para la UI.
 * En un `catch`, TypeScript tipa el error como `unknown`: nunca asumimos su forma.
 */
export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Ha ocurrido un error inesperado.';

/** Función que convierte una `Response` correcta (2xx) en el dato tipado `T`. */
type ResponseParser<T> = (response: Response) => Promise<T>;

/** Parser JSON validado con un type guard. */
const parseJsonWith =
  <T>(guard: TypeGuard<T>): ResponseParser<T> =>
  async (response: Response): Promise<T> => {
    const data: unknown = await response.json();
    if (!guard(data)) {
      throw new HttpError('invalid_response', 'La respuesta del servidor no tiene el formato esperado.');
    }
    return data;
  };

/** Parser para respuestas sin cuerpo útil (p. ej. `204 No Content` de un DELETE). */
const ignoreBody: ResponseParser<void> = (): Promise<void> => Promise.resolve();

/**
 * Construye el mensaje de un error 4xx / 5xx. Si la API devuelve su formato
 * de error `{ message, code }`, usamos ese mensaje; si no, el texto estándar.
 */
const buildHttpError = async (response: Response): Promise<HttpError> => {
  const fallback: string = `Error ${response.status}: ${response.statusText || 'respuesta no válida'}`;
  try {
    const body: unknown = await response.json();
    const message: string = isApiErrorBody(body) ? `${body.message} (${response.status})` : fallback;
    return new HttpError('http', message, response.status);
  } catch {
    // El cuerpo no era JSON: nos quedamos con el mensaje genérico.
    return new HttpError('http', fallback, response.status);
  }
};

interface RequestOptions {
  readonly body?: unknown;
  readonly signal?: AbortSignal;
}

/**
 * Núcleo de todas las peticiones: timeout, cancelación, cabeceras, control
 * de códigos de estado y traducción de errores a `HttpError`.
 */
const request = async <T>(
  method: HttpMethod,
  path: string,
  parse: ResponseParser<T>,
  { body, signal }: RequestOptions = {},
): Promise<T> => {
  if (API_BASE_URL === null) {
    throw new HttpError('network', 'La URL de la API (REACT_APP_API_URL) no está configurada.');
  }

  // Controlador interno: permite abortar por timeout Y por cancelación externa.
  const controller: AbortController = new AbortController();
  let timedOut: boolean = false;
  const timeoutId: ReturnType<typeof setTimeout> = setTimeout((): void => {
    timedOut = true;
    controller.abort();
  }, DEFAULT_TIMEOUT_MS);
  const forwardAbort = (): void => controller.abort();
  signal?.addEventListener('abort', forwardAbort);

  try {
    const response: Response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    // `fetch` NO lanza error con 404 o 500: hay que comprobar `ok` a mano.
    if (!response.ok) {
      throw await buildHttpError(response);
    }

    return await parse(response);
  } catch (error: unknown) {
    // Errores ya tipados: los propagamos tal cual.
    if (error instanceof HttpError) throw error;
    // Cancelación: distinguimos timeout (error real) de cancelación del llamante.
    if (isAbortError(error)) {
      if (timedOut) throw new HttpError('timeout', 'El servidor ha tardado demasiado en responder.');
      throw error;
    }
    // Cualquier otro caso (TypeError de fetch por falta de red, CORS, JSON mal formado...).
    throw new HttpError('network', 'No se ha podido contactar con el servidor.');
  } finally {
    // `finally` se ejecuta SIEMPRE (éxito o error): lugar ideal para liberar recursos.
    clearTimeout(timeoutId);
    signal?.removeEventListener('abort', forwardAbort);
  }
};

// ---------------------------------------------------------------------------
// API pública del cliente HTTP: un helper por verbo, todos tipados.
// ---------------------------------------------------------------------------

export const httpGet = <T>(path: string, guard: TypeGuard<T>, signal?: AbortSignal): Promise<T> =>
  request<T>('GET', path, parseJsonWith(guard), { signal });

export const httpPost = <T>(path: string, body: unknown, guard: TypeGuard<T>): Promise<T> =>
  request<T>('POST', path, parseJsonWith(guard), { body });

export const httpPatch = <T>(path: string, body: unknown, guard: TypeGuard<T>): Promise<T> =>
  request<T>('PATCH', path, parseJsonWith(guard), { body });

export const httpDelete = (path: string): Promise<void> => request<void>('DELETE', path, ignoreBody);

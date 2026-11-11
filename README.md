# EA Exercise React · BackOffice de tareas

Frontend en **React 17 + TypeScript (strict)** que consume una **API REST** (Express) para gestionar tareas (CRUD completo), maquetado con **Tailwind CSS + daisyUI**.

> 📘 La explicación teórica de cada patrón, con ejemplos del propio código, está en **[CONCEPTS.md](./CONCEPTS.md)**. La sección central es *Consumo de APIs REST en React*.

## Puesta en marcha

```bash
npm install
npm start            # http://localhost:3000
```

Por defecto la app usa un **servidor simulado en memoria** (`src/services/todo.mock.ts`) con el mismo contrato REST, así que funciona sin backend. El *badge* de la barra de navegación indica qué backend se está usando.

### Conectar con la API de Express

```bash
cp .env.example .env.local
# edita REACT_APP_API_URL, p. ej. http://localhost:4000/api
npm start            # hay que reiniciar tras cambiar variables de entorno
```

La API debe exponer el recurso `/todos` y tener CORS habilitado:

| Método   | Ruta          | Body                                       | Respuesta                |
| -------- | ------------- | ------------------------------------------ | ------------------------ |
| `GET`    | `/todos`      | —                                          | `200` `Todo[]`           |
| `GET`    | `/todos/:id`  | —                                          | `200` `Todo` / `404`     |
| `POST`   | `/todos`      | `{ title, description, completed }`        | `201` `Todo`             |
| `PATCH`  | `/todos/:id`  | parcial, p. ej. `{ completed: true }`      | `200` `Todo` / `404`     |
| `DELETE` | `/todos/:id`  | —                                          | `204` / `404`            |

Donde `Todo = { _id | id, title: string, description?: string, completed: boolean }`. Los errores, con el formato de la API del curso: `{ "message": "...", "code": "..." }`.

> 🧪 **Ejercicio**: la API `EA-Exercise-RestAPI` todavía no tiene el recurso `todos`. Añádelo (modelo Mongoose + DTO Zod + service + controller + routes) siguiendo el patrón de `users`.
>
> Para probar solo la lectura sin backend propio puedes usar `REACT_APP_API_URL=https://jsonplaceholder.typicode.com` (no persiste las escrituras).

## Estructura

```text
src/
├── components/     # UI con Tailwind + daisyUI (common/, layout/, todos/)
├── context/        # TodoContext / NotificationContext + reducers puros
├── controllers/    # Custom Hooks: useTodos, useTodoMutations, useTodoDetail, useTodoForm...
├── models/         # Tipos de dominio, DTOs de la API y type guards
├── routes/         # AppRouter + vistas (HomePage, ItemsPage, ItemDetailPage, NotFoundPage)
└── services/       # http.service (fetch genérico), todo.service (endpoints), todo.mock
```

## Rutas

| Ruta          | Vista            | Qué hace                                                  |
| ------------- | ---------------- | --------------------------------------------------------- |
| `/`           | `HomePage`       | Formulario de alta + tarjetas (completar / eliminar)      |
| `/items`      | `ItemsPage`      | Listado filtrable por título con enlace al detalle        |
| `/items/:id`  | `ItemDetailPage` | Detalle de una tarea (funciona también entrando por URL)  |

## Scripts

| Script              | Qué hace                                         |
| ------------------- | ------------------------------------------------ |
| `npm start`         | Servidor de desarrollo                           |
| `npm run build`     | Build de producción en `build/`                  |
| `npm test`          | Tests (Jest + Testing Library) en modo *watch*   |
| `npm run typecheck` | Comprobación de tipos (`tsc --noEmit`)           |

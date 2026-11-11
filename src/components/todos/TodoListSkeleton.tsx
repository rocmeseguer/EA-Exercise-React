interface TodoListSkeletonProps {
  rows?: number;
}

/** Skeleton: "silueta" de la lista mientras carga. Reduce la sensación de espera. */
export const TodoListSkeleton = ({ rows = 4 }: TodoListSkeletonProps): JSX.Element => {
  // `Array.from` crea un array NUEVO de `rows` posiciones para poder hacer `map`.
  const placeholders: readonly number[] = Array.from({ length: rows }, (_: unknown, index: number): number => index);

  return (
    <ul className="grid gap-4 sm:grid-cols-2" role="status" aria-label="Cargando tareas">
      {placeholders.map(
        // Aquí SÍ es aceptable usar el índice como key: la lista es estática,
        // nunca se reordena y sus elementos no tienen identidad propia.
        (index: number): JSX.Element => (
          <li key={index} className="card bg-base-100 shadow-md">
            <div className="card-body gap-3">
              <div className="skeleton h-6 w-3/4" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-1/3" />
            </div>
          </li>
        ),
      )}
    </ul>
  );
};

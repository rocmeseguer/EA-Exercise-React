interface SpinnerProps {
  message?: string;
}

/**
 * Indicador de carga reutilizable (estado "Cargando").
 * `role="status"` + `aria-live` lo anuncian a los lectores de pantalla.
 */
export const Spinner = ({ message = 'Cargando...' }: SpinnerProps): JSX.Element => (
  <div role="status" aria-live="polite" className="flex items-center justify-center gap-3 py-10 text-base-content/70">
    <span className="loading loading-spinner loading-md text-primary" aria-hidden="true" />
    <span>{message}</span>
  </div>
);

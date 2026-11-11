import { BiErrorCircle, BiRefresh } from 'react-icons/bi';

interface ErrorAlertProps {
  message: string;
  /** Opcional: si se pasa, se muestra un botón de reintento. */
  onRetry?: () => void;
}

/**
 * Banner de error (estado "Error").
 * No decide QUÉ hacer al reintentar: recibe la acción por props (callback),
 * respetando el flujo de datos unidireccional.
 */
export const ErrorAlert = ({ message, onRetry }: ErrorAlertProps): JSX.Element => (
  <div role="alert" className="alert alert-error">
    <BiErrorCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
    <span>{message}</span>
    {onRetry && (
      <button type="button" className="btn btn-sm" onClick={onRetry}>
        <BiRefresh aria-hidden="true" /> Reintentar
      </button>
    )}
  </div>
);

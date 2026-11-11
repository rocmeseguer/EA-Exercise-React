import { BiCheckCircle, BiErrorCircle, BiInfoCircle, BiX } from 'react-icons/bi';
import { IconType } from 'react-icons';
import { Notification, NotificationKind } from '../../models/notification.model';

interface ToastStackProps {
  notifications: readonly Notification[];
  onDismiss: (id: number) => void;
}

/**
 * Tabla de consulta (objeto inmutable) en lugar de un `if/else` o `switch`:
 * asocia cada tipo de notificación con su clase de daisyUI y su icono.
 * `Record<NotificationKind, ...>` obliga a cubrir TODOS los tipos.
 */
const KIND_STYLES: Readonly<Record<NotificationKind, { className: string; Icon: IconType }>> = {
  success: { className: 'alert-success', Icon: BiCheckCircle },
  error: { className: 'alert-error', Icon: BiErrorCircle },
  info: { className: 'alert-info', Icon: BiInfoCircle },
};

/** Pila de notificaciones flotantes (feedback de "Éxito" y "Error" de las escrituras). */
export const ToastStack = ({ notifications, onDismiss }: ToastStackProps): JSX.Element => (
  <div className="toast toast-end toast-bottom z-50" aria-live="polite">
    {notifications.map((notification: Notification): JSX.Element => {
      const { className, Icon } = KIND_STYLES[notification.kind];
      return (
        <div key={notification.id} role="status" className={`alert ${className} shadow-lg`}>
          <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{notification.message}</span>
          <button
            type="button"
            className="btn btn-circle btn-ghost btn-xs"
            aria-label="Cerrar notificación"
            onClick={(): void => onDismiss(notification.id)}
          >
            <BiX aria-hidden="true" />
          </button>
        </div>
      );
    })}
  </div>
);

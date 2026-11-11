import { useCallback } from 'react';
import { useNotificationContext } from '../context/NotificationContext';
import { Notification, NotificationKind } from '../models/notification.model';

/**
 * Controller de notificaciones (toasts).
 * El reducer es puro, así que el efecto secundario (el temporizador que las
 * cierra solas) vive aquí, en el hook, y no en el reducer.
 */

const AUTO_DISMISS_MS: number = 3500;

// Contador a nivel de módulo: ids únicos y estables para la `key` de cada toast.
let lastNotificationId: number = 0;
const nextNotificationId = (): number => {
  lastNotificationId += 1;
  return lastNotificationId;
};

export interface UseNotificationsResult {
  notifications: readonly Notification[];
  notify: (kind: NotificationKind, message: string) => void;
  dismiss: (id: number) => void;
}

export const useNotifications = (): UseNotificationsResult => {
  const { state, dispatch } = useNotificationContext();

  // `dispatch` de `useReducer` es estable (misma referencia siempre), así que
  // estas funciones también lo son y pueden ser dependencias de otros hooks.
  const dismiss = useCallback(
    (id: number): void => dispatch({ type: 'notification_dismissed', payload: id }),
    [dispatch],
  );

  const notify = useCallback(
    (kind: NotificationKind, message: string): void => {
      const notification: Notification = { id: nextNotificationId(), kind, message };
      dispatch({ type: 'notification_pushed', payload: notification });
      setTimeout((): void => dismiss(notification.id), AUTO_DISMISS_MS);
    },
    [dispatch, dismiss],
  );

  return { notifications: state.notifications, notify, dismiss };
};

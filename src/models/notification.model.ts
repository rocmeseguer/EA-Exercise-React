/**
 * Notificaciones (toasts) de feedback para el usuario: éxito, error o info.
 */
export type NotificationKind = 'success' | 'error' | 'info';

export interface Notification {
  readonly id: number;
  readonly kind: NotificationKind;
  readonly message: string;
}

export interface NotificationState {
  readonly notifications: readonly Notification[];
}

export type NotificationAction =
  | { type: 'notification_pushed'; payload: Notification }
  | { type: 'notification_dismissed'; payload: number };

import { Notification, NotificationAction, NotificationState } from '../models/notification.model';

export const initialNotificationState: NotificationState = { notifications: [] };

/** Reducer puro de las notificaciones (toasts). */
export const notificationReducer = (
  state: NotificationState,
  action: NotificationAction,
): NotificationState => {
  switch (action.type) {
    case 'notification_pushed':
      return { notifications: [...state.notifications, action.payload] };
    case 'notification_dismissed':
      return {
        notifications: state.notifications.filter(
          (notification: Notification): boolean => notification.id !== action.payload,
        ),
      };
    default: {
      const unhandled: never = action;
      return unhandled;
    }
  }
};

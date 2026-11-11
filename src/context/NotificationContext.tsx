import { createContext, Dispatch, ReactNode, useContext, useMemo, useReducer } from 'react';
import { NotificationAction, NotificationState } from '../models/notification.model';
import { initialNotificationState, notificationReducer } from './notification.reducer';

/**
 * Estado GLOBAL de la sesión de UI: notificaciones de éxito / error.
 * Está separado del contexto de tareas porque cambia por motivos distintos
 * (responsabilidad única): las notificaciones no son datos de la API, sino
 * feedback de la interfaz, y cualquier controller puede emitirlas.
 */

interface NotificationContextValue {
  readonly state: NotificationState;
  readonly dispatch: Dispatch<NotificationAction>;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(notificationReducer, initialNotificationState);
  const value: NotificationContextValue = useMemo(
    (): NotificationContextValue => ({ state, dispatch }),
    [state],
  );
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotificationContext = (): NotificationContextValue => {
  const context: NotificationContextValue | undefined = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext debe usarse dentro de un <NotificationProvider>.');
  }
  return context;
};

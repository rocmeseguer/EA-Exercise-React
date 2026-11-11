import { NotificationProvider } from './context/NotificationContext';
import { TodoProvider } from './context/TodoContext';
import { AppRouter } from './routes/AppRouter';

/**
 * Componente raíz. Su única responsabilidad es COMPONER la aplicación:
 * los Providers envuelven al router para que todas las vistas compartan
 * el mismo estado global (tareas + notificaciones).
 */
export const App = (): JSX.Element => (
  <NotificationProvider>
    <TodoProvider>
      <AppRouter />
    </TodoProvider>
  </NotificationProvider>
);

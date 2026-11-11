import { Outlet } from 'react-router-dom';
import { ApiInfo, useApiInfo } from '../../controllers/useApiInfo';
import { useNotifications } from '../../controllers/useNotifications';
import { ToastStack } from '../common/ToastStack';
import { NavBar } from './NavBar';

/**
 * Layout principal (contenedor). Pide datos a los controllers y se los pasa a
 * componentes presentacionales por props. `<Outlet />` es el "hueco" donde
 * React Router pinta la ruta hija activa.
 */
export const AppLayout = (): JSX.Element => {
  const { isMock, label }: ApiInfo = useApiInfo();
  const { notifications, dismiss } = useNotifications();

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar apiLabel={label} isMockApi={isMock} />
      <main className="mx-auto w-full max-w-6xl p-4 md:p-8">
        <Outlet />
      </main>
      <ToastStack notifications={notifications} onDismiss={dismiss} />
    </div>
  );
};

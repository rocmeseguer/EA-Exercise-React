import { NavLink } from 'react-router-dom';
import { BiTask } from 'react-icons/bi';

interface NavBarProps {
  apiLabel: string;
  isMockApi: boolean;
}

interface NavItem {
  readonly to: string;
  readonly label: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { to: '/', label: 'Inicio' },
  { to: '/items', label: 'Mis tareas' },
];

/** Clase del enlace según si su ruta está activa (función pura). */
const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
  isActive ? 'active font-semibold' : '';

/**
 * Barra de navegación. `NavLink` cambia la URL SIN recargar la página
 * (navegación del lado del cliente, típica de una SPA) y sabe si está activo.
 */
export const NavBar = ({ apiLabel, isMockApi }: NavBarProps): JSX.Element => (
  <nav className="navbar bg-neutral text-neutral-content shadow-md">
    <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 px-2">
      <span className="flex items-center gap-2 text-lg font-bold">
        <BiTask className="h-6 w-6" aria-hidden="true" /> EA BackOffice
      </span>
      <ul className="menu menu-horizontal flex-1 px-1">
        {NAV_ITEMS.map(
          (item: NavItem): JSX.Element => (
            <li key={item.to}>
              <NavLink to={item.to} end className={navLinkClass}>
                {item.label}
              </NavLink>
            </li>
          ),
        )}
      </ul>
      <span
        className={`badge ${isMockApi ? 'badge-warning' : 'badge-success'} max-w-xs truncate`}
        title="Backend que está usando la aplicación"
      >
        {apiLabel}
      </span>
    </div>
  </nav>
);

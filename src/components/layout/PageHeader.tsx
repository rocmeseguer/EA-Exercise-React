import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Hueco opcional para acciones (botones) a la derecha del título. */
  actions?: ReactNode;
}

/** Cabecera común de cada vista. */
export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps): JSX.Element => (
  <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-base-content/60">{subtitle}</p>}
    </div>
    {actions}
  </header>
);

import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

/** Estado vacío: la petición fue bien, pero no hay datos que mostrar. */
export const EmptyState = ({ title, description, icon }: EmptyStateProps): JSX.Element => (
  <div className="flex flex-col items-center gap-2 rounded-box border border-dashed border-base-300 p-10 text-center text-base-content/60">
    {icon}
    <p className="text-lg font-semibold">{title}</p>
    {description && <p className="text-sm">{description}</p>}
  </div>
);

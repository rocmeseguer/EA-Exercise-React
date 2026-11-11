import { ChangeEvent } from 'react';
import { BiSearch } from 'react-icons/bi';

interface TodoFilterProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/** Input de búsqueda CONTROLADO: su valor lo decide el padre (`value` + `onChange`). */
export const TodoFilter = ({ value, onChange }: TodoFilterProps): JSX.Element => (
  <label className="input input-bordered flex items-center gap-2">
    <BiSearch className="opacity-60" aria-hidden="true" />
    <input
      type="search"
      name="filter"
      className="grow"
      placeholder="Filtrar por título"
      aria-label="Filtrar tareas por título"
      value={value}
      onChange={onChange}
      autoFocus
    />
  </label>
);

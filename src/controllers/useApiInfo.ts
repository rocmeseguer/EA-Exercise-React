import { API_BASE_URL } from '../services/http.service';

/**
 * Expone a la UI, sin que esta importe servicios, contra qué backend trabaja.
 * Útil en clase para saber si estamos usando la API real o la simulada.
 */
export interface ApiInfo {
  isMock: boolean;
  label: string;
}

export const useApiInfo = (): ApiInfo =>
  API_BASE_URL === null
    ? { isMock: true, label: 'API simulada' }
    : { isMock: false, label: API_BASE_URL };

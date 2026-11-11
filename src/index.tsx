import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

/**
 * Punto de entrada. React monta el árbol de componentes dentro de #root.
 * A partir de aquí, React mantiene un Virtual DOM en memoria y solo aplica
 * al DOM real las diferencias mínimas tras cada cambio de estado.
 *
 * `StrictMode` activa comprobaciones extra en desarrollo (no afecta a producción).
 */
const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement === null) {
  throw new Error('No se ha encontrado el elemento #root en public/index.html.');
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement,
);

// Para medir rendimiento: reportWebVitals(console.log)
reportWebVitals();

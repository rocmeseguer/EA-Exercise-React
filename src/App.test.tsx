import { render, screen } from '@testing-library/react';
import { App } from './App';

/**
 * Test de integración: sin REACT_APP_API_URL la app usa el servidor simulado,
 * así que podemos comprobar el ciclo Cargando -> Éxito de punta a punta.
 */
test('muestra las tareas cargadas desde la API simulada', async () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Inicio' })).toBeInTheDocument();
  expect(await screen.findByText('Repasar el Virtual DOM', {}, { timeout: 3000 })).toBeInTheDocument();
});

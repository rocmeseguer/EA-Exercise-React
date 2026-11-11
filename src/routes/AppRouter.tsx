import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from './HomePage';
import { ItemDetailPage } from './ItemDetailPage';
import { ItemsPage } from './ItemsPage';
import { NotFoundPage } from './NotFoundPage';

/**
 * Configuración centralizada del enrutado.
 * Tener todas las rutas en un único sitio da una visión clara del mapa de la app.
 *
 *   /            -> AppLayout > HomePage
 *   /items       -> AppLayout > ItemsPage
 *   /items/:id   -> AppLayout > ItemDetailPage
 *   (otra)       -> AppLayout > NotFoundPage
 */
export const AppRouter = (): JSX.Element => (
  // `future`: adopta ya el comportamiento de React Router v7 (y elimina sus avisos).
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="items" element={<ItemsPage />} />
        <Route path="items/:id" element={<ItemDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

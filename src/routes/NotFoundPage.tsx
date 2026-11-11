import { Link } from 'react-router-dom';

/** Vista para cualquier ruta desconocida. */
export const NotFoundPage = (): JSX.Element => (
  <section className="hero py-20">
    <div className="hero-content text-center">
      <div>
        <h1 className="text-6xl font-bold">404</h1>
        <p className="py-4 text-base-content/60">La página que buscas no existe.</p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  </section>
);

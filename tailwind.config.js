/**
 * Configuración de Tailwind CSS (v3) + daisyUI (v4).
 *
 * Create React App 5 detecta este fichero automáticamente y ejecuta Tailwind
 * como plugin de PostCSS: no hace falta "eject" ni configurar webpack.
 *
 * `content` indica dónde buscar clases: Tailwind solo genera el CSS de las
 * clases que realmente aparecen en esos ficheros (el bundle final es mínimo).
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    // Temas disponibles: el primero es el de por defecto; `dark` se aplica
    // automáticamente si el sistema operativo está en modo oscuro.
    themes: ['corporate', 'dark'],
    darkTheme: 'dark',
  },
};

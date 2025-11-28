/*
  Pie.js
  Componente del pie de página (footer).
  Muestra el año actual y los créditos.
*/

import React from 'react';

export default function Pie() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          © {anioActual} Alinette Galdames — Diseño &amp; Experiencias
        </p>
      </div>
    </footer>
  );
}

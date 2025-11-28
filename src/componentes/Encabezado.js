/*
  Encabezado.js
  Componente del header (encabezado) de la página.
  Contiene el logo/nombre y el botón de descargar CV.
*/

import React from 'react';

export default function Encabezado() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">Alinette Galdames</div>
      </div>
    </header>
  );
}

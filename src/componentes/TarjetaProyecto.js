/*
  Este componente se usa para cada tarjeta de proyecto en la grilla. Se usa dentro de la sección Proyectos para ordenarlo.
*/

import React from 'react';

export default function TarjetaProyecto({ proyecto, onAbrirModal }) {
  const thumb = proyecto.imagen;

  return (
    <article 
      className="project-card" 
      onClick={() => onAbrirModal(proyecto)}
      role="button"
      tabIndex="0"
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onAbrirModal(proyecto);
        }
      }}
    >
      <div
        className="thumb"
        style={{
          backgroundImage: `url("${encodeURI(thumb)}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />
      <div className="card-info">
        <span className="tag">{proyecto.category}</span>
        <strong>{proyecto.previewTitle || proyecto.title}</strong>
        <div className="label-bar" />
      </div>
    </article>
  );
}

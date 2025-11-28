/*
  Modal.js
  Componente modal que se abre cuando haces click en una tarjeta de proyecto.
  Muestra la imagen, título, fecha y descripción completa del proyecto.
*/

import React, { useState, useEffect } from 'react';

export default function Modal({ proyecto, onCerrar }) {
  const [imagenes, setImagenes] = useState([]);
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    // Si el proyecto tiene un array `imagenes`, úsalo; si no, usa proyecto.imagen
    if (proyecto && proyecto.imagenes && proyecto.imagenes.length > 0) {
      setImagenes(proyecto.imagenes);
      setIndex(0);
    } else if (proyecto && proyecto.imagen) {
      setImagenes([proyecto.imagen]);
      setIndex(0);
    } else {
      setImagenes([]);
      setIndex(0);
    }
  }, [proyecto]);

  // Si no hay proyecto seleccionado, no renderiza nada
  if (!proyecto) return null;


  // Cierra el modal si haces click en el fondo (fuera de la tarjeta)
  const manejarClickFondo = (e) => {
    if (e.target.classList.contains('modal')) {
      onCerrar();
    }
  };

  return (
    <div className="modal" onClick={manejarClickFondo} role="dialog" aria-modal="true">
      <div className="modal-inner">
        {/* Botón para cerrar (X) */}
        <button
          className="modal-close"
          onClick={onCerrar}
          aria-label="Cerrar modal"
        >
          ×
        </button>

        {/* Lado izquierdo: imagen del proyecto con flechas si hay más de una */}
        <div className="modal-left">
          {imagenes.length > 0 ? (
            <div
              className="carousel"
              onTouchStart={(e) => {
                const t = e.touches && e.touches[0];
                if (t) setTouchStartX(t.clientX);
              }}
              onTouchMove={(e) => {
                const t = e.touches && e.touches[0];
                if (t) setTouchEndX(t.clientX);
              }}
              onTouchEnd={(e) => {
                if (touchStartX == null || touchEndX == null) {
                  setTouchStartX(null);
                  setTouchEndX(null);
                  return;
                }
                const dx = touchStartX - touchEndX;
                const minSwipe = 40; // px
                if (dx > minSwipe) {
                  // swipe left -> next
                  if (imagenes.length > 1) setIndex((i) => Math.min(imagenes.length - 1, i + 1));
                } else if (dx < -minSwipe) {
                  // swipe right -> prev
                  if (imagenes.length > 1) setIndex((i) => Math.max(0, i - 1));
                }
                setTouchStartX(null);
                setTouchEndX(null);
              }}
            >
              <button
                className={`carousel-arrow left ${index === 0 ? 'hidden' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIndex((i) => Math.max(0, i - 1)); }}
                aria-label="Anterior"
                style={{ display: imagenes.length > 1 ? 'flex' : 'none' }}
              >
                ‹
              </button>

              <img
                src={imagenes[index]}
                alt={`${proyecto.title} (${index + 1} / ${imagenes.length})`}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="18"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                }}
              />

              <button
                className={`carousel-arrow right ${index === imagenes.length - 1 ? 'hidden' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIndex((i) => Math.min(imagenes.length - 1, i + 1)); }}
                aria-label="Siguiente"
                style={{ display: imagenes.length > 1 ? 'flex' : 'none' }}
              >
                ›
              </button>
              {/* dots indicators */}
              {imagenes.length > 1 && (
                <div className="carousel-dots" aria-hidden="true">
                  {imagenes.map((_, idx) => (
                    <button
                      key={idx}
                      className={`dot ${idx === index ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setIndex(idx); }}
                      aria-label={`Ir a imagen ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="carousel-placeholder">Imagen no disponible</div>
          )}
        </div>

        {/* Lado derecho: detalles del proyecto */}
        <div className="modal-right">
          <h2>{proyecto.title}</h2>
          <p className="muted">{proyecto.date}</p>
          <div className="modal-desc-wrapper">
            <div className="modal-desc" dangerouslySetInnerHTML={{ __html: proyecto.descripcion.replace(/\n/g, '<br/>') }} />
          </div>
        </div>
      </div>
    </div>
  );
}

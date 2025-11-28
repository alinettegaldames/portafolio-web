/*
  Proyectos.js
  Sección de proyectos con filtros por categoría y grilla de tarjetas.
  Aquí se muestran todos tus proyectos organizados por categoría.
*/

import React, { useState, useEffect } from 'react';
import TarjetaProyecto from './TarjetaProyecto';
import { CATEGORIAS } from '../datos';

export default function Proyectos({ proyectos, onSeleccionar }) {
  const [filtroActual, setFiltroActual] = useState('Todos');
  const [cargando, setCargando] = useState(false);

  // Simula un pequeño delay de carga cuando cambias de filtro (para demostrar useEffect)
  useEffect(() => {
    setCargando(true);
    const timer = setTimeout(() => {
      setCargando(false);
      console.log(`Proyectos filtrados por: ${filtroActual}`);
    }, 300);

    // Cleanup: limpia el timer si el componente se desmonta o si cambias de filtro
    return () => clearTimeout(timer);
  }, [filtroActual]);

  // Filtra los proyectos según la categoría seleccionada
  const proyectosFiltrados = filtroActual === 'Todos'
    ? proyectos
    : proyectos.filter(p => p.category === filtroActual);

  return (
    <section className="projects container">
      <div className="projects-header">
        <h2>PROYECTOS</h2>
        
        {/* Botones de filtro por categoría */}
        <div className="filters" role="tablist">
          {['Todos', ...CATEGORIAS].map(categoria => (
            <button
              key={categoria}
              onClick={() => setFiltroActual(categoria)}
              className={filtroActual === categoria ? 'active' : ''}
              role="tab"
              aria-selected={filtroActual === categoria}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Muestra "Cargando..." mientras se filtra */}
      {cargando ? (
        <div className="projects-loading container">
          <p>Cargando proyectos...</p>
        </div>
      ) : (
        <div className="projects-grid">
          {proyectosFiltrados.map(proyecto => (
            <TarjetaProyecto
              key={proyecto.id}
              proyecto={proyecto}
              onAbrirModal={onSeleccionar}
            />
          ))}
        </div>
      )}

      {/* Si no hay proyectos en la categoría seleccionada */}
      {!cargando && proyectosFiltrados.length === 0 && (
        <div className="projects-empty">
          <p>No hay proyectos en esta categoría aún.</p>
        </div>
      )}
    </section>
  );
}

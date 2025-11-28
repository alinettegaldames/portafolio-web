/*
  App.js
  Componente principal (raíz) que ensambla todos los componentes.
  Aquí se maneja el estado global como el proyecto seleccionado para el modal.
*/

import React, { useState } from 'react';
import Encabezado from './componentes/Encabezado';
import Hero from './componentes/Hero';
import Proyectos from './componentes/Proyectos';
import Modal from './componentes/Modal';
import Pie from './componentes/Pie';
import { PROYECTOS } from './datos';
import { descargarCV } from './utilidades';
import './styles.css';

export default function App() {
  // Estado: cuál es el proyecto seleccionado en el modal (null = sin modal visible)
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  // Manejador para abrir el modal
  const abrirModal = (proyecto) => {
    setProyectoSeleccionado(proyecto);
  };

  // Manejador para cerrar el modal
  const cerrarModal = () => {
    setProyectoSeleccionado(null);
  };

  return (
    <div className="app">
      {/* Encabezado con botón de descargar CV */}
      <Encabezado onDescargarCV={descargarCV} />

      {/* Sección Hero (principal) */}
      <Hero onDescargarCV={descargarCV} />

      {/* Sección de Proyectos con filtros */}
      <Proyectos 
        proyectos={PROYECTOS} 
        onSeleccionar={abrirModal}
      />

      {/* Modal que se abre al seleccionar un proyecto */}
      <Modal 
        proyecto={proyectoSeleccionado} 
        onCerrar={cerrarModal}
      />

      {/* Pie de página */}
      <Pie />
    </div>
  );
}

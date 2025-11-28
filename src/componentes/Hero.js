/*
  Hero.js
  Sección principal (hero) con título, subtítulo y botón principal.
  Este es el primer bloque que ve el usuario al entrar.
*/

import React, { useState } from 'react';

export default function Hero({ onDescargarCV }) {
  const [pressed, setPressed] = useState(false);

  const handleDescargarClick = (e) => {
    // efecto visual breve en el anchor
    setPressed(true);
    setTimeout(() => setPressed(false), 180);
    // dejar que el enlace proceda (no prevenir default)
  };

  return (
    <section className="hero container">
      <div className="hero-content">
        <h1 className="title">
          Portafolio <span className="accent">profesional</span>
        </h1>
        <p className="subtitle">
          Estudiante de Diseño, enfocada en crear soluciones visuales claras, 
          modernas y estéticas.
        </p>

        <div className="hero-cta">
          <button className="btn-primary">
            VER PROYECTOS DESTACADOS
          </button>
          <a
            className={`btn-ghost ${pressed ? 'pressed' : ''}`}
            href="/CV/Curriculum_vitae_Alinette_Galdames.pdf"
            download
            onClick={handleDescargarClick}
            title="Descargar CV"
            aria-label="Descargar CV"
          >
            Descargar cv
          </a>
        </div>

        <div className="intro">
          <h3>Mi enfoque</h3>
          <p>
            Soy diseñadora visual y digital, con un estilo minimalista y futurista. 
            Me gusta crear proyectos claros, estéticos y bien estructurados, desde 
            packaging hasta animación y fotografía.
          </p>
        </div>
      </div>

      <div className="hero-art" aria-hidden="true">
        {/* Decoración visual — no afecta funcionalidad */}
        <svg width="160" height="160" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <g fill="#fff" opacity="0.95">
            <path 
              d="M50 5 L55 28 L78 33 L55 38 L50 61 L45 38 L22 33 L45 28Z" 
              fill="#fff" 
              opacity="0.12" 
            />
          </g>
        </svg>
      </div>
    </section>
  );
}

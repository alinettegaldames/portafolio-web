/*
  GUÍA RÁPIDA — Cómo usar tu portafolio React

  ╔════════════════════════════════════════════════════════════════════╗
  ║                   ESTRUCTURA COMPONENTES EN ESPAÑOL                ║
  ╚════════════════════════════════════════════════════════════════════╝

  Tu aplicación está dividida en 6 componentes principales:

  ┌─ App.js (Raíz)
  │  └─ Encabezado.js (Header: logo + botón CV)
  │  └─ Hero.js (Sección principal: título + subtítulo)
  │  └─ Proyectos.js (Grid + filtros)
  │     └─ TarjetaProyecto.js (cada tarjeta)
  │  └─ Modal.js (Ventana detalle del proyecto)
  │  └─ Pie.js (Footer)

  ════════════════════════════════════════════════════════════════════════

  ╔════════════════════════════════════════════════════════════════════╗
  ║                  3 PASOS PARA AGREGAR PROYECTOS                   ║
  ╚════════════════════════════════════════════════════════════════════╝

  PASO 1: Guardar tu foto
  ────────────────────────
  • Copia tu imagen a: public/proyectos/
  • Nombre recomendado (sin espacios):
    - mi-proyecto.jpg
    - packaging-azul.jpg
    - ilustracion-01.jpg

  PASO 2: Editar src/datos.js
  ────────────────────────────
  Abre el archivo y añade esto dentro del array PROYECTOS:

    {
      id: 6,                              // ← Número único
      title: 'Mi Proyecto',               // ← Nombre del proyecto
      category: 'Packaging',              // ← Editorial, Packaging, Ilustración, Fotografía
      date: 'Noviembre 2024',             // ← Fecha
      imagen: '/proyectos/mi-proyecto.jpg',  // ← Ruta a tu imagen
      descripcion: 'Descripción del proyecto...', // ← Texto que se ve en el modal
    },

  PASO 3: ¡Listo!
  ────────────────
  Guarda el archivo y la app se actualiza automáticamente.
  Tu proyecto aparecerá en la categoría seleccionada.

  ════════════════════════════════════════════════════════════════════════

  ╔════════════════════════════════════════════════════════════════════╗
  ║            CONCEPTOS REACT EXPLICADOS (PARA EXAMEN)               ║
  ╚════════════════════════════════════════════════════════════════════╝

  1. COMPONENTES (Piezas reutilizables)
  ──────────────────────────────────────
  
  Cada archivo es un componente:
  
  function Encabezado() {
    return (
      <header>
        <div className="brand">Alinette Galdames</div>
      </header>
    );
  }

  ✅ Ventaja: Si cambias el logo, solo editas Encabezado.js
  ✅ Los otros componentes no se afectan


  2. PROPS (Paso de datos entre componentes)
  ──────────────────────────────────────────

  En App.js:
  <Encabezado onDescargarCV={descargarCV} />

  En Encabezado.js:
  export default function Encabezado({ onDescargarCV }) {
    return (
      <button onClick={onDescargarCV}>Descargar cv</button>
    );
  }

  ✅ Ventaja: El componente recibe datos "del padre"
  ✅ Reutilizable: puedes usar el mismo botón en varios lugares


  3. useState (Guardar datos que cambian)
  ────────────────────────────────────────

  En Proyectos.js:
  const [filtroActual, setFiltroActual] = useState('Packaging');

  ✅ filtroActual: valor actual (ejemplo: 'Packaging')
  ✅ setFiltroActual(): función para cambiar el valor
  ✅ useState('Packaging'): valor inicial

  Cuando haces click en un botón:
  onClick={() => setFiltroActual('Editorial')}
  → La página se actualiza mostrando solo proyectos de Editorial


  4. useEffect (Acciones cuando algo cambia)
  ──────────────────────────────────────────

  En Proyectos.js:
  useEffect(() => {
    setCargando(true);  // Muestra "Cargando..."
    const timer = setTimeout(() => {
      setCargando(false);  // Oculta después de 300ms
    }, 300);

    return () => clearTimeout(timer);  // Limpia el timer al cambiar
  }, [filtroActual]);  // Solo cuando filtroActual cambia

  ✅ Se ejecuta cuando filtroActual cambia
  ✅ El return () limpia la acción (previene memory leaks)
  ✅ Useful para: fetch de datos, timers, suscripciones, etc.

  ════════════════════════════════════════════════════════════════════════

  ╔════════════════════════════════════════════════════════════════════╗
  ║                         ARCHIVOS IMPORTANTES                       ║
  ╚════════════════════════════════════════════════════════════════════╝

  📝 PARA AGREGAR PROYECTOS:
  • src/datos.js ← AQUÍ agregas tus proyectos y fotos

  🎨 PARA CAMBIAR COLORES/ESTILOS:
  • src/App.css ← Todos los estilos CSS (busca :root para variables)

  🏗️ PARA AGREGAR COMPONENTES:
  • src/componentes/ ← Crea un nuevo .js aquí

  🎯 PUNTO DE ENTRADA:
  • src/index.js ← No toques este archivo
  • public/index.html ← No toques este archivo

  ════════════════════════════════════════════════════════════════════════

  ╔════════════════════════════════════════════════════════════════════╗
  ║                      CÓMO EJECUTAR LOCAL                           ║
  ╚════════════════════════════════════════════════════════════════════╝

  PRIMERA VEZ:
  $ npm install

  SIEMPRE:
  $ npm start
  → Abre http://localhost:3000 automáticamente

  PARA PRODUCCIÓN:
  $ npm run build
  → Genera carpeta build/ lista para subir al servidor

  ════════════════════════════════════════════════════════════════════════

  ╔════════════════════════════════════════════════════════════════════╗
  ║                    TIPS PARA TU EXAMEN                             ║
  ╚════════════════════════════════════════════════════════════════════╝

  Pregunta: "¿Cómo está organizado tu código?"
  Respuesta: "Tengo 6 componentes. Cada uno es una parte de la página.
  Así si cambio algo en Encabezado.js, no afecta a Proyectos.js"

  Pregunta: "¿Cómo agregas nuevos proyectos?"
  Respuesta: "Solo edito src/datos.js. Copio un proyecto existente,
  cambio el id, título, categoría y la ruta de la imagen. La app
  se actualiza automáticamente."

  Pregunta: "¿Para qué sirve useState?"
  Respuesta: "Para guardar datos que cambian. En mi app uso:
  - filtroActual: qué categoría está seleccionada
  - proyectoSeleccionado: cuál proyecto se abre en el modal"

  Pregunta: "¿Para qué sirve useEffect?"
  Respuesta: "Para hacer acciones cuando algo cambia. Cuando cambias
  de filtro, muestro 'Cargando...' por 300ms y luego actualizo la lista.
  El return limpia el timeout para no causar memory leaks."

*/

export default {};

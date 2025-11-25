const { useState, useEffect } = React;

// En esta seccion me ayude mediante videos que vi para poder usar el boton de descargar CV
// y asi lograr que al presionarlo pueda descargar mi curriculum vitae en formato PDF correctamente.
async function downloadCvFile(e) {
  if (e && e.preventDefault) e.preventDefault();
  const serverPath = 'CV/Curriculum_vitae_Alinette_Galdames.pdf'; // el archivo en el servidor
  const saveAs = 'Curriculum vitae Alinette Galdames.pdf'; // este es es el nombre con el que se guardara el archivo
  try {
    const res = await fetch(serverPath);
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = saveAs;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download failed:', err);
    alert('No se pudo descargar el CV. Comprueba que el servidor está corriendo.'); // este es el mensaje que aparece en caso de no encontrar el archivo
  }
}

//funcion para crear las tarjetas de los proyectos, y asi mostrar los proyectos que e realizado.
function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card" onClick={() => onOpen(project)}>
      <div
        className="thumb"
        style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="card-info">
        <span className="tag">{project.category}</span>
        <strong>{project.title}</strong>
        <div className="label-bar" />
      </div>
    </article>
  );
}


//la funcion app principal que contiene toda la logica de la aplicacion para que carguen los filtros, las recargas y la seleccion.
function App() {
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  // Cree un ejemplo de proyectos para mostrar mientras, ya que asi se verian por asi decirlo, cada uno se separara segun la categoria
  // y al presonar el boton como packaging o editorial se filtraran los proyectos que tengo y solo mostrara esos.
  const projects = [
    { id: 1, title: 'Revista NODO', category: 'Packaging', date: 'Marzo 2024', image: 'https://picsum.photos/seed/nodo/900/700', description: 'Proyecto editorial y packaging.' },
    { id: 2, title: 'Fanzine', category: 'Editorial', date: 'Octubre 2023', image: 'https://picsum.photos/seed/fanzine/900/700', description: 'Fanzine experimental con collage digital.' },
    { id: 3, title: 'Proyecto A', category: 'Packaging', date: 'Abril 2024', image: 'https://picsum.photos/seed/a/900/700', description: 'Proyecto visual aplicado a packaging.' },
  ];

  // en esta seccion hice que al momento de hacer el cambio entre categorias apareciera un diseño de Loading mientras carga.
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [filter]);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <div>
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">Alinette Galdames</div>
        </div>
      </header>

      <section className="hero container">
        <div className="hero-content">
          <h1 className="title">Portafolio <span className="accent">profesional</span></h1>
          <p className="subtitle">Estudiante de Diseño, enfocada en crear soluciones visuales claras, modernas y estéticas.</p>

          <div className="hero-cta">
            <button className="btn-primary">VER PROYECTOS DESTACADOS</button>
            <a href="#" className="btn-ghost" onClick={downloadCvFile}>Descargar cv</a>
          </div>

          <div className="intro">
            <h3>Mi enfoque</h3>
            <p>Soy diseñadora visual y digital, con un estilo minimalista y futurista. Me gusta crear proyectos claros, estéticos y bien estructurados, desde packaging hasta animación y fotografía.</p>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          {/* Decorative sparkles — purely visual */}
          <svg width="160" height="160" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <g fill="#fff" opacity="0.95">
              <path d="M50 5 L55 28 L78 33 L55 38 L50 61 L45 38 L22 33 L45 28Z" fill="#fff" opacity="0.12" />
            </g>
          </svg>
        </div>
      </section>

      <section className="projects container">
        <div className="projects-header">
          <h2>PROYECTOS</h2>
          <div className="filters" role="tablist">
            <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Todos</button>
            <button onClick={() => setFilter('Packaging')} className={filter === 'Packaging' ? 'active' : ''}>Packaging</button>
            <button onClick={() => setFilter('Editorial')} className={filter === 'Editorial' ? 'active' : ''}>Editorial</button>
            <button onClick={() => setFilter('Ilustración')} className={filter === 'Ilustración' ? 'active' : ''}>Ilustración</button>
          </div>
        </div>

        {loading ? (
          <div className="projects-loading container"><p>Cargando proyectos...</p></div>
        ) : (
          <div className="projects-grid">
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} onOpen={setSelected} />
            ))}
          </div>
        )}
      </section>

      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Alinette Galdames — Diseño &amp; Experiencias</p>
        </div>
      </footer>

      {selected && (
        <div className="modal" onClick={(e) => { if (e.target.classList.contains('modal')) setSelected(null); }}>
          <div className="modal-inner">
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            <div className="modal-left">
              <img src={selected.image} alt={selected.title} />
            </div>
            <div className="modal-right">
              <h2>{selected.title}</h2>
              <p className="muted">{selected.date}</p>
              <p>{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// en esta secion se monta la aplicacion mediante reactDOM para que cargue en el index.html y asi pueda renderizar.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// Con esto implementamos lo que se nos enseña en la Clase 8 y 9 para el uso de ReactJS

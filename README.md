

# Portafolio Web — Alinette Galdames

Portafolio profesional desarrollado con **React** como proyecto final del semestre.

## 🚀 Estructura del Proyecto

```
portafolio-web/
├── public/                    # Archivos estáticos servidos directamente
│   ├── index.html            # Archivo HTML principal
│   ├── CV/                   # Carpeta con tu currículum
│   │   └── Curriculum_vitae_Alinette_Galdames.pdf
│   └── proyectos/            # 📁 AQUÍ VAN TUS FOTOS DE PROYECTOS
│       ├── proyecto1.jpg
│       ├── packaging.jpg
│       └── ... (más imágenes)
│
├── src/                       # Código React (componentes y lógica)
│   ├── componentes/          # Componentes reutilizables
│   │   ├── Encabezado.js     # Header con logo y botón CV
│   │   ├── Hero.js           # Sección principal
│   │   ├── Proyectos.js      # Grid con filtros
│   │   ├── TarjetaProyecto.js# Cada tarjeta de proyecto
│   │   ├── Modal.js          # Modal que abre al click
│   │   └── Pie.js            # Footer
│   ├── datos.js              # 📝 AQUÍ AGREGAS TUS PROYECTOS
│   ├── utilidades.js         # Funciones auxiliares
│   ├── App.js                # Componente raíz
│   ├── App.css               # Estilos globales
│   └── index.js              # Punto de entrada
│
├── package.json              # Dependencias del proyecto
└── README.md                 # Este archivo
```

## 📝 Cómo Agregar Proyectos

### Paso 1: Copia tu foto a la carpeta correcta
1. Copia tu foto de proyecto a la carpeta `public/proyectos/`
2. Usa un nombre corto sin espacios: `mi-proyecto.jpg`, `packaging-azul.jpg`, etc.

### Paso 2: Añade el proyecto en `src/datos.js`
Abre `src/datos.js` y copia el siguiente bloque dentro del array `PROYECTOS`:

```javascript
{
  id: 6,  // Número único para cada proyecto
  title: 'Mi Nuevo Proyecto',
  category: 'Packaging',  // O: 'Editorial', 'Ilustración', 'Fotografía'
  date: 'Mes Año',
  imagen: '/proyectos/mi-proyecto.jpg',  // Ruta a tu foto
  descripcion: 'Descripción breve de lo que hiciste en este proyecto.',
},
```

**Ejemplo completo:**
```javascript
export const PROYECTOS = [
  // ... proyectos existentes ...
  
  {
    id: 6,
    title: 'Identidad Visual Startup',
    category: 'Editorial',
    date: 'Noviembre 2024',
    imagen: '/proyectos/startup.jpg',
    descripcion: 'Diseño de identidad visual completa para startup de tecnología incluyendo logo, paleta de colores e ilustraciones.',
  },
];
```

### Paso 3: ¡Listo!
Guarda el archivo y la app se actualiza automáticamente. Tu proyecto aparecerá en la sección correspondiente.

## 🎨 Estructura de Componentes

Cada sección de la página es un **componente React** independiente:

| Componente | Descripción | Archivo |
|-----------|-----------|---------|
| **Encabezado** | Logo + botón descargar CV | `src/componentes/Encabezado.js` |
| **Hero** | Título principal + subtítulo | `src/componentes/Hero.js` |
| **Proyectos** | Grid + filtros por categoría | `src/componentes/Proyectos.js` |
| **TarjetaProyecto** | Cada tarjeta individual | `src/componentes/TarjetaProyecto.js` |
| **Modal** | Ventana que se abre al click | `src/componentes/Modal.js` |
| **Pie** | Footer con año y créditos | `src/componentes/Pie.js` |

## 🎯 Conceptos React Implementados

### 1. **useState** (Estado)
```javascript
const [filtroActual, setFiltroActual] = useState('Packaging');
```
Controla el filtro activo. Cuando cambias el botón, se actualiza el estado.

### 2. **useEffect** (Efectos secundarios)
```javascript
useEffect(() => {
  setCargando(true);
  const timer = setTimeout(() => {
    setCargando(false);
  }, 300);
  return () => clearTimeout(timer);
}, [filtroActual]);
```
Simula una carga cuando cambias de categoría y **limpia** el timer al desmontar.

### 3. **Props** (Propiedades)
```javascript
<TarjetaProyecto proyecto={proyecto} onAbrirModal={setSelected} />
```
Los componentes reciben datos via props, sin "botones mágicos".

## ⚡ Cómo Ejecutar

### Instalación (primera vez)
```powershell
cd 'C:\Users\Alitas\Desktop\portafolio-web'
npm install
```

### Iniciar el servidor de desarrollo
```powershell
npm start
```
Se abrirá automáticamente en `http://localhost:3000`

### Construir para producción
```powershell
npm run build
```
Genera una carpeta `build/` lista para subir a un servidor.

## 📱 Características

✅ Diseño **responsive** (funciona en móvil y desktop)
✅ Filtros por categoría con efecto de carga
✅ Modal con imagen + detalles al hacer click
✅ Descarga de CV desde el encabezado
✅ Código en español y bien comentado
✅ Fácil de extender con nuevos proyectos

## 🔗 URLs de Referencia

- **Componentes React**: https://es.react.dev/learn/thinking-in-react
- **Hooks (useState, useEffect)**: https://es.react.dev/reference/react
- **CSS Responsive**: https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Responsive_Design

## 🎓 Para tu Examen

Puedes explicar:
1. **¿Cómo funcionan los componentes?** → Cada uno es una "pieza" de la página
2. **¿Para qué sirve useState?** → Para guardar datos que cambian (filtro, proyecto seleccionado)
3. **¿Qué es useEffect?** → Para hacer acciones cuando algo cambia (simula carga, limpia timeouts)
4. **¿Cómo agregas proyectos?** → Solo modificas `src/datos.js`, sin tocar componentes
5. **¿Por qué está todo separado?** → Porque así es más fácil cambiar un componente sin romper los demás

---

**Creado por:** Alinette Galdames
**Última actualización:** Noviembre 2024
**Notion (Solemne 3):** https://www.notion.so/Portafolio-Web-Solemne-3-2ac58a064dd48074a597c445d5e3ee41

/*
  utilidades.js
  Funciones auxiliares que se reutilizan en varios componentes.
  En este caso: descargar el CV.
*/

/**
 * Función para descargar el CV en PDF
 * Usa fetch para obtener el archivo y lo descarga con el navegador
 */
export async function descargarCV() {
  const rutaArchivo = '/CV/Curriculum_vitae_Alinette_Galdames.pdf'; // archivo en public/CV/
  const nombreDescarga = 'Curriculum vitae Alinette Galdames.pdf'; // nombre con el que se guardará

  try {
    // Intento rápido: crear un enlace directo al archivo y simular click.
    // Esto suele funcionar en la mayoría de navegadores cuando el archivo está en la misma origin.
    try {
      const enlaceDirecto = document.createElement('a');
      enlaceDirecto.href = rutaArchivo;
      enlaceDirecto.download = nombreDescarga;
      enlaceDirecto.style.display = 'none';
      document.body.appendChild(enlaceDirecto);
      enlaceDirecto.click();
      enlaceDirecto.remove();
      console.log('Intento de descarga por enlace directo (primario) realizado');
      return;
    } catch (eDirect) {
      console.warn('Enlace directo falló, intentando fetch como fallback', eDirect);
      // continúa al método fetch abajo
    }
    const respuesta = await fetch(rutaArchivo);
    
    // Si el servidor devuelve error (404, 500, etc.)
    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}: No se encontró el archivo`);
    }

    // Convierte la respuesta en un blob (archivo binario)
    const blob = await respuesta.blob();
    
    // Crea una URL temporal del blob y fuerza la descarga
    const url = window.URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = nombreDescarga;
    enlace.style.display = 'none';
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();
    window.URL.revokeObjectURL(url);
    console.log('CV descargado correctamente (fetch -> blob)');
  } catch (error) {
    console.error('Error al descargar el CV (fetch):', error);
    // Fallback 1: abrir en nueva pestaña
    try {
      const opened = window.open(rutaArchivo, '_blank', 'noopener');
      if (opened) {
        console.log('Fallback: abierto en nueva pestaña con window.open');
        return;
      }
      // si window.open fue bloqueado, intentar asignar location.href
      console.warn('window.open fue bloqueado, intentando asignar window.location.href');
      window.location.href = rutaArchivo;
      return;
    } catch (err2) {
      console.error('Fallback final falló:', err2);
      alert(`Error: No se pudo descargar el CV. ${error.message}`);
    }
  }
}


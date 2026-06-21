// =============================================
// SISTEMA DE IDIOMAS (i18n)
// =============================================

// Idioma por defecto
const IDIOMA_DEFECTO = 'es';
const IDIOMAS_DISPONIBLES = ['es', 'en', 'gl'];

// Obtenemos el idioma guardado o usamos el por defecto
function obtenerIdiomaActual() {
  return localStorage.getItem('idioma') || IDIOMA_DEFECTO;
}

// Cargamos el JSON del idioma y aplicamos las traducciones
async function cargarIdioma(idioma) {
  // Si el idioma no existe, usamos el por defecto
  if (!IDIOMAS_DISPONIBLES.includes(idioma)) {
    idioma = IDIOMA_DEFECTO;
  }

  try {
    const respuesta = await fetch('lang/' + idioma + '.json');
    const textos    = await respuesta.json();

    // Guardamos el idioma elegido
    localStorage.setItem('idioma', idioma);

    // Aplicamos las traducciones a todos los elementos con data-i18n
    aplicarTraducciones(textos);

    // Marcamos el botón activo en el selector
    actualizarSelectorIdioma(idioma);

  } catch (error) {
    console.error('Error cargando idioma:', error);
  }
}

// Recorre todos los elementos con data-i18n y sustituye el texto
function aplicarTraducciones(textos) {
  document.querySelectorAll('[data-i18n]').forEach(function(elemento) {
    const clave = elemento.getAttribute('data-i18n');

    // La clave tiene formato "seccion.subclave", ej: "hero.titulo"
    const partes = clave.split('.');
    let valor = textos;

    // Navegamos por el objeto JSON siguiendo las partes de la clave
    partes.forEach(function(parte) {
      if (valor && valor[parte] !== undefined) {
        valor = valor[parte];
      } else {
        valor = null;
      }
    });

    // Si encontramos el texto, lo aplicamos
    if (valor && typeof valor === 'string') {
      // Para inputs y textareas usamos placeholder
      if (elemento.hasAttribute('placeholder')) {
        elemento.placeholder = valor;
      } else {
        elemento.textContent = valor;
      }
    }
  });
}

// Actualiza qué botón del selector aparece como activo
function actualizarSelectorIdioma(idioma) {
  document.querySelectorAll('.idioma-btn').forEach(function(btn) {
    btn.classList.remove('activo');
    if (btn.dataset.idioma === idioma) {
      btn.classList.add('activo');
    }
  });
}

// Cambia el idioma al hacer clic en un botón
function cambiarIdioma(idioma) {
  cargarIdioma(idioma);
}

// Al cargar la página, aplicamos el idioma guardado
document.addEventListener('DOMContentLoaded', function() {
  cargarIdioma(obtenerIdiomaActual());
});

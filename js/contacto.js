// =============================================
// CONTACTO — Validación y envío del formulario
// =============================================

function enviarFormulario() {
  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const asunto  = document.getElementById('asunto').value;
  const mensaje = document.getElementById('mensaje').value.trim();

  // Validación básica — comprobamos que los campos obligatorios estén rellenos
  if (!nombre) {
    resaltarCampo('nombre', 'Por favor, escribe tu nombre');
    return;
  }
  if (!email || !email.includes('@')) {
    resaltarCampo('email', 'Por favor, escribe un email válido');
    return;
  }
  if (!mensaje) {
    resaltarCampo('mensaje', 'Por favor, escribe tu mensaje');
    return;
  }

  // Si todo es correcto, mostramos la confirmación
  // (En el futuro aquí irá el envío real al servidor con PHP)
  document.getElementById('form-confirmacion').style.display = 'block';

  // Limpiamos el formulario
  document.getElementById('nombre').value  = '';
  document.getElementById('email').value   = '';
  document.getElementById('asunto').value  = '';
  document.getElementById('mensaje').value = '';
}

// Resalta un campo con error y muestra un mensaje
function resaltarCampo(idCampo, mensajeError) {
  const campo = document.getElementById(idCampo);

  // Borde rojo en el campo
  campo.style.borderColor = '#8B2020';
  campo.focus();

  // Quitamos el borde rojo cuando el usuario empieza a escribir
  campo.addEventListener('input', function() {
    campo.style.borderColor = '';
  }, { once: true }); // { once: true } significa que solo se ejecuta una vez

  // Mostramos el error debajo del campo
  // Primero eliminamos cualquier error previo
  const errorPrevio = campo.parentNode.querySelector('.campo-error');
  if (errorPrevio) errorPrevio.remove();

  const error = document.createElement('p');
  error.className   = 'campo-error';
  error.textContent = mensajeError;
  error.style.cssText = 'font-size:12px; color:#8B2020; margin-top:4px;';
  campo.parentNode.appendChild(error);
}

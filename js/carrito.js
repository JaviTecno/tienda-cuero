// =============================================
// CARRITO DE COMPRA
// =============================================

// Cargamos el carrito desde localStorage (para que persista entre páginas)
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Al cargar la página, actualizamos el contador del menú
// Nota: en carrito.html el renderizado lo gestiona carrito-pagina.js
document.addEventListener('DOMContentLoaded', function() {
  actualizarContador();
});

// Añadir un producto al carrito
function agregarAlCarrito(nombre, precio) {
  // Buscamos si el producto ya está en el carrito
  const productoExistente = carrito.find(function(item) {
    return item.nombre === nombre;
  });

  if (productoExistente) {
    // Si ya existe, sumamos una unidad
    productoExistente.cantidad++;
  } else {
    // Si no existe, lo añadimos
    carrito.push({
      nombre: nombre,
      precio: precio,
      cantidad: 1
    });
  }

  // Guardamos en localStorage y actualizamos el contador
  guardarCarrito();
  actualizarContador();
  mostrarNotificacion(nombre);
}

// Guardar el carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualizar el número que aparece en el menú
function actualizarContador() {
  const contador = document.getElementById('contador-carrito');
  if (contador) {
    const totalUnidades = carrito.reduce(function(total, item) {
      return total + item.cantidad;
    }, 0);
    contador.textContent = totalUnidades;
  }
}

// Mostrar una pequeña notificación al añadir un producto
function mostrarNotificacion(nombre) {
  // Eliminamos notificación anterior si existe
  const anterior = document.querySelector('.notificacion');
  if (anterior) anterior.remove();

  const notificacion = document.createElement('div');
  notificacion.className = 'notificacion';
  notificacion.textContent = '"' + nombre + '" añadido al carrito';
  document.body.appendChild(notificacion);

  // La eliminamos después de 2.5 segundos
  setTimeout(function() {
    notificacion.remove();
  }, 2500);
}

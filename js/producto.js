// =============================================
// PRODUCTO — Galería, color, cantidad
// =============================================

let cantidad = 1;

// Cambia la imagen principal al hacer clic en una miniatura
function cambiarImagen(miniatura, src) {
  // Quitamos la clase activa de todas las miniaturas
  document.querySelectorAll('.miniatura').forEach(function(m) {
    m.classList.remove('activa');
  });

  // La añadimos a la miniatura clicada
  miniatura.classList.add('activa');

  // Cambiamos la imagen principal
  const imagenPrincipal = document.getElementById('imagen-principal');
  imagenPrincipal.style.opacity = '0';
  setTimeout(function() {
    imagenPrincipal.src = src;
    imagenPrincipal.style.opacity = '1';
  }, 150);
}

// Cambia el color seleccionado
function seleccionarColor(boton, nombreColor) {
  // Quitamos la clase activa de todos los botones de color
  document.querySelectorAll('.color-opcion').forEach(function(b) {
    b.classList.remove('activo');
  });

  // La añadimos al botón clicado
  boton.classList.add('activo');

  // Actualizamos el texto con el color seleccionado
  document.getElementById('color-seleccionado').textContent = nombreColor;
}

// Sube o baja la cantidad
function cambiarCantidad(valor) {
  cantidad = cantidad + valor;

  // No permitimos menos de 1
  if (cantidad < 1) cantidad = 1;

  document.getElementById('cantidad').textContent = cantidad;
}

// Añade el producto al carrito con la cantidad y color seleccionados
function añadirProducto() {
  const nombreProducto = document.querySelector('.producto-nombre').textContent;
  const precioTexto    = document.querySelector('.producto-precio').textContent;
  const color          = document.getElementById('color-seleccionado').textContent;

  // Convertimos el precio de "45,00 €" a número 45
  const precio = parseFloat(precioTexto.replace(',', '.').replace(' €', ''));

  // Añadimos tantas veces como indique la cantidad
  for (let i = 0; i < cantidad; i++) {
    agregarAlCarrito(nombreProducto + ' — ' + color, precio);
  }
}

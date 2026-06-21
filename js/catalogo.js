// =============================================
// CATÁLOGO — Filtros y ordenación
// =============================================

// Guardamos todos los productos en un array para poder filtrarlos
const productos = Array.from(document.querySelectorAll('.tarjeta-producto'));

// Escuchamos cambios en los filtros de categoría
document.querySelectorAll('input[name="categoria"]').forEach(function(radio) {
  radio.addEventListener('change', aplicarFiltros);
});

// Escuchamos cambios en los filtros de precio
document.querySelectorAll('input[name="precio"]').forEach(function(radio) {
  radio.addEventListener('change', aplicarFiltros);
});

// Función principal que aplica todos los filtros activos
function aplicarFiltros() {
  const categoriaActiva = document.querySelector('input[name="categoria"]:checked').value;
  const precioActivo    = document.querySelector('input[name="precio"]:checked').value;

  let productosVisibles = 0;

  productos.forEach(function(producto) {
    const categoria = producto.dataset.categoria;
    const precio    = parseFloat(producto.dataset.precio);

    // Comprobamos si pasa el filtro de categoría
    const pasaCategoria = (categoriaActiva === 'todos') || (categoria === categoriaActiva);

    // Comprobamos si pasa el filtro de precio
    let pasaPrecio = true;
    if (precioActivo === '0-50')   pasaPrecio = precio <= 50;
    if (precioActivo === '50-100') pasaPrecio = precio > 50 && precio <= 100;
    if (precioActivo === '100+')   pasaPrecio = precio > 100;

    // Mostramos u ocultamos según el resultado
    if (pasaCategoria && pasaPrecio) {
      producto.style.display = 'block';
      productosVisibles++;
    } else {
      producto.style.display = 'none';
    }
  });

  // Actualizamos el contador de resultados
  document.getElementById('num-productos').textContent = productosVisibles;

  // Mostramos mensaje si no hay resultados
  const sinResultados = document.getElementById('sin-resultados');
  sinResultados.style.display = productosVisibles === 0 ? 'block' : 'none';
}

// Función para ordenar los productos
function ordenarProductos(criterio) {
  const cuadricula = document.getElementById('cuadricula');

  // Convertimos el NodeList en array para poder ordenarlo
  const productosArray = Array.from(cuadricula.querySelectorAll('.tarjeta-producto'));

  productosArray.sort(function(a, b) {
    if (criterio === 'precio-asc') {
      return parseFloat(a.dataset.precio) - parseFloat(b.dataset.precio);
    }
    if (criterio === 'precio-desc') {
      return parseFloat(b.dataset.precio) - parseFloat(a.dataset.precio);
    }
    if (criterio === 'nombre') {
      const nombreA = a.querySelector('h3').textContent.trim();
      const nombreB = b.querySelector('h3').textContent.trim();
      return nombreA.localeCompare(nombreB, 'es');
    }
    return 0; // orden por defecto: no cambia nada
  });

  // Reinsertamos los productos ya ordenados en el DOM
  productosArray.forEach(function(producto) {
    cuadricula.appendChild(producto);
  });
}

// Función para limpiar todos los filtros
function limpiarFiltros() {
  document.querySelector('input[name="categoria"][value="todos"]').checked = true;
  document.querySelector('input[name="precio"][value="todos"]').checked = true;
  aplicarFiltros();
}

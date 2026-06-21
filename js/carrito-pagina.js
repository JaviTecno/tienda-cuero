// =============================================
// CARRITO — Página de carrito
// =============================================

// Renderizamos el carrito al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  renderizarCarrito();
});

function renderizarCarrito() {
  const lista   = document.getElementById('lista-carrito');
  const vacio   = document.getElementById('carrito-vacio');
  const resumen = document.getElementById('carrito-resumen');

  // Si el carrito está vacío, mostramos el mensaje y ocultamos el resumen
  if (carrito.length === 0) {
    vacio.style.display   = 'block';
    resumen.style.display = 'none';
    lista.innerHTML       = '';
    return;
  }

  // Si hay productos, ocultamos el mensaje y mostramos el resumen
  // Usamos '' (vacío) para respetar el valor del CSS en lugar de forzar 'block'
  vacio.style.display   = 'none';
  resumen.style.display = '';

  // Generamos el HTML de cada producto
  lista.innerHTML = carrito.map(function(item, indice) {
    const subtotalItem = (item.precio * item.cantidad).toFixed(2).replace('.', ',');
    return `
      <div class="carrito-item">
        <div class="carrito-item-imagen">
          <div style="background: #C4A882; width:100%; height:100%;"></div>
        </div>
        <div>
          <p class="carrito-item-nombre">${item.nombre}</p>
          <p style="font-size:13px; color:var(--color-texto-suave);">${item.precio.toFixed(2).replace('.', ',')} € / unidad</p>
          <div class="carrito-item-controles">
            <div class="carrito-item-cantidad">
              <button onclick="cambiarCantidadCarrito(${indice}, -1)">−</button>
              <span>${item.cantidad}</span>
              <button onclick="cambiarCantidadCarrito(${indice}, 1)">+</button>
            </div>
            <button class="carrito-item-eliminar" onclick="eliminarItem(${indice})">Eliminar</button>
          </div>
        </div>
        <p class="carrito-item-precio">${subtotalItem} €</p>
      </div>
    `;
  }).join('');

  actualizarResumen();
}

// Cambia la cantidad de un producto en el carrito
function cambiarCantidadCarrito(indice, valor) {
  carrito[indice].cantidad += valor;

  // Si la cantidad llega a 0, eliminamos el producto
  if (carrito[indice].cantidad <= 0) {
    carrito.splice(indice, 1);
  }

  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
}

// Elimina un producto del carrito
function eliminarItem(indice) {
  carrito.splice(indice, 1);
  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
}

// Actualiza los totales del resumen
function actualizarResumen() {
  const subtotal = carrito.reduce(function(total, item) {
    return total + (item.precio * item.cantidad);
  }, 0);

  const envio = subtotal > 80 ? 0 : 5.90;
  const total = subtotal + envio;

  document.getElementById('subtotal').textContent = subtotal.toFixed(2).replace('.', ',') + ' €';
  document.getElementById('envio').textContent    = envio === 0 ? 'Gratis' : envio.toFixed(2).replace('.', ',') + ' €';
  document.getElementById('total').textContent    = total.toFixed(2).replace('.', ',') + ' €';
}

// Confirmar pedido — genera un número de referencia y muestra mensaje
function confirmarPedido() {
  if (carrito.length === 0) return;

  const referencia = 'CA-' + Date.now().toString().slice(-6);
  const total      = document.getElementById('total').textContent;

  alert(
    '¡Pedido confirmado!\n\n' +
    'Referencia: ' + referencia + '\n' +
    'Total a pagar: ' + total + '\n\n' +
    'Por favor realiza el pago por Bizum al 666 000 000\n' +
    'o por transferencia al IBAN indicado,\n' +
    'indicando la referencia: ' + referencia + '\n\n' +
    'Te confirmaremos el pedido en menos de 24h.'
  );

  // Vaciamos el carrito tras confirmar
  carrito = [];
  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
}

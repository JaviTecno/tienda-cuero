// =============================================
// MAIN.JS — Comportamiento general
// =============================================

// Estilos de la notificación (los añadimos desde JS para no ensuciar el CSS)
const estiloNotificacion = document.createElement('style');
estiloNotificacion.textContent = `
  .notificacion {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background-color: #5C3D20;
    color: #F7F3EE;
    padding: 14px 22px;
    border-radius: 2px;
    font-size: 14px;
    z-index: 1000;
    animation: entrar 0.3s ease;
  }
  @keyframes entrar {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(estiloNotificacion);

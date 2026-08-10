// Revelado suave al hacer scroll. En "prefers-reduced-motion" el CSS ya anula
// la animación (ver .revelar en estilo.css); este script solo añade la clase.
document.addEventListener('DOMContentLoaded', function () {
  var elementos = document.querySelectorAll('.revelar');
  if (!('IntersectionObserver' in window) || elementos.length === 0) {
    elementos.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });
  elementos.forEach(function (el) { observador.observe(el); });
});

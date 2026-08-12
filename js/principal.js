// Restaurant Mediterráneo — comportamiento de la cabecera, el menú de móvil y el
// revelado al bajar. Si el usuario tiene desactivadas las animaciones, el CSS ya
// deja todo visible (ver .revelar y prefers-reduced-motion en estilo.css).

(function () {
  'use strict';

  // La clase "js" de <html> la pone un script diminuto en el <head> de cada
  // página, antes de pintar: si el JS no llega a ejecutarse, el CSS deja todo
  // visible y la página se ve igual (nunca una página en blanco).
  var cabecera = document.querySelector('.cabecera');

  // La cabecera pasa de transparente a sólida al bajar del hero. En las páginas
  // que no tienen hero ya viene con la clase "solida" puesta desde el HTML.
  if (cabecera && !cabecera.classList.contains('solida')) {
    var marcarCabecera = function () {
      cabecera.classList.toggle('compacta', window.scrollY > 40);
    };
    marcarCabecera();
    window.addEventListener('scroll', marcarCabecera, { passive: true });
  }

  // Menú de móvil
  var boton = document.querySelector('.abrir-menu');
  if (boton && cabecera) {
    boton.addEventListener('click', function () {
      var abierto = cabecera.classList.toggle('menu-abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    // Al elegir una sección, el menú se cierra solo.
    cabecera.querySelectorAll('.nav-principal a').forEach(function (enlace) {
      enlace.addEventListener('click', function () {
        cabecera.classList.remove('menu-abierto');
        boton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Revelado suave
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
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elementos.forEach(function (el) { observador.observe(el); });
})();

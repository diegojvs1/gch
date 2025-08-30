// ========== FUNCIONES MODAL EN ÁMBITO GLOBAL ==========
function abrirModal(id) {
  document.getElementById(id).style.display = 'block';
}

function cerrarModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Cerrar modal al hacer clic fuera
window.onclick = function (e) {
  document.querySelectorAll('.modal').forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
};

// ========== EVENTOS DOM ==========
document.addEventListener("DOMContentLoaded", function () {

  // ============================
  // EMAILJS: Envío de formulario
  // ============================

  const form = document.getElementById("formulario-contacto");

  if (form) {
    emailjs.init("VOhKVICvLzE7XucpD"); // Reemplaza con tu EmailJS User ID
    form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_fcqkfbm", "template_sz8e00u", this)
      .then(() => {
        abrirModal('modal-confirmacion');
        form.style.display = 'none';
        form.reset();
      }, () => {
        document.getElementById("mensaje-envio").textContent = "Ocurrió un error. Intenta nuevamente.";
      });
  });
  }

  // ============================
  // Carrusel de imágenes
  // ============================
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === i);
      dots[idx]?.classList.toggle('active', idx === i);
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  document.querySelector('.next')?.addEventListener('click', nextSlide);
  document.querySelector('.prev')?.addEventListener('click', prevSlide);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      showSlide(i);
    });
  });

  setInterval(nextSlide, 5000);

  // ============================
  // Menú hamburguesa responsive
  // ============================
  const toggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  toggle?.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // ============================
  // Toggle: ¿Por qué elegirnos?
  // ============================
  window.toggleVentaja = function (elemento) {
    const yaActiva = elemento.classList.contains('activa');

    document.querySelectorAll('.ventaja').forEach(v => {
      v.classList.remove('activa');
      v.querySelector('.descripcion').style.display = "none";
    });

    if (!yaActiva) {
      elemento.classList.add('activa');
      elemento.querySelector('.descripcion').style.display = "block";
    }
  };

  // Cerrar ventajas al hacer clic fuera
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.ventaja')) {
      document.querySelectorAll('.ventaja').forEach(v => {
        v.classList.remove('activa');
        v.querySelector('.descripcion').style.display = "none";
      });
    }
  });

  // ============================
  // Servicios - destacar activo
  // ============================
  document.querySelectorAll('.servicio').forEach(servicio => {
    servicio.addEventListener('click', function (e) {
      e.stopPropagation();
      const isActive = this.classList.contains('activo');

      document.querySelectorAll('.servicio').forEach(s => s.classList.remove('activo'));

      if (!isActive) {
        this.classList.add('activo');
      }
    });
  });

  // Cerrar servicios activos al hacer clic fuera
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.servicio')) {
      document.querySelectorAll('.servicio').forEach(s => s.classList.remove('activo'));
    }
  });
});

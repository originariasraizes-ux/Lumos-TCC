// MENU E FILTROS
let navbar = document.querySelector('.navbar');
let menuBtn = document.querySelector('#menu-btn');
let filterBtn = document.querySelector('.filter-icon');
let filters = document.getElementById('filters');

menuBtn.onclick = () => {
  navbar.classList.toggle('active');
};

filterBtn.onclick = () => {
  filters.classList.toggle('hidden');
};

window.onscroll = () => {
  navbar.classList.remove('active');
};

function toggleOption(element) {
  element.classList.toggle('active');
}

// ----------------------
// CARDS
document.addEventListener("DOMContentLoaded", function() {
  // Remove classes se necessário
  navbar.classList.remove('active');

  // Botões dos cards
  document.querySelectorAll(".card button").forEach(button => {
    button.addEventListener("click", function() {
      const page = this.closest(".card").getAttribute("data-page");
      if (page) {
        window.location.href = page;
      }
    });
  });
});

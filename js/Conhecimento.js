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

window.onload = () => {
  navbar.classList.remove('active');
};

function toggleFavorite() {
  const star = document.getElementById('fav-star');
  const favBtn = document.getElementById('fav-btn');

  if (star.style.display === 'none') {
    star.style.display = 'block';
    favBtn.innerHTML = '<i class="fas fa-star"></i> Favoritado';
    favBtn.style.backgroundColor = '#efa019';
  } else {
    star.style.display = 'none';
    favBtn.innerHTML = '<i class="far fa-star"></i> Favoritar';
    favBtn.style.backgroundColor = '#8ec3cc';
  }
}
// JavaScript: abre/fecha ao clicar
document.addEventListener('click', function(event) {
  const dropdown = document.querySelector('.dropdown');
  const btn = dropdown.querySelector('.dropbtn');
  const content = dropdown.querySelector('.dropdown-content');

  // Se clicou no botão, alterna o menu
  if (btn.contains(event.target)) {
    dropdown.classList.toggle('show');
  } 
  // Se clicou fora, fecha
  else if (!content.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});

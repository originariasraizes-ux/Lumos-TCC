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

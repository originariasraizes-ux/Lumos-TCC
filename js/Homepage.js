document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector('.header .navbar');
  const menuBtn = document.querySelector('#menu-btn');

  menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  window.addEventListener('scroll', () => {
    navbar.classList.remove('active');
  });

  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const dropBtn = dropdown.querySelector('.dropbtn');
    const dropContent = dropdown.querySelector('.dropdown-content');

    dropBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dropContent.classList.toggle('active');
    });
  });
});

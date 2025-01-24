document.addEventListener('DOMContentLoaded', function () {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu');

  // Открытие/закрытие мобильного меню
  mobileNavToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // Закрытие мобильного меню при клике на ссылку
  const navLinks = document.querySelectorAll('.navmenu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active');
      mobileNavToggle.classList.add('bi-list');
      mobileNavToggle.classList.remove('bi-x');
    });
  });
});

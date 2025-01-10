
  document.addEventListener('DOMContentLoaded', function () {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.navmenu');
    const dropdownToggles = document.querySelectorAll('.toggle-dropdown');

    // Открытие/закрытие мобильного меню
    if (mobileNavToggle && navMenu) {
      mobileNavToggle.addEventListener('click', function () {
        document.body.classList.toggle('mobile-nav-active');
        navMenu.classList.toggle('active');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
    }

    // Открытие/закрытие подменю "Palvelut"
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const parent = this.closest('.dropdown');
        parent.classList.toggle('active');
      });
    });
  });
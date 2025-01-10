document.addEventListener("DOMContentLoaded", function () {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle'); // Ищем переключатель
    const navMenu = document.querySelector('.navmenu'); // Ищем меню
  
    if (mobileNavToggle && navMenu) {
      mobileNavToggle.addEventListener('click', function () {
        // Добавляем или удаляем класс mobile-nav-active у <body>
        document.body.classList.toggle('mobile-nav-active');
        
        // Добавляем или удаляем класс active у .navmenu
        navMenu.classList.toggle('active');
        
        // Переключаем иконку между гамбургером и крестиком
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
    } else {
      console.error('Переключатель меню или navmenu не найдены.');
    }
  
    // Закрытие меню при клике на ссылки внутри меню
    document.querySelectorAll('.navmenu a').forEach(link => {
      link.addEventListener('click', function () {
        if (document.body.classList.contains('mobile-nav-active')) {
          // Убираем класс mobile-nav-active у <body>
          document.body.classList.remove('mobile-nav-active');
          
          // Убираем класс active у .navmenu
          navMenu.classList.remove('active');
          
          // Возвращаем иконку гамбургер-меню
          mobileNavToggle.classList.add('bi-list');
          mobileNavToggle.classList.remove('bi-x');
        }
      });
    });
  });
  
  
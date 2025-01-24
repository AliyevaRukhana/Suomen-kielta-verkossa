(function () {
  "use strict";

  /**
   * Добавляет класс .scrolled к body при прокрутке страницы вниз
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (!selectHeader) return;

    if (window.scrollY > 100) {
      selectBody.classList.add("scrolled");
    } else {
      selectBody.classList.remove("scrolled");
    }
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Кнопка прокрутки вверх
   */
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    function toggleScrollTop() {
      if (window.scrollY > 100) {
        scrollTop.classList.add("active");
      } else {
        scrollTop.classList.remove("active");
      }
    }

    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);
  }

  /**
   * Анимации при прокрутке
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Инициализация слайдеров Swiper
   */
  function initSwiper() {
    const swiperElements = document.querySelectorAll(".init-swiper");
    swiperElements.forEach((swiperElement) => {
      const config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );
      new Swiper(swiperElement, config);
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * Инициализация GLightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Инициализация Isotope
   */
  const isotopeLayouts = document.querySelectorAll(".isotope-layout");
  isotopeLayouts.forEach((isotopeItem) => {
    const layout = isotopeItem.getAttribute("data-layout") || "masonry";
    const filter = isotopeItem.getAttribute("data-default-filter") || "*";
    const sort = isotopeItem.getAttribute("data-sort") || "original-order";

    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      const initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );

      const filters = isotopeItem.querySelectorAll(".isotope-filters li");
      filters.forEach((filterItem) => {
        filterItem.addEventListener("click", function () {
          isotopeItem
            .querySelector(".isotope-filters .filter-active")
            .classList.remove("filter-active");
          this.classList.add("filter-active");
          initIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
        });
      });
    });
  });

  /**
   * Подсветка текущей секции меню
   */
  const navLinks = document.querySelectorAll(".navmenu a");
  function navmenuScrollspy() {
    navLinks.forEach((link) => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      const position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((activeLink) => activeLink.classList.remove("active"));
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
  document.addEventListener("scroll", navmenuScrollspy);

  /**
   * Переключение мобильного меню и подменю
   */
  document.addEventListener("DOMContentLoaded", function () {
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.querySelector("#navmenu");
    const dropdownToggles = document.querySelectorAll("#navmenu .dropdown > a");

    // Переключение мобильного меню
    if (mobileNavToggle && navMenu) {
      mobileNavToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
      });
    }

    // Переключение подменю для "Палвелут"
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        const parent = this.parentElement;

        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
          const submenu = parent.querySelector("ul");
          if (submenu) submenu.style.display = "none";
        } else {
          document
            .querySelectorAll("#navmenu .dropdown.active")
            .forEach((activeDropdown) => {
              activeDropdown.classList.remove("active");
              const activeSubmenu = activeDropdown.querySelector("ul");
              if (activeSubmenu) activeSubmenu.style.display = "none";
            });
          parent.classList.add("active");
          const submenu = parent.querySelector("ul");
          if (submenu) submenu.style.display = "block";
        }
      });
    });
  });
})();


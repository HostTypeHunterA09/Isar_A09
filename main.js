(function () {
  "use strict";

  window.addEventListener("load", function () {
    // Header toggle button
    const headerToggleBtn = document.querySelector(".header-toggle");
    if (headerToggleBtn) {
      headerToggleBtn.addEventListener("click", function () {
        document.querySelector("#header").classList.toggle("header-show");
        headerToggleBtn.classList.toggle("bi-list");
        headerToggleBtn.classList.toggle("bi-x");
      });
    }

    // Close header on nav menu click
    document.querySelectorAll("#navmenu a").forEach(function (navLink) {
      navLink.addEventListener("click", function () {
        if (document.querySelector("#header").classList.contains("header-show")) {
          document.querySelector("#header").classList.remove("header-show");
          headerToggleBtn.classList.toggle("bi-list");
          headerToggleBtn.classList.toggle("bi-x");
        }
      });
    });

    // Remove preloader if exists
    const preloader = document.querySelector("#preloader");
    if (preloader) {
      preloader.remove();
    }

    // Scroll top button functionality
    const scrollTop = document.querySelector(".scroll-top");
    function toggleScrollTop() {
      if (scrollTop) {
        scrollTop.classList.toggle("active", window.scrollY > 100);
      }
    }
    if (scrollTop) {
      scrollTop.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    toggleScrollTop();
    document.addEventListener("scroll", toggleScrollTop);
    window.addEventListener("load", toggleScrollTop);

    // Body scroll class for sticky headers
    function toggleScrolled() {
      const selectBody = document.querySelector("body");
      const selectHeader = document.querySelector("#header");
      if (!selectHeader.classList.contains("scroll-up-sticky") &&
          !selectHeader.classList.contains("sticky-top") &&
          !selectHeader.classList.contains("fixed-top")) return;

      window.scrollY > 100 ? selectBody.classList.add("scrolled") : selectBody.classList.remove("scrolled");
    }

    toggleScrolled();
    document.addEventListener("scroll", toggleScrolled);
    window.addEventListener("load", toggleScrolled);

    // Mobile nav toggle
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener("click", function () {
        document.querySelector("body").classList.toggle("mobile-nav-active");
        mobileNavToggleBtn.classList.toggle("bi-list");
        mobileNavToggleBtn.classList.toggle("bi-x");
      });
    }

    // AOS animation
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });

    // GLightbox init
    if (typeof GLightbox !== "undefined") {
      GLightbox({
        selector: ".glightbox"
      });
    }

    // PureCounter init
    if (typeof PureCounter !== "undefined") {
      new PureCounter();
    }
  });
})();

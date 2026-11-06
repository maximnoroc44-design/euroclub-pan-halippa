(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (navToggle && mainNav) {
    const closeMenu = () => {
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
      body.classList.remove("menu-open");
    };

    navToggle.addEventListener("click", () => {
      const opening = !mainNav.classList.contains("is-open");
      navToggle.classList.toggle("is-open", opening);
      navToggle.setAttribute("aria-expanded", String(opening));
      mainNav.classList.toggle("is-open", opening);
      body.classList.toggle("menu-open", opening);
    });

    mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mainNav.classList.contains("is-open")) closeMenu();
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll("[data-current-year]").forEach((item) => {
    item.textContent = String(new Date().getFullYear());
  });

  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const lightboxCaption = document.querySelector("[data-lightbox-caption]");
  const galleryButtons = Array.from(document.querySelectorAll(".gallery-card"));
  let activeGalleryItems = galleryButtons;
  let currentImageIndex = 0;

  const showLightboxImage = (index) => {
    if (!activeGalleryItems.length) return;
    currentImageIndex = (index + activeGalleryItems.length) % activeGalleryItems.length;
    const item = activeGalleryItems[currentImageIndex];
    lightboxImage.src = item.dataset.image || "";
    lightboxImage.alt = item.dataset.alt || "";
    lightboxCaption.textContent = item.dataset.caption || "";
  };

  const openLightbox = (item) => {
    if (!lightbox || !item) return;
    activeGalleryItems = galleryButtons.filter((galleryItem) => !galleryItem.classList.contains("is-filtered-out"));
    const selectedIndex = activeGalleryItems.indexOf(item);
    showLightboxImage(selectedIndex >= 0 ? selectedIndex : 0);
    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
    } else {
      lightbox.setAttribute("open", "");
    }
    body.classList.add("dialog-open");
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    if (typeof lightbox.close === "function") {
      lightbox.close();
    } else {
      lightbox.removeAttribute("open");
    }
    body.classList.remove("dialog-open");
  };

  galleryButtons.forEach((item) => {
    item.addEventListener("click", () => openLightbox(item));
  });

  const imageLaunches = document.querySelectorAll("[data-open-image]");
  imageLaunches.forEach((launch) => {
    launch.addEventListener("click", (event) => {
      event.preventDefault();
      const index = Number(launch.dataset.openImage);
      openLightbox(galleryButtons[index]);
    });
  });

  document.querySelectorAll("[data-close-lightbox]").forEach((button) => {
    button.addEventListener("click", closeLightbox);
  });
  document.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => showLightboxImage(currentImageIndex - 1));
  document.querySelector("[data-lightbox-next]")?.addEventListener("click", () => showLightboxImage(currentImageIndex + 1));

  lightbox?.addEventListener("close", () => body.classList.remove("dialog-open"));
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  const galleryFilters = document.querySelectorAll("[data-filter]");
  galleryFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const selectedAlbum = filter.dataset.filter;
      galleryFilters.forEach((button) => {
        const selected = button === filter;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      galleryButtons.forEach((item) => {
        const shouldHide = selectedAlbum !== "all" && item.dataset.album !== selectedAlbum;
        item.classList.toggle("is-filtered-out", shouldHide);
      });
    });
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox?.open) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showLightboxImage(currentImageIndex - 1);
    if (event.key === "ArrowRight") showLightboxImage(currentImageIndex + 1);
  });

  const signupDialog = document.querySelector("#signup-dialog");
  const openSignup = () => {
    if (!signupDialog) return;
    if (typeof signupDialog.showModal === "function") {
      signupDialog.showModal();
    } else {
      signupDialog.setAttribute("open", "");
    }
    body.classList.add("dialog-open");
  };
  const closeSignup = () => {
    if (!signupDialog) return;
    if (typeof signupDialog.close === "function") {
      signupDialog.close();
    } else {
      signupDialog.removeAttribute("open");
    }
    body.classList.remove("dialog-open");
  };

  document.querySelectorAll("[data-open-signup]").forEach((button) => {
    button.addEventListener("click", openSignup);
  });
  document.querySelectorAll("[data-close-signup]").forEach((button) => {
    button.addEventListener("click", closeSignup);
  });
  signupDialog?.addEventListener("close", () => body.classList.remove("dialog-open"));
})();

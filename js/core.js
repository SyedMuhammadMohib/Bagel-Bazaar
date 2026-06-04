/**
 * Bagel Bazaar Monroe — shared core (nav, loader, motion, transitions)
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  if (typeof gsap === "undefined") {
    document.body.classList.remove("is-loading");
    document.getElementById("loader")?.remove();
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  const motion = window.BagelMotion;
  const prefersReducedMotion = motion?.reduced ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RING_CIRC = 326.73;

  const loader = document.getElementById("loader");
  const loaderProgress = document.getElementById("loader-progress");
  const loaderRing = document.getElementById("loader-ring");
  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const page = document.getElementById("page");
  const yearEl = document.getElementById("year");
  const transition = document.getElementById("page-transition");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const pageId = document.body.dataset.page;
  if (pageId) {
    document.querySelectorAll(`[data-nav="${pageId}"]`).forEach((el) => el.classList.add("is-active"));
  }

  /* Loader */
  function initLoader() {
    return new Promise((resolve) => {
      if (prefersReducedMotion || !loader) {
        document.body.classList.remove("is-loading");
        loader?.remove();
        resolve();
        return;
      }

      let exited = false;
      const progress = { value: 0 };

      if (loaderRing) {
        gsap.set(loaderRing, { strokeDasharray: RING_CIRC, strokeDashoffset: RING_CIRC });
      }

      gsap.timeline()
        .to(progress, {
          value: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            const v = Math.round(progress.value);
            if (loaderProgress) loaderProgress.textContent = v;
            if (loaderRing) {
              loaderRing.style.strokeDashoffset = RING_CIRC - (progress.value / 100) * RING_CIRC;
            }
          },
          onComplete: exitLoader,
        })
        .from(".loader__logo", { scale: 0.5, opacity: 0, rotation: -12, duration: 0.7, ease: "back.out(1.9)" }, 0.08)
        .from(".loader__brand", { y: 14, opacity: 0, duration: 0.45 }, 0.4)
        .from(".loader__location", { y: 10, opacity: 0, duration: 0.4 }, 0.5)
        .from(".loader__tagline", { opacity: 0, duration: 0.35 }, 0.6);

      function exitLoader() {
        if (exited) return;
        exited = true;
        gsap.timeline({
          onComplete: () => {
            loader.remove();
            document.body.classList.remove("is-loading");
            ScrollTrigger.refresh();
            resolve();
          },
        })
          .to(".loader__content", { scale: 1.08, opacity: 0, duration: 0.5, ease: "power2.in" })
          .to(".loader__backdrop", { opacity: 0, duration: 0.4 }, "-=0.3")
          .fromTo(page, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.25");
      }

      setTimeout(exitLoader, 3000);
    });
  }

  /* Navigation */
  function initNav() {
    ScrollTrigger.create({
      start: 48,
      end: 99999,
      onEnter: () => header?.classList.add("is-scrolled"),
      onLeaveBack: () => header?.classList.remove("is-scrolled"),
    });

    navToggle?.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      mobileMenu?.toggleAttribute("hidden", open);
      document.body.classList.toggle("nav-open", !open);
      if (!prefersReducedMotion && mobileMenu) {
        if (!open) {
          gsap.fromTo(mobileMenu.querySelectorAll("a"), { x: -16, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.04, duration: 0.35, ease: "power2.out" });
        }
      }
    });

    mobileMenu?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle?.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("hidden", "");
        document.body.classList.remove("nav-open");
      });
    });
  }

  function playPageEntry() {
    if (prefersReducedMotion || !transition || !sessionStorage.getItem("bb-page-enter")) return;
    sessionStorage.removeItem("bb-page-enter");
    const panelLeft = transition.querySelector(".page-transition__panel--left");
    const panelRight = transition.querySelector(".page-transition__panel--right");
    const brand = transition.querySelector(".page-transition__brand");
    gsap.set(transition, { autoAlpha: 1, visibility: "visible" });
    if (panelLeft) gsap.set(panelLeft, { scaleY: 1, transformOrigin: "bottom center" });
    if (panelRight) gsap.set(panelRight, { scaleY: 1, transformOrigin: "top center" });
    if (brand) gsap.set(brand, { autoAlpha: 0, scale: 0.85 });
    gsap.timeline({ onComplete: () => gsap.set(transition, { autoAlpha: 0, visibility: "hidden" }) })
      .fromTo(page, { autoAlpha: 0.85, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, 0.08)
      .to(brand, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power2.out" }, 0)
      .to(brand, { autoAlpha: 0, scale: 1.05, duration: 0.25, ease: "power2.in" }, 0.28)
      .to(panelLeft, { scaleY: 0, duration: 0.55, ease: "power3.inOut" }, 0.12)
      .to(panelRight, { scaleY: 0, duration: 0.55, ease: "power3.inOut" }, 0.16);
  }

  /* Premium page transitions */
  function initPageTransitions() {
    if (prefersReducedMotion || !transition) return;

    const panelLeft = transition.querySelector(".page-transition__panel--left");
    const panelRight = transition.querySelector(".page-transition__panel--right");
    const brand = transition.querySelector(".page-transition__brand");

    gsap.set(transition, { autoAlpha: 0, visibility: "hidden" });
    if (panelLeft) gsap.set(panelLeft, { scaleY: 0, transformOrigin: "top center" });
    if (panelRight) gsap.set(panelRight, { scaleY: 0, transformOrigin: "bottom center" });
    if (brand) gsap.set(brand, { autoAlpha: 0, scale: 0.8 });

    document.querySelectorAll('a[data-transition="page"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#") || link.target === "_blank") return;
        e.preventDefault();

        sessionStorage.setItem("bb-page-enter", "1");

        gsap.timeline({ onComplete: () => { window.location.href = href; } })
          .to(page, { autoAlpha: 0.5, y: 8, duration: 0.28, ease: "power2.in" }, 0)
          .set(transition, { autoAlpha: 1, visibility: "visible" }, 0.05)
          .to(panelLeft, { scaleY: 1, duration: 0.48, ease: "power3.inOut" }, 0.05)
          .to(panelRight, { scaleY: 1, duration: 0.48, ease: "power3.inOut" }, 0.1)
          .to(brand, { autoAlpha: 1, scale: 1, duration: 0.32, ease: "back.out(1.6)" }, 0.22)
          .to(brand, { autoAlpha: 0, scale: 1.08, duration: 0.28, ease: "power2.in" }, 0.52);
      });
    });
  }

  /* Legacy hero for non-cinema pages */
  function initHero() {
    const hero = document.querySelector(".hero:not(.hero--cinema)");
    if (!hero || prefersReducedMotion) return;

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".hero__eyebrow", { y: 16, autoAlpha: 0, duration: 0.5 }, 0.15)
      .from(".hero__title", { y: 32, autoAlpha: 0, duration: 0.75 }, 0.25)
      .from(".hero__lead", { y: 20, autoAlpha: 0, duration: 0.55 }, 0.4)
      .from(".hero__actions .btn", { y: 16, autoAlpha: 0, stagger: 0.08, duration: 0.45 }, 0.5)
      .from(".hero__media", { scale: 1.06, autoAlpha: 0, duration: 0.9 }, 0.2);
  }

  /* Page hero line reveals */
  function initPageHeroReveals() {
    if (prefersReducedMotion) return;
    document.querySelectorAll(".page-hero .line-inner").forEach((line, i) => {
      gsap.fromTo(line, { yPercent: 100 }, { yPercent: 0, duration: 0.8, delay: 0.15 + i * 0.08, ease: "power3.out" });
    });
  }

  function initHeroVideo() {
    const video = document.querySelector(".hero__video");
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      video.removeAttribute("autoplay");
      return;
    }

    const play = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    play();

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) play();
            else video.pause();
          });
        },
        { threshold: 0.05 }
      );
      io.observe(video);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) video.pause();
      else if (video.getBoundingClientRect().bottom > 0) play();
    });
  }

  async function boot() {
    initNav();
    initPageTransitions();
    await initLoader();
    playPageEntry();
    initHero();
    initHeroVideo();
    initPageHeroReveals();
    if (motion) motion.initAll();
    if (typeof window.initVisualMenu === "function") window.initVisualMenu();
    if (window.BagelInteractions) window.BagelInteractions.initAll();
    if (window.BagelFeatures) window.BagelFeatures.initAll();
    if (window.BagelCart) window.BagelCart.init();
    ScrollTrigger.refresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

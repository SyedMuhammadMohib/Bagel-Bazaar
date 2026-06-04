/**
 * Bagel Bazaar Monroe — Immersive Motion System
 * GSAP + ScrollTrigger · transforms/opacity only · matchMedia
 */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;

  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const loader = document.getElementById("loader");
  const loaderProgress = document.getElementById("loader-progress");
  const loaderRing = document.getElementById("loader-ring");
  const page = document.getElementById("page");
  const yearEl = document.getElementById("year");

  const ORDER_URL = "https://www.bagelbazaarmonroe.com/OrderOnline.tpl";
  const MENU_URL = "https://www.bagelbazaarmonroe.com/ShowMenu.tpl";

  const RING_CIRC = 326.73; /* 2 * PI * 52 */

  /* ==================================================================
     LOADER — branded intro, fast exit
     ================================================================== */
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
      const duration = 1.5;

      if (loaderRing) {
        gsap.set(loaderRing, { strokeDasharray: RING_CIRC, strokeDashoffset: RING_CIRC });
      }

      gsap.timeline().to(progress, {
        value: 100,
        duration,
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
        .from(".loader__logo", { scale: 0.55, opacity: 0, duration: 0.65, ease: "back.out(1.8)" }, 0.15)
        .from(".loader__seed", { scale: 0, opacity: 0, stagger: 0.12, duration: 0.5, ease: "back.out(2)" }, 0.2)
        .from(".loader__brand", { y: 12, opacity: 0, duration: 0.5 }, 0.4)
        .from(".loader__location", { y: 8, opacity: 0, duration: 0.4 }, 0.55)
        .from(".loader__tagline", { y: 6, opacity: 0, duration: 0.4 }, 0.65);

      function exitLoader() {
        if (exited) return;
        exited = true;

        const exitTl = gsap.timeline({
          onComplete: () => {
            loader.setAttribute("aria-busy", "false");
            loader.remove();
            document.body.classList.remove("is-loading");
            ScrollTrigger.refresh();
            resolve();
          },
        });

        exitTl.to(".loader__content", { scale: 1.08, opacity: 0, duration: 0.5, ease: "power2.in" });
        exitTl.to(".loader__backdrop", { opacity: 0, duration: 0.4 }, "-=0.3");
        exitTl.fromTo("#hero", { scale: 1.04 }, { scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.35");
        exitTl.fromTo(page, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, "-=0.7");
      }

      setTimeout(exitLoader, 3500);
    });
  }

  /* ==================================================================
     NAVIGATION
     ================================================================== */
  function initNav() {
    ScrollTrigger.create({
      start: 60,
      end: 99999,
      onUpdate: (self) => {
        header.classList.toggle("is-scrolled", self.scroll() > 40);
      },
    });

    ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom 80px",
      onEnter: () => header.classList.add("hero-passed"),
      onLeaveBack: () => header.classList.remove("hero-passed"),
    });

    navToggle?.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      mobileMenu.hidden = open;
      if (!open) {
        gsap.from(mobileMenu.querySelectorAll("a, .btn"), {
          y: 16,
          opacity: 0,
          stagger: 0.05,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    });

    mobileMenu?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
      });
    });
  }

  /* ==================================================================
     CURSOR GLOW — desktop only
     ================================================================== */
  function initCursorGlow() {
    const glow = document.getElementById("cursor-glow");
    if (!glow || !isFinePointer || prefersReducedMotion) return;

    document.body.classList.add("has-cursor-glow");
    const xTo = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3" });

    window.addEventListener(
      "mousemove",
      (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      },
      { passive: true }
    );
  }

  /* ==================================================================
     3D HERO SCENE — parallax scroll + mouse tilt
     ================================================================== */
  function initHero3D() {
    const scene = document.getElementById("hero-scene");
    const stage = scene?.querySelector(".hero-scene__stage");
    if (!scene || !stage || prefersReducedMotion) return;

    /* Ambient float loops */
    gsap.to(".scene-layer--coffee", {
      y: -18,
      rotation: 3,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(".scene-layer--bagel", {
      y: -14,
      rotation: -4,
      duration: 3.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5,
    });

    gsap.to(".scene-layer--sandwich", {
      y: -10,
      rotation: 2,
      duration: 4.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1,
    });

    gsap.to(".scene-card--hero", {
      y: -8,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    /* Scroll parallax on layers */
    scene.querySelectorAll("[data-depth]").forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth) || 0.3;
      gsap.to(layer, {
        y: () => depth * 80,
        z: () => depth * 40,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    /* Hero content parallax out */
    gsap.to(".hero-content", {
      y: 80,
      opacity: 0.4,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(".hero-scene", {
      y: -40,
      scale: 0.95,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    /* Mouse tilt on desktop */
    if (isFinePointer && isDesktop) {
      const rotXTo = gsap.quickTo(stage, "rotationX", { duration: 0.8, ease: "power3" });
      const rotYTo = gsap.quickTo(stage, "rotationY", { duration: 0.8, ease: "power3" });

      scene.addEventListener("mousemove", (e) => {
        const rect = scene.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        rotYTo(x * 12);
        rotXTo(-y * 8);
      });

      scene.addEventListener("mouseleave", () => {
        rotXTo(0);
        rotYTo(0);
      });
    }

    /* Scroll hint fade */
    gsap.to(".hero-scroll-hint", {
      opacity: 0,
      y: 10,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "20% top",
        scrub: true,
      },
    });
  }

  /* ==================================================================
     HERO ENTRANCE — after loader
     ================================================================== */
  function initHeroEntrance() {
    if (prefersReducedMotion) {
      gsap.set(".split-reveal, .scene-layer, .hero-scroll-hint", { clearProps: "all", opacity: 1 });
      return;
    }

    gsap.set(".split-reveal", { y: 56, opacity: 0 });
    gsap.set(".scene-layer", { z: -160, opacity: 0, scale: 0.8 });
    gsap.set(".hero-scroll-hint", { opacity: 0, y: 10 });
    gsap.set(".hero-float-card", { y: 24, opacity: 0 });
    gsap.set(".hero-scene-frame__ring", { scale: 0.92, opacity: 0 });
    gsap.utils.toArray(".section-header h2 .line").forEach((line) => {
      gsap.set(line, { y: "110%" });
    });

    const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power4.out" } });

    tl.to(".split-reveal", {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.07,
    });

    tl.to(
      ".scene-layer--glow",
      { z: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      "-=0.6"
    );
    tl.to(
      ".scene-layer--main",
      { z: 40, opacity: 1, scale: 1, duration: 1.1, ease: "back.out(1.4)" },
      "-=0.9"
    );
    tl.to(
      ".scene-layer--coffee",
      { z: 80, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    );
    tl.to(
      ".scene-layer--sandwich",
      { z: 60, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.85"
    );
    tl.to(
      ".scene-layer--bagel",
      { z: 100, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.9"
    );
    tl.to(".hero-scroll-hint", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
    tl.to(".hero-float-card", { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5");
    tl.to(".hero-scene-frame__ring", { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }, "-=0.9");
  }

  function initHeadingLines() {
    if (prefersReducedMotion) return;

    gsap.utils.toArray(".section-header h2 .line").forEach((line) => {
      gsap.to(line, {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: line.closest(".section-header") || line,
          start: "top 85%",
          once: true,
        },
      });
    });
  }

  function initHeroOrbs() {
    if (prefersReducedMotion || !isFinePointer) return;

    document.querySelectorAll(".hero-orb").forEach((orb) => {
      const depth = parseFloat(orb.dataset.parallax) || 0.1;
      const xTo = gsap.quickTo(orb, "x", { duration: 1.2, ease: "power3" });
      const yTo = gsap.quickTo(orb, "y", { duration: 1.2, ease: "power3" });

      window.addEventListener(
        "mousemove",
        (e) => {
          const cx = (e.clientX / window.innerWidth - 0.5) * depth * 80;
          const cy = (e.clientY / window.innerHeight - 0.5) * depth * 60;
          xTo(cx);
          yTo(cy);
        },
        { passive: true }
      );
    });
  }

  function initSectionNumbers() {
    if (prefersReducedMotion) return;

    gsap.utils.toArray(".section-num").forEach((num) => {
      gsap.from(num, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: num.closest("section") || num,
          start: "top 80%",
          once: true,
        },
      });
    });
  }

  /* ==================================================================
     SCROLL REVEALS — clip masks, depth, section flow
     ================================================================== */
  function initScrollReveals() {
    if (prefersReducedMotion) {
      gsap.set(".reveal-up, .reveal-depth, .mask-reveal", { clearProps: "all", opacity: 1 });
      return;
    }

    gsap.set(".reveal-up", { y: 56, opacity: 0 });
    gsap.set(".reveal-depth", { y: 40, opacity: 0, rotateX: 8, transformPerspective: 800 });
    gsap.set(".mask-reveal", { clipPath: "inset(100% 0 0 0)" });

    ScrollTrigger.batch(".reveal-up", {
      start: "top 90%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
        });
      },
    });

    ScrollTrigger.batch(".reveal-depth", {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        });
      },
    });

    ScrollTrigger.batch(".mask-reveal", {
      start: "top 85%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.inOut",
        });
      },
    });

    /* Section flow — one-time depth entrance (no scrub fade-back) */
    document.querySelectorAll(".section-flow .container").forEach((container) => {
      gsap.from(container, {
        y: 48,
        scale: 0.97,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.closest(".section-flow") || container,
          start: "top 82%",
          once: true,
        },
      });
    });
  }

  /* ==================================================================
     CINEMATIC DAY STORY — pinned breakfast → lunch
     ================================================================== */
  function initDayStory() {
    const story = document.querySelector(".day-story");
    const morning = document.querySelector(".day-panel--morning");
    const lunch = document.querySelector(".day-panel--lunch");
    const titleMorning = document.querySelector(".day-title--morning");
    const titleLunch = document.querySelector(".day-title--lunch");
    const scrubFill = document.getElementById("day-scrub-fill");
    const scrubThumb = document.getElementById("day-scrub-thumb");

    if (!story || !morning || !lunch) return;

    if (prefersReducedMotion || !isDesktop) {
      gsap.set(lunch, { opacity: 1 });
      gsap.from(lunch, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: lunch, start: "top 85%", once: true },
      });
      if (titleLunch) gsap.set(titleLunch, { opacity: 1, position: "relative" });
      return;
    }

    gsap.set(titleLunch, { opacity: 0, y: 20 });
    gsap.set(lunch, { opacity: 0, scale: 1.08 });
    gsap.set(morning, { scale: 1 });
    if (scrubFill) gsap.set(scrubFill, { scaleX: 0, transformOrigin: "left center" });
    if (scrubThumb) gsap.set(scrubThumb, { left: "0%" });

    const storyTl = gsap.timeline({
      scrollTrigger: {
        trigger: story,
        start: "top top",
        end: "+=150%",
        pin: ".day-story__pin",
        scrub: 1,
        anticipatePin: 1,
      },
    });

    storyTl
      .to(morning, { scale: 0.92, opacity: 0.25, duration: 1, ease: "power1.inOut" })
      .to(lunch, { opacity: 1, scale: 1, duration: 1, ease: "power1.inOut" }, 0)
      .to(titleMorning, { opacity: 0, y: -16, duration: 0.5 }, 0.3)
      .to(titleLunch, { opacity: 1, y: 0, duration: 0.5 }, 0.5);

    if (scrubFill) {
      storyTl.to(scrubFill, { scaleX: 1, duration: 1, ease: "none" }, 0);
    }
    if (scrubThumb) {
      storyTl.to(scrubThumb, { left: "100%", duration: 1, ease: "none" }, 0);
    }
  }

  /* ==================================================================
     VISUAL MENU — data-driven cards (see menu.js)
     ================================================================== */
  function initMenuTabs() {
    if (typeof window.initVisualMenu === "function") {
      window.initVisualMenu();
    }
  }

  /* ==================================================================
     MICRO-INTERACTIONS — tilt cards, magnetic buttons, stats
     ================================================================== */
  function initMicroInteractions() {
    /* Card tilt — desktop only */
    if (isFinePointer && !prefersReducedMotion) {
      document.querySelectorAll("[data-tilt]").forEach((card) => {
        const shine = card.querySelector(".fav-card__glow");
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 8,
            rotateX: -y * 6,
            y: -8,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 800,
          });
          if (shine) {
            gsap.to(shine, { opacity: 0.6, x: x * 20, y: y * 20, duration: 0.3 });
          }
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, duration: 0.5, ease: "power2.out" });
          if (shine) gsap.to(shine, { opacity: 0, duration: 0.3 });
        });
      });
    }

    /* Touch feedback */
    document.querySelectorAll(".fav-card, .btn-magnetic").forEach((el) => {
      el.addEventListener(
        "touchstart",
        () => el.classList.add("is-pressed"),
        { passive: true }
      );
      el.addEventListener("touchend", () => {
        setTimeout(() => el.classList.remove("is-pressed"), 120);
      });
    });

    /* Magnetic buttons — subtle pull on desktop */
    if (isFinePointer && !prefersReducedMotion) {
      document.querySelectorAll(".btn-magnetic").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.15, y: y * 0.2, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
        });
      });
    }

    /* Animated stat counters */
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      ScrollTrigger.create({
        trigger: el.closest(".stats-bar") || el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (prefersReducedMotion) {
            el.textContent = target + "+";
            return;
          }
          gsap.to(
            { val: 0 },
            {
              val: target,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function () {
                el.textContent = Math.round(this.targets()[0].val) + "+";
              },
            }
          );
        },
      });
    });

    /* Catering parallax depth */
    if (!prefersReducedMotion) {
      gsap.to(".catering-visual img", {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".catering-visual",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
      gsap.set(".catering-visual img", { scale: 1.12 });
    }
  }

  /* ==================================================================
     ORDER LINKS — live QuikChow ordering
     ================================================================== */
  function initOrderLinks() {
    document.querySelectorAll(".btn-order").forEach((link) => {
      link.setAttribute("href", ORDER_URL);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }

  /* ==================================================================
     BACKGROUND PARALLAX — hero ambient layers
     ================================================================== */
  function initAmbientParallax() {
    if (prefersReducedMotion) return;

    document.querySelectorAll("[data-parallax]").forEach((layer) => {
      const speed = parseFloat(layer.dataset.parallax) || 0.2;
      gsap.to(layer, {
        y: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  /* ==================================================================
     BOOT
     ================================================================== */
  async function boot() {
    initNav();
    initOrderLinks();
    initCursorGlow();

    await initLoader();

    initHeroEntrance();
    initHero3D();
    initHeroOrbs();
    initHeadingLines();
    initSectionNumbers();
    initAmbientParallax();
    initScrollReveals();
    initDayStory();
    initMenuTabs();
    initMicroInteractions();

    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

    ScrollTrigger.addEventListener("refreshInit", () => {
      const active = document.querySelector(".menu-tab.active");
      const indicator = document.getElementById("menu-indicator");
      const browser = document.querySelector(".menu-browser");
      if (active && indicator && browser) {
        const br = browser.getBoundingClientRect();
        const tr = active.getBoundingClientRect();
        gsap.set(indicator, {
          x: tr.left - br.left + browser.scrollLeft,
          width: tr.width,
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

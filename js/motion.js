/**
 * Bagel Bazaar — Premium Motion Design System (performance-optimized)
 */
window.BagelMotion = (function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const mobile = window.matchMedia("(max-width: 767px)").matches;

  function canAnimate() {
    return typeof gsap !== "undefined" && !reduced;
  }

  function onceReveal(target, from, to, trigger) {
    gsap.fromTo(target, from, {
      ...to,
      scrollTrigger: { trigger, start: "top 88%", once: true },
    });
  }

  /* ── Line mask text reveals ── */
  function initLineMasks(root) {
    if (!canAnimate()) return;
    const scope = root || document;
    scope.querySelectorAll(".line-mask .line-inner").forEach((line) => {
      if (line.closest(".hero--cinema")) return;
      onceReveal(line, { yPercent: 110 }, { yPercent: 0, duration: 0.75, ease: "power3.out" }, line.closest(".line-mask"));
    });
  }

  /* ── Image reveals (transform/opacity only — no clip-path on photos) ── */
  function initClipReveals(root) {
    if (!canAnimate()) return;
    const scope = root || document;
    scope.querySelectorAll("[data-clip-reveal]").forEach((wrap) => {
      if (wrap.closest(".hero--cinema")) return;
      const inner = wrap.querySelector(".clip-reveal__inner, img, .hero__clip");
      const target = inner || wrap;
      onceReveal(
        target,
        { autoAlpha: 0, y: 24, scale: 1.04 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out", clearProps: "transform" },
        wrap
      );
    });
  }

  /* ── Batched scroll reveals ── */
  function initPremiumReveals() {
    if (!canAnimate()) return;

    ScrollTrigger.batch("[data-reveal]", {
      start: "top 90%",
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.05,
            ease: "power3.out",
            overwrite: true,
          }
        );
      },
    });

    gsap.utils.toArray("[data-reveal-stagger]").forEach((group) => {
      const items = group.querySelectorAll("[data-reveal-item]");
      onceReveal(
        items,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: { each: 0.06, from: "start" },
          ease: "power3.out",
        },
        group
      );
    });
  }

  /* ── Hero scroll — single lightweight scrub ── */
  function initHeroScrollScrub() {
    if (!canAnimate()) return;
    const hero = document.querySelector(".hero--video");
    if (!hero) return;

    const content = hero.querySelector(".hero__content");
    if (!content) return;

    gsap.to(content, {
      y: mobile ? 24 : 48,
      autoAlpha: mobile ? 0.65 : 0.45,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
    });
  }

  /* ── Scene bridges — static gradients (no scroll scrub) ── */
  function initSceneBridges() {
    /* Visual only via CSS; scroll scrub removed for performance */
  }

  /* ── Pinned story — disabled (pin + scrub caused heavy scroll jank) ── */
  function initPinnedSections() {
    /* Intentionally empty */
  }

  /* ── Section depth — one-shot fade instead of scrub ── */
  function initSectionDepth() {
    if (!canAnimate()) return;
    ScrollTrigger.batch("[data-section-depth]", {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.04, ease: "power3.out" }
        );
      },
    });
  }

  /* ── Cursor ambient glow (quickTo — no per-frame tween spam) ── */
  function initCursorGlow() {
    const glow = document.getElementById("cursor-glow");
    if (!glow || !fine || reduced || mobile) return;

    document.documentElement.classList.add("has-cursor-glow");
    const moveX = gsap.quickTo(glow, "x", { duration: 0.45, ease: "power2.out" });
    const moveY = gsap.quickTo(glow, "y", { duration: 0.45, ease: "power2.out" });

    window.addEventListener(
      "mousemove",
      (e) => {
        moveX(e.clientX);
        moveY(e.clientY);
      },
      { passive: true }
    );
  }

  function initNavMicro() {
    if (!fine) return;
    document.querySelectorAll(".nav-desktop a[data-nav]").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        if (!canAnimate()) return;
        gsap.to(link, { y: -1, duration: 0.2, ease: "power2.out" });
      });
      link.addEventListener("mouseleave", () => {
        if (!canAnimate()) return;
        gsap.to(link, { y: 0, duration: 0.25, ease: "power2.out" });
      });
    });
  }

  function initFormMicro() {
    document.querySelectorAll(".form-field input, .form-field textarea").forEach((field) => {
      const wrap = field.closest(".form-field");
      field.addEventListener("focus", () => wrap?.classList.add("is-focused"));
      field.addEventListener("blur", () => wrap?.classList.remove("is-focused"));
    });

    document.querySelectorAll(".contact-form-panel").forEach((panel) => {
      if (!canAnimate()) return;
      onceReveal(
        panel,
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" },
        panel
      );
    });
  }

  /* ── Ambient orbs — static CSS only (GSAP loops removed) ── */
  function initAmbientOrbs() {
    /* Intentionally empty */
  }

  function initContactStage() {
    if (!canAnimate()) return;
    ScrollTrigger.batch(".contact-channel", {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power3.out" }
        );
      },
    });
  }

  function initLinkTiles() {
    /* Hover handled via CSS transforms */
  }

  function initCardHover() {
    /* 3D card tilt removed — caused main-thread work on every mousemove */
  }

  function initCardTilt() {
    /* Disabled for performance */
  }

  function initMagnetic() {
    if (!fine || !canAnimate() || mobile) return;
    document.querySelectorAll(".btn-magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(btn, { x: x * 0.12, y: y * 0.12, duration: 0.3, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
      });
    });
  }

  function initCinematicHero() {
    const hero = document.querySelector(".hero--cinema");
    if (!hero || !canAnimate()) return;

    const isVideoHero = hero.classList.contains("hero--video");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero__eyebrow", { autoAlpha: 0, x: -12, duration: 0.5 }, 0.12)
      .from(
        hero.querySelectorAll(".hero__title .line-inner"),
        { yPercent: 110, duration: 0.85, stagger: 0.1 },
        0.38
      )
      .from(".hero__lead", { autoAlpha: 0, y: 20, duration: 0.6 }, 0.72)
      .from(".hero__actions .btn", { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.45 }, 0.85)
      .from(".hero__stat", { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.45 }, 1)
      .from(".hero__scroll-cue", { autoAlpha: 0, y: -8, duration: 0.45 }, 1.3);

    if (isVideoHero) {
      tl.from(".hero__video", { autoAlpha: 0, duration: 1, ease: "power2.out" }, 0)
        .from(".hero__frame--main", { autoAlpha: 0, y: 20, duration: 0.85, ease: "power3.out" }, 0.55);
    } else {
      tl.from(".hero__frame--main", { autoAlpha: 0, y: 24, duration: 0.9, ease: "power3.out" }, 0.35);
    }
  }

  function initReviewsStage() {
    if (!canAnimate()) return;
    const spotlight = document.getElementById("reviews-spotlight");
    if (!spotlight) return;
    onceReveal(
      spotlight,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
      spotlight
    );
  }

  function initMenuHeroParallax() {
    /* Scroll-linked image scale removed — caused image repaint glitches */
  }

  function animateMenuCards(cards) {
    if (!canAnimate() || !cards?.length) return;
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        stagger: { each: 0.025, from: "start" },
        ease: "power2.out",
        clearProps: "transform,opacity,visibility",
      }
    );
  }

  function animateReviewCards(cards) {
    if (!canAnimate() || !cards?.length) return;
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "transform,opacity,visibility",
      }
    );
  }

  function initTimeline() {
    if (!canAnimate()) return;
    ScrollTrigger.batch(".timeline__item", {
      start: "top 90%",
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { autoAlpha: 0, x: -16 },
          { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.05, ease: "power3.out" }
        );
      },
    });
  }

  function initAll() {
    initLineMasks();
    initClipReveals();
    initPremiumReveals();
    initHeroScrollScrub();
    initSceneBridges();
    initPinnedSections();
    initSectionDepth();
    initReviewsStage();
    initMenuHeroParallax();
    initCursorGlow();
    initNavMicro();
    initFormMicro();
    initCardHover();
    initCardTilt();
    initMagnetic();
    initCinematicHero();
    initTimeline();
    initAmbientOrbs();
    initContactStage();
    initLinkTiles();
  }

  return {
    initAll,
    animateMenuCards,
    animateReviewCards,
    canAnimate,
    reduced,
  };
})();

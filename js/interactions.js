/**
 * Bagel Bazaar — Delight & Interaction System
 */
window.BagelInteractions = (function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  function ripple(el, e, red) {
    if (reduced) return;
    const r = el.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 1.2;
    const x = (e.clientX ?? r.left + r.width / 2) - r.left - size / 2;
    const y = (e.clientY ?? r.top + r.height / 2) - r.top - size / 2;
    const span = document.createElement("span");
    span.className = "ripple" + (red ? " ripple--red" : "");
    span.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    el.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  }

  function initRipples() {
    const selectors = [
      ".btn",
      ".menu-tab",
      ".reviews-filter",
      ".reviews-carousel__btn",
      ".reviews-dot",
      ".menu-nav__btn",
      ".nav-desktop a[data-nav]",
      ".mobile-menu a",
      ".mobile-bar .btn",
      ".mobile-bar__action",
      ".order-dock__link",
      ".signature-picks__btn",
      ".btn-add-cart",
      ".cart-toggle",
      ".cart-fab",
      ".order-cart__qty-btn",
      ".popular-card__order",
      ".store-badge",
      ".contact-channel",
      ".link-tile",
      ".builder-chip",
      ".review-food-chip",
      ".popular-card__order",
      ".loyalty-strip__card",
    ];
    document.querySelectorAll(selectors.join(",")).forEach((el) => {
      if (el.dataset.rippleBound) return;
      el.dataset.rippleBound = "1";
      el.classList.add("has-ripple");
      const isRed = !el.classList.contains("btn-white");
      el.addEventListener("pointerdown", (e) => {
        if (e.button !== 0 && e.pointerType === "mouse") return;
        ripple(el, e, isRed);
      });
    });
  }

  function initTapFeedback() {
    if (!touch) return;
    document.querySelectorAll(".bento-card, .menu-card, .review-card, .btn, .info-card--premium, .location-card, .app-panel, .rich-card, .contact-channel, .link-tile, .popular-card, .signature-card, .loyalty-strip__card, .daypart-card, .mobile-bar__action, .order-dock__link, .menu-reviews__card").forEach((el) => {
      el.addEventListener("touchstart", () => el.classList.add("is-pressed"), { passive: true });
      el.addEventListener("touchend", () => setTimeout(() => el.classList.remove("is-pressed"), 120));
      el.addEventListener("touchcancel", () => el.classList.remove("is-pressed"));
    });
  }

  function initCountUps() {
    if (reduced || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const obj = { val: 0 };
      const stat = el.closest(".hero__stat");

      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = prefix + obj.val.toFixed(decimals) + suffix;
            },
            onComplete: () => stat?.classList.add("is-counted"),
          });
        },
      });
    });
  }

  function initAnimatedDividers() {
    if (reduced || typeof ScrollTrigger === "undefined") {
      document.querySelectorAll(".section-divider--animate").forEach((d) => d.classList.add("is-visible"));
      return;
    }
    document.querySelectorAll(".section-divider--animate").forEach((divider) => {
      ScrollTrigger.create({
        trigger: divider,
        start: "top 92%",
        once: true,
        onEnter: () => divider.classList.add("is-visible"),
      });
    });
  }

  function initCursorEnhance() {
    const glow = document.getElementById("cursor-glow");
    if (!glow || !fine || reduced) return;
    document.querySelectorAll("a, button, .menu-card, .bento-card, .review-card, .contact-channel, .link-tile, .rich-card").forEach((el) => {
      el.addEventListener("mouseenter", () => glow.classList.add("is-near-interactive"));
      el.addEventListener("mouseleave", () => glow.classList.remove("is-near-interactive"));
    });
  }

  function bindSpotlight(panel, spot) {
    let pending = false;
    panel.addEventListener("mousemove", (e) => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        const r = panel.getBoundingClientRect();
        spot.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        spot.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
        panel.classList.add("is-spotlight");
      });
    });
    panel.addEventListener("mouseleave", () => panel.classList.remove("is-spotlight"));
  }

  function initPanelSpotlight() {
    if (!fine) return;
    const selector = "[data-panel-spotlight], .info-card--premium, .location-card, .rich-card, .contact-channel";
    document.querySelectorAll(selector).forEach((panel) => {
      const spot = panel.querySelector(".panel-spotlight, .rich-card__spotlight, .contact-channel__spotlight");
      if (!spot) return;
      bindSpotlight(panel, spot);
    });
  }

  function initLinkTileSpotlight() {
    if (!fine) return;
    document.querySelectorAll(".link-tile").forEach((tile) => {
      let spot = tile.querySelector(".link-tile__spotlight");
      if (!spot) {
        spot = document.createElement("span");
        spot.className = "link-tile__spotlight panel-spotlight";
        spot.setAttribute("aria-hidden", "true");
        tile.prepend(spot);
      }
      tile.addEventListener("mousemove", (e) => {
        const r = tile.getBoundingClientRect();
        spot.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        spot.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
        tile.classList.add("is-spotlight");
      });
      tile.addEventListener("mouseleave", () => tile.classList.remove("is-spotlight"));
    });
  }
  function initMenuSpotlight() {
    if (!fine) return;
    document.querySelectorAll(".menu-card--premium").forEach((card) => {
      let spot = card.querySelector(".menu-card__spotlight");
      if (!spot) {
        spot = document.createElement("div");
        spot.className = "menu-card__spotlight";
        spot.setAttribute("aria-hidden", "true");
        card.querySelector(".menu-card__media")?.prepend(spot);
      }
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width) * 100;
        const my = ((e.clientY - r.top) / r.height) * 100;
        spot.style.setProperty("--mx", mx + "%");
        spot.style.setProperty("--my", my + "%");
        card.classList.add("is-spotlight");
      });
      card.addEventListener("mouseleave", () => card.classList.remove("is-spotlight"));
    });
  }

  function initScrollUI() {
    const bar = document.querySelector(".mobile-bar");
    const dock = document.getElementById("order-dock");
    const hero = document.querySelector(".hero--cinema, .page-hero--cinematic, .page-hero--premium");
    const showAfter = hero ? hero.offsetHeight * 0.55 : 320;
    let lastY = window.scrollY;
    let dockVisible = false;
    let ticking = false;

    function update() {
      ticking = false;
      const y = window.scrollY;
      const isMobile = window.innerWidth < 768;

      if (bar && isMobile) {
        if (y > lastY + 10 && y > 120) bar.classList.add("is-hidden");
        else bar.classList.remove("is-hidden");
      }

      if (dock && !isMobile) {
        const shouldShow = y > showAfter;
        if (shouldShow !== dockVisible) {
          dockVisible = shouldShow;
          dock.hidden = !shouldShow;
          dock.classList.toggle("is-visible", shouldShow);
          document.body.classList.toggle("has-order-dock-visible", shouldShow);
        }
      }

      lastY = y;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  function initBentoShine() {
    document.querySelectorAll(".bento-card").forEach((card) => {
      if (card.querySelector(".bento-card__shine")) return;
      const shine = document.createElement("span");
      shine.className = "bento-card__shine";
      shine.setAttribute("aria-hidden", "true");
      card.appendChild(shine);
    });
  }

  function initSpotlightStars() {
    const container = document.querySelector(".reviews__spotlight-stars");
    if (!container || reduced || window.innerWidth < 768) return;
    if (window.BagelIcons) {
      container.innerHTML = window.BagelIcons.stars(5, "star-row");
    } else {
      container.innerHTML = "";
      return;
    }
    const stars = container.querySelectorAll(".ui-icon--star");
    if (!stars.length) return;
    setInterval(() => {
      const i = Math.floor(Math.random() * stars.length);
      stars[i].classList.add("is-twinkle");
      setTimeout(() => stars[i].classList.remove("is-twinkle"), 500);
    }, 2200);
  }

  function wrapReviewStars() {
    document.querySelectorAll(".review-card__stars").forEach((el) => {
      if (el.dataset.wrapped || el.querySelector("svg")) return;
      el.dataset.wrapped = "1";
    });
  }

  function initLinkSlides() {
    document.querySelectorAll(".footer-col a, .story-panel a, .lead a").forEach((a) => {
      if (!a.classList.contains("btn")) a.classList.add("link-slide");
    });
  }

  function initButtonIconChoreography() {
    /* Decorative arrow icons removed for cleaner button labels */
  }

  function observeReviewCards() {
    if (typeof MutationObserver === "undefined") return;
    const track = document.getElementById("reviews-track");
    if (!track) return;
    const obs = new MutationObserver(() => wrapReviewStars());
    obs.observe(track, { childList: true });
    wrapReviewStars();
  }

  function initOrderDock() {
    /* Handled by initScrollUI */
  }

  function initFormFeedback() {
    document.querySelectorAll(".form-grid--premium").forEach((form) => {
      form.addEventListener("submit", (e) => {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.classList.add("is-loading");
          btn.setAttribute("aria-busy", "true");
        }
      });
    });
  }

  function initAll() {
    initRipples();
    initTapFeedback();
    initCountUps();
    initAnimatedDividers();
    initCursorEnhance();
    initPanelSpotlight();
    initLinkTileSpotlight();
    initMenuSpotlight();
    initScrollUI();
    initOrderDock();
    initFormFeedback();
    initBentoShine();
    initSpotlightStars();
    observeReviewCards();
    initLinkSlides();
    initButtonIconChoreography();
  }

  return {
    initAll,
    initRipples,
    initMenuSpotlight,
    wrapReviewStars,
    ripple,
  };
})();

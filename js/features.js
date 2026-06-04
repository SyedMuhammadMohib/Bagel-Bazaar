/**
 * Bagel Bazaar — Premium interactive features (performance-first)
 */
window.BagelFeatures = (function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ORDER = window.SITE?.orderUrl || "https://www.bagelbazaarmonroe.com/OrderOnline.tpl";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ── Popular Now horizontal scroller ── */
  function initPopularNow() {
    const track = document.getElementById("signature-picks-track") || document.getElementById("popular-now-track");
    const dotsEl = document.getElementById("signature-picks-dots") || document.getElementById("popular-now-dots");
    const items = window.POPULAR_ITEMS;
    if (!track || !items?.length) return;

    track.innerHTML = items
      .map(
        (item, i) => `
      <article class="popular-card signature-card${i === 0 ? " is-active" : ""}" role="listitem" data-popular-id="${escapeHtml(item.id)}" tabindex="0">
        <div class="popular-card__media">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" decoding="async">
          <span class="popular-card__tag">${escapeHtml(item.tag)}</span>
        </div>
        <div class="popular-card__body">
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.desc)}</p>
          <div class="popular-card__actions">
            <button type="button" class="btn btn-primary btn-sm btn-add-cart" data-add-cart data-cart-id="${escapeHtml(item.id)}" data-cart-name="${escapeHtml(item.name)}" data-cart-image="${escapeHtml(item.image)}">Add to cart</button>
          </div>
        </div>
      </article>`
      )
      .join("");

    if (dotsEl) {
      dotsEl.innerHTML = items.map((_, i) => `<span class="signature-picks__dot popular-now__dot${i === 0 ? " is-active" : ""}"></span>`).join("");
    }

    const cards = track.querySelectorAll(".popular-card");
    const dots = dotsEl?.querySelectorAll(".signature-picks__dot, .popular-now__dot");
    const prevBtn = document.getElementById("signature-picks-prev") || document.getElementById("popular-now-prev");
    const nextBtn = document.getElementById("signature-picks-next") || document.getElementById("popular-now-next");

    function setActiveIndex(idx) {
      cards.forEach((c, i) => c.classList.toggle("is-active", i === idx));
      dots?.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    }

    function scrollStep() {
      const card = cards[0];
      if (!card) return 320;
      const gap = parseFloat(getComputedStyle(track).gap) || 20;
      return card.offsetWidth + gap;
    }

    function updateNavState() {
      const max = track.scrollWidth - track.clientWidth;
      const left = track.scrollLeft;
      if (prevBtn) prevBtn.disabled = left <= 4;
      if (nextBtn) nextBtn.disabled = left >= max - 4;
    }

    prevBtn?.addEventListener("click", () => {
      track.scrollBy({ left: -scrollStep(), behavior: reduced ? "auto" : "smooth" });
    });

    nextBtn?.addEventListener("click", () => {
      track.scrollBy({ left: scrollStep(), behavior: reduced ? "auto" : "smooth" });
    });

    track.addEventListener("scroll", updateNavState, { passive: true });
    window.addEventListener("resize", updateNavState, { passive: true });
    updateNavState();

    if ("IntersectionObserver" in window && cards.length > 1) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || entry.intersectionRatio < 0.55) return;
            const idx = [...cards].indexOf(entry.target);
            setActiveIndex(idx);
          });
        },
        { root: track, threshold: [0.55] }
      );
      cards.forEach((c) => io.observe(c));
    }

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) {
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          cards.forEach((c) => c.classList.remove("is-hover"));
          card.classList.add("is-hover");
        });
        card.addEventListener("mouseleave", () => card.classList.remove("is-hover"));
      });
    }

    cards.forEach((card) => {
      card.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        card.querySelector(".btn-add-cart")?.click();
      });
    });
  }

  /* ── Breakfast builder (CSS chip toggles) ── */
  function initBreakfastBuilder() {
    const root = document.getElementById("breakfast-builder");
    const summary = document.getElementById("builder-summary");
    const options = window.BUILDER_OPTIONS;
    const defaults = window.BUILDER_DEFAULTS;
    if (!root || !options) return;

    const state = { ...defaults };

    Object.entries(options).forEach(([step, choices]) => {
      const wrap = root.querySelector(`[data-builder-step="${step}"] .builder-step__options`);
      if (!wrap) return;
      wrap.innerHTML = choices
        .map(
          (label, i) =>
            `<button type="button" class="builder-chip${label === defaults[step] ? " is-selected" : ""}" data-step="${step}" data-value="${escapeHtml(label)}" aria-pressed="${label === defaults[step]}">${escapeHtml(label)}</button>`
        )
        .join("");
    });

    function updateSummary() {
      const text = `${state.bagel} bagel, ${state.spread.toLowerCase()}, ${state.protein.toLowerCase()}, ${state.drink.toLowerCase()}`;
      const preview = summary?.querySelector(".breakfast-builder__preview");
      if (preview) preview.textContent = text;
      const addBtn = summary?.querySelector("#builder-add-cart");
      if (addBtn) {
        addBtn.dataset.cartNote = text;
        addBtn.dataset.cartName = "Custom breakfast combo";
      }
    }

    root.addEventListener("click", (e) => {
      const chip = e.target.closest(".builder-chip");
      if (!chip) return;
      const step = chip.dataset.step;
      const value = chip.dataset.value;
      if (!step || !value) return;
      state[step] = value;
      root.querySelectorAll(`.builder-chip[data-step="${step}"]`).forEach((c) => {
        const on = c === chip;
        c.classList.toggle("is-selected", on);
        c.setAttribute("aria-pressed", String(on));
      });
      updateSummary();
      chip.classList.add("is-tapped");
      setTimeout(() => chip.classList.remove("is-tapped"), 200);
    });

    updateSummary();
  }

  function initReviewFoodChips() {
    const container = document.getElementById("review-food-chips");
    if (!container || !window.POPULAR_ITEMS) return;

    const linked = window.POPULAR_ITEMS.slice(0, 5);
    container.innerHTML = linked
      .map(
        (item) =>
          `<button type="button" class="review-food-chip" data-food-id="${escapeHtml(item.id)}" data-food-name="${escapeHtml(item.name)}">
        <img src="${escapeHtml(item.image)}" alt="" loading="lazy" decoding="async">
        <span>${escapeHtml(item.name)}</span>
      </button>`
      )
      .join("");

    container.addEventListener("click", (e) => {
      const chip = e.target.closest(".review-food-chip");
      if (!chip) return;
      const name = chip.dataset.foodName;
      const isActive = chip.classList.toggle("is-active");
      container.querySelectorAll(".review-food-chip").forEach((c) => {
        if (c !== chip) c.classList.remove("is-active");
      });
      if (!isActive) {
        chip.classList.remove("is-active");
        window.dispatchEvent(new CustomEvent("bb-review-filter-food", { detail: { name: null } }));
        return;
      }
      window.dispatchEvent(new CustomEvent("bb-review-filter-food", { detail: { name } }));
    });
  }

  function initAll() {
    initPopularNow();
    initBreakfastBuilder();
    initReviewFoodChips();
  }

  return { initAll, initPopularNow, initBreakfastBuilder };
})();

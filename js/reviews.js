/**
 * Bagel Bazaar Monroe — premium Google Reviews carousel
 */
(function () {
  "use strict";

  const section = document.getElementById("reviews");
  if (!section || !window.BAGEL_REVIEWS) return;

  const track = document.getElementById("reviews-track");
  const viewport = document.getElementById("reviews-viewport");
  const filtersEl = document.getElementById("reviews-filters");
  const prevBtn = document.getElementById("reviews-prev");
  const nextBtn = document.getElementById("reviews-next");
  const dotsEl = document.getElementById("reviews-dots");
  const spotlight = document.getElementById("reviews-spotlight");
  const marqueeEl = document.getElementById("reviews-marquee");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let activeFilter = "all";
  let activeFood = null;
  let filtered = [...window.BAGEL_REVIEWS];
  let pageIndex = 0;
  let autoTimer = null;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function stars(n) {
    if (window.BagelIcons) return window.BagelIcons.stars(n, "review-card__stars-row");
    return Array.from({ length: n }, () => '<span class="star-char"></span>').join("");
  }

  function foodLink(review) {
    if (!review.menuItem) return "";
    const m = review.menuItem;
    return `<a href="${window.SITE?.orderUrl || "https://www.bagelbazaarmonroe.com/OrderOnline.tpl"}" class="review-card__food" target="_blank" rel="noopener"><img src="${escapeHtml(m.image)}" alt="">${escapeHtml(m.name)}</a>`;
  }

  function buildCard(review, isFeatured) {
    const badge = review.badge
      ? `<span class="review-card__badge">${escapeHtml(review.badge)}</span>`
      : "";
    const cat = window.REVIEW_CATEGORIES.find((c) => c.id === review.category);
    const catLabel = cat && cat.id !== "all" ? cat.label : "";
    const food = foodLink(review);

    return `
      <article class="review-card${isFeatured ? " review-card--featured" : ""}" data-review-id="${review.id}" tabindex="0">
        <div class="review-card__glow" aria-hidden="true"></div>
        ${badge}
        ${food}
        <div class="review-card__stars" aria-label="${review.rating} out of 5 stars">${stars(review.rating)}</div>
        <blockquote class="review-card__quote">
          <p>${escapeHtml(review.excerpt)}</p>
        </blockquote>
        <footer class="review-card__footer">
          <cite class="review-card__author">${escapeHtml(review.name)}</cite>
          ${catLabel ? `<span class="review-card__tag">${escapeHtml(catLabel)}</span>` : ""}
        </footer>
      </article>`;
  }

  function updateSpotlight(review) {
    if (!spotlight || !review) return;
    const quote = spotlight.querySelector(".reviews__spotlight-quote");
    const author = spotlight.querySelector(".reviews__spotlight-author");
    let foodEl = spotlight.querySelector(".reviews__spotlight-food");
    if (quote) quote.textContent = review.excerpt.split(".").slice(0, 1).join(".") + (review.excerpt.includes(".") ? "." : "");
    if (author) author.textContent = review.name;

    if (review.menuItem) {
      if (!foodEl) {
        foodEl = document.createElement("a");
        foodEl.className = "reviews__spotlight-food";
        foodEl.target = "_blank";
        foodEl.rel = "noopener";
        foodEl.href = window.SITE?.orderUrl || "https://www.bagelbazaarmonroe.com/OrderOnline.tpl";
        spotlight.appendChild(foodEl);
      }
      foodEl.innerHTML = `<img src="${escapeHtml(review.menuItem.image)}" alt="">${escapeHtml(review.menuItem.name)}`;
      foodEl.hidden = false;
    } else if (foodEl) {
      foodEl.hidden = true;
    }

    if (typeof gsap !== "undefined" && !prefersReducedMotion) {
      gsap.fromTo(spotlight, { autoAlpha: 0.6, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
    }
  }

  function renderMarquee() {
    if (!marqueeEl) return;
    const star = window.BagelIcons ? window.BagelIcons.starSvg : "";
    const items = window.BAGEL_REVIEWS.slice(0, 12);
    const html = items
      .map((r) => `<span class="reviews-marquee__item">${star}<strong>${escapeHtml(r.name)}</strong>, ${escapeHtml(r.excerpt.slice(0, 48))}</span>`)
      .join("");
    marqueeEl.innerHTML = html + html;
  }

  function getCardsPerPage() {
    const w = window.innerWidth;
    if (w >= 1280) return 3;
    if (w >= 768) return 2;
    return 1;
  }

  function totalPages() {
    return Math.max(1, Math.ceil(filtered.length / getCardsPerPage()));
  }

  function updateCarousel(animate) {
    if (!track || !viewport) return;
    const cardsPerPage = getCardsPerPage();
    const card = track.querySelector(".review-card");
    if (!card) return;

    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    const cardW = card.offsetWidth;
    const offset = pageIndex * cardsPerPage * (cardW + gap);

    if (prevBtn) prevBtn.disabled = pageIndex <= 0;
    if (nextBtn) nextBtn.disabled = pageIndex >= totalPages() - 1;

    const featuredIdx = pageIndex * cardsPerPage;
    if (filtered[featuredIdx]) updateSpotlight(filtered[featuredIdx]);

    if (typeof gsap !== "undefined" && animate && !prefersReducedMotion) {
      gsap.to(track, { x: -offset, duration: 0.75, ease: "power3.inOut" });
    } else if (typeof gsap !== "undefined") {
      gsap.set(track, { x: -offset });
    } else {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }

    dotsEl?.querySelectorAll(".reviews-dot").forEach((d, i) => {
      d.classList.toggle("is-active", i === pageIndex);
    });

    track?.querySelectorAll(".review-card").forEach((card, i) => {
      const start = pageIndex * getCardsPerPage();
      const end = start + getCardsPerPage();
      card.classList.toggle("is-active-slide", i >= start && i < end);
    });
  }

  function applyFilters() {
    filtered = window.BAGEL_REVIEWS.filter((r) => {
      const catOk = activeFilter === "all" || r.category === activeFilter;
      const foodOk = !activeFood || r.menuItem?.name === activeFood;
      return catOk && foodOk;
    });
  }

  function renderTrack(animate) {
    if (!track) return;
    applyFilters();
    if (!filtered.length) {
      filtered = [...window.BAGEL_REVIEWS];
      activeFood = null;
      document.querySelectorAll(".review-food-chip.is-active").forEach((c) => c.classList.remove("is-active"));
    }
    track.innerHTML = filtered.map((r, i) => buildCard(r, i === 0)).join("");
    pageIndex = Math.min(pageIndex, totalPages() - 1);
    renderDots();
    if (filtered[0]) updateSpotlight(filtered[0]);

    requestAnimationFrame(() => {
      updateCarousel(false);
      const cards = track.querySelectorAll(".review-card");
      if (window.BagelMotion?.animateReviewCards && animate !== false) {
        window.BagelMotion.animateReviewCards(cards);
      }
    });
  }

  function renderFilters() {
    if (!filtersEl || !window.REVIEW_CATEGORIES) return;
    filtersEl.innerHTML = window.REVIEW_CATEGORIES.map(
      (cat) =>
        `<button type="button" class="reviews-filter${cat.id === activeFilter ? " is-active" : ""}" data-filter="${cat.id}">${escapeHtml(cat.label)}</button>`
    ).join("");

    filtersEl.querySelectorAll(".reviews-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("is-active")) return;
        activeFilter = btn.dataset.filter;
        activeFood = null;
        document.querySelectorAll(".review-food-chip.is-active").forEach((c) => c.classList.remove("is-active"));
        pageIndex = 0;
        filtersEl.querySelectorAll(".reviews-filter").forEach((b) => b.classList.toggle("is-active", b === btn));
        window.BagelInteractions?.ripple(btn, { clientX: btn.offsetWidth / 2, clientY: btn.offsetHeight / 2 }, true);

        if (typeof gsap !== "undefined" && !prefersReducedMotion && track) {
          gsap.to(track, {
            autoAlpha: 0,
            scale: 0.98,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              renderTrack(true);
              gsap.fromTo(track, { autoAlpha: 0, scale: 0.98 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
            },
          });
        } else {
          renderTrack(true);
        }
        resetAutoPlay();
      });
    });
  }

  function renderDots() {
    if (!dotsEl) return;
    const pages = totalPages();
    dotsEl.innerHTML = Array.from({ length: pages }, (_, i) =>
      `<button type="button" class="reviews-dot${i === pageIndex ? " is-active" : ""}" aria-label="Go to review page ${i + 1}" data-page="${i}"></button>`
    ).join("");

    dotsEl.querySelectorAll(".reviews-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        pageIndex = Number(dot.dataset.page);
        updateCarousel(true);
        resetAutoPlay();
      });
    });
  }

  function goNext() {
    if (pageIndex < totalPages() - 1) pageIndex++;
    else pageIndex = 0;
    updateCarousel(true);
  }

  function goPrev() {
    if (pageIndex > 0) pageIndex--;
    else pageIndex = totalPages() - 1;
    updateCarousel(true);
  }

  function resetAutoPlay() {
    clearInterval(autoTimer);
    if (prefersReducedMotion) return;
    autoTimer = setInterval(goNext, 7000);
  }

  function initCarouselControls() {
    prevBtn?.addEventListener("click", () => { goPrev(); resetAutoPlay(); });
    nextBtn?.addEventListener("click", () => { goNext(); resetAutoPlay(); });

    section.addEventListener("mouseenter", () => clearInterval(autoTimer));
    section.addEventListener("mouseleave", resetAutoPlay);

    let touchStartX = 0;
    viewport?.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    viewport?.addEventListener("touchend", (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) goNext();
        else goPrev();
        resetAutoPlay();
      }
    }, { passive: true });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { pageIndex = 0; renderTrack(false); }, 150);
    });
  }

  renderMarquee();
  renderFilters();
  renderTrack(true);
  initCarouselControls();
  resetAutoPlay();

  window.addEventListener("bb-review-filter-food", (e) => {
    activeFood = e.detail?.name || null;
    pageIndex = 0;
    if (typeof gsap !== "undefined" && !prefersReducedMotion && track) {
      gsap.to(track, {
        autoAlpha: 0,
        scale: 0.98,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          renderTrack(true);
          gsap.fromTo(track, { autoAlpha: 0, scale: 0.98 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out" });
        },
      });
    } else {
      renderTrack(true);
    }
    resetAutoPlay();
  });
})();

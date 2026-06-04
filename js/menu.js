/**
 * Bagel Bazaar Monroe — visual menu renderer
 */
(function () {
  "use strict";

  const ORDER_URL = "https://www.bagelbazaarmonroe.com/OrderOnline.tpl";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildCard(item, categoryLabel) {
    const img = window.MENU_IMAGES.meta(item.id || item.imageKey);
    const desc = item.description
      ? `<p class="menu-card__desc">${escapeHtml(item.description)}</p>`
      : "";
    const badge = item.badge
      ? `<span class="menu-card__badge">${escapeHtml(item.badge)}</span>`
      : "";
    const alt = `${item.name}, ${categoryLabel}`;

    return `
      <article class="menu-card menu-card--premium" data-item-id="${escapeHtml(item.id)}">
        <div class="menu-card__media">
          <div class="menu-card__spotlight" aria-hidden="true"></div>
          <img
            class="menu-card__img"
            src="${img.src}"
            alt="${escapeHtml(alt)}"
            width="${img.width}"
            height="${img.height}"
            loading="${img.loading}"
            decoding="async"
            onerror="this.onerror=null;this.classList.add('menu-card__img--error');this.src=window.MENU_IMAGES.placeholder;"
          />
          ${badge}
          <div class="menu-card__shine" aria-hidden="true"></div>
          <div class="menu-card__quick">
            <button type="button" class="menu-card__order btn-add-cart" data-add-cart data-cart-id="${escapeHtml(item.id)}" data-cart-name="${escapeHtml(item.name)}" data-cart-price="${escapeHtml(item.price)}" data-cart-image="${escapeHtml(img.src)}">Add to cart</button>
          </div>
        </div>
        <div class="menu-card__body">
          <h3 class="menu-card__name">${escapeHtml(item.name)}</h3>
          ${desc}
          <div class="menu-card__footer">
            <span class="menu-card__price">${escapeHtml(item.price)}</span>
            <div class="menu-card__actions">
              <button type="button" class="btn btn-primary btn-sm btn-add-cart menu-card__add" data-add-cart data-cart-id="${escapeHtml(item.id)}" data-cart-name="${escapeHtml(item.name)}" data-cart-price="${escapeHtml(item.price)}" data-cart-image="${escapeHtml(img.src)}">Add to cart</button>
            </div>
          </div>
        </div>
      </article>`;
  }

  function renderGrid(categoryId) {
    const grid = document.getElementById("menu-grid");
    const noteEl = document.getElementById("menu-category-note");
    if (!grid || !window.MENU_CATEGORIES) return;

    const category = window.MENU_CATEGORIES.find((c) => c.id === categoryId);
    if (!category) return;

    if (noteEl) {
      noteEl.textContent = category.note || "";
      noteEl.hidden = !category.note;
    }

    const labelEl = document.getElementById("menu-category-label");
    if (labelEl) {
      labelEl.textContent = category.label;
      labelEl.classList.remove("is-switching");
      void labelEl.offsetWidth;
      labelEl.classList.add("is-switching");
    }

    grid.innerHTML = category.items.map((item) => buildCard(item, category.label)).join("");
    grid.dataset.activeCategory = categoryId;

    const cards = grid.querySelectorAll(".menu-card");
    if (window.BagelMotion?.animateMenuCards) {
      window.BagelMotion.animateMenuCards(cards);
    } else if (typeof gsap !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.025, ease: "power2.out", clearProps: "transform,opacity,visibility" }
      );
    }
    window.BagelInteractions?.initMenuSpotlight();
  }

  function renderGridTransition(categoryId) {
    const grid = document.getElementById("menu-grid");
    if (!grid) {
      renderGrid(categoryId);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof gsap === "undefined") {
      renderGrid(categoryId);
      return;
    }

    grid.classList.add("is-switching");
    gsap.to(grid, {
      autoAlpha: 0.7,
      duration: 0.15,
      ease: "power1.inOut",
      onComplete: () => {
        renderGrid(categoryId);
        gsap.to(grid, { autoAlpha: 1, duration: 0.2, ease: "power1.out", clearProps: "opacity" });
        grid.classList.remove("is-switching");
      },
    });
  }

  function initCategoryScroll() {
    const browser = document.getElementById("menu-filters");
    const wrap = document.getElementById("menu-browser-wrap");
    const prev = document.getElementById("menu-scroll-prev");
    const next = document.getElementById("menu-scroll-next");
    if (!browser || !wrap || !prev || !next) return;

    const scrollAmount = () => Math.max(180, Math.round(browser.clientWidth * 0.55));

    function updateScrollState() {
      const max = browser.scrollWidth - browser.clientWidth;
      const left = browser.scrollLeft;
      const canLeft = left > 4;
      const canRight = left < max - 4;
      prev.disabled = !canLeft;
      next.disabled = !canRight;
      wrap.classList.toggle("can-scroll-left", canLeft);
      wrap.classList.toggle("can-scroll-right", canRight);
    }

    prev.addEventListener("click", () => {
      browser.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });

    next.addEventListener("click", () => {
      browser.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });

    browser.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });
    updateScrollState();
  }

  function initVisualMenu() {
    const browser = document.getElementById("menu-filters");
    const indicator = document.getElementById("menu-indicator");
    if (!browser || !window.MENU_CATEGORIES?.length) return;

    browser.innerHTML = "";
    window.MENU_CATEGORIES.forEach((cat, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "menu-tab" + (index === 0 ? " active" : "");
      btn.role = "tab";
      btn.id = `tab-${cat.id}`;
      btn.setAttribute("aria-controls", "menu-grid");
      btn.setAttribute("aria-selected", index === 0 ? "true" : "false");
      btn.dataset.category = cat.id;
      btn.textContent = cat.label;
      browser.appendChild(btn);
    });

    if (indicator && !browser.contains(indicator)) {
      browser.insertBefore(indicator, browser.firstChild);
    }

    function moveIndicator(tab, instant) {
      if (!indicator || !browser || !tab) return;
      const browserRect = browser.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();
      const x = tabRect.left - browserRect.left + browser.scrollLeft;
      const w = tabRect.width;
      if (typeof gsap === "undefined" || instant) {
        if (typeof gsap !== "undefined") {
          gsap.set(indicator, { x, width: w });
        } else {
          indicator.style.transform = `translateX(${x}px)`;
          indicator.style.width = `${w}px`;
        }
      } else {
        gsap.to(indicator, { x, width: w, duration: 0.45, ease: "power3.out" });
      }
    }

    const tabs = browser.querySelectorAll(".menu-tab");
    const activeTab = browser.querySelector(".menu-tab.active");
    renderGrid(window.MENU_CATEGORIES[0].id);

    requestAnimationFrame(() => moveIndicator(activeTab, true));
    initCategoryScroll();

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        if (tab.classList.contains("active")) return;
        tabs.forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        moveIndicator(tab, false);
        tab.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
        renderGridTransition(tab.dataset.category);
      });
    });

    let resizeTimer;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          moveIndicator(browser.querySelector(".menu-tab.active"), true);
        }, 120);
      },
      { passive: true }
    );
  }

  window.initVisualMenu = initVisualMenu;
})();

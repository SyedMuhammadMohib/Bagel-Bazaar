/**
 * Bagel Bazaar — local order cart (persists in localStorage)
 */
window.BagelCart = (function () {
  "use strict";

  const STORAGE_KEY = "bb-order-cart";
  const ORDER_URL = window.SITE?.orderUrl || "https://www.bagelbazaarmonroe.com/OrderOnline.tpl";

  function parsePrice(str) {
    if (!str) return 0;
    const n = parseFloat(String(str).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }

  function formatMoney(n) {
    return "$" + n.toFixed(2);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function findMenuItem(id, name) {
    if (!window.MENU_CATEGORIES) return null;
    for (const cat of window.MENU_CATEGORIES) {
      const byId = cat.items.find((i) => i.id === id);
      if (byId) return { ...byId, category: cat.label };
    }
    if (!name) return null;
    const lower = name.toLowerCase();
    for (const cat of window.MENU_CATEGORIES) {
      const exact = cat.items.find((i) => i.name.toLowerCase() === lower);
      if (exact) return { ...exact, category: cat.label };
    }
    for (const cat of window.MENU_CATEGORIES) {
      const partial = cat.items.find(
        (i) => i.name.toLowerCase().includes(lower) || lower.includes(i.name.toLowerCase())
      );
      if (partial) return { ...partial, category: cat.label };
    }
    return null;
  }

  function getImageSrc(id, imageKey, fallback) {
    if (window.MENU_IMAGES?.meta) {
      const key = imageKey || id;
      if (key) return window.MENU_IMAGES.meta(key).src;
    }
    return fallback || "";
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("bb-cart-updated", { detail: { items } }));
  }

  let items = loadCart();

  function getItems() {
    return items.slice();
  }

  function getCount() {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

  function getSubtotal() {
    return items.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
  }

  function addItem(payload) {
    const id = payload.id || payload.name?.toLowerCase().replace(/\s+/g, "-");
    const menuMatch = findMenuItem(payload.id, payload.name);
    const name = payload.name || menuMatch?.name || "Menu item";
    const price = payload.price || menuMatch?.price || "";
    const image = payload.image || getImageSrc(menuMatch?.id, menuMatch?.imageKey, payload.image);

    const existing = items.find((i) => i.id === id && i.name === name);
    if (existing) {
      existing.qty += payload.qty || 1;
    } else {
      items.push({
        id,
        name,
        price,
        image,
        qty: payload.qty || 1,
        note: payload.note || "",
      });
    }
    saveCart(items);
    return items;
  }

  function updateQty(id, name, qty) {
    const item = items.find((i) => i.id === id && i.name === name);
    if (!item) return;
    if (qty <= 0) {
      items = items.filter((i) => !(i.id === id && i.name === name));
    } else {
      item.qty = qty;
    }
    saveCart(items);
  }

  function removeItem(id, name) {
    items = items.filter((i) => !(i.id === id && i.name === name));
    saveCart(items);
  }

  function clearCart() {
    items = [];
    saveCart(items);
  }

  function addFromButton(btn) {
    addItem({
      id: btn.dataset.cartId,
      name: btn.dataset.cartName,
      price: btn.dataset.cartPrice,
      image: btn.dataset.cartImage,
      note: btn.dataset.cartNote,
      qty: parseInt(btn.dataset.cartQty || "1", 10),
    });
    showToast(`${btn.dataset.cartName || "Item"} added to cart`);
    btn.classList.add("is-added");
    setTimeout(() => btn.classList.remove("is-added"), 600);
  }

  let toastTimer;
  function showToast(message) {
    const toast = document.getElementById("cart-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function renderDrawer() {
    const list = document.getElementById("order-cart-items");
    const totalEl = document.getElementById("order-cart-total");
    const emptyEl = document.getElementById("order-cart-empty");
    if (!list) return;

    if (!items.length) {
      list.innerHTML = "";
      emptyEl?.removeAttribute("hidden");
      if (totalEl) totalEl.textContent = formatMoney(0);
      return;
    }

    emptyEl?.setAttribute("hidden", "");
    list.innerHTML = items
      .map(
        (item) => `
      <article class="order-cart__item" data-cart-item-id="${escapeHtml(item.id)}" data-cart-item-name="${escapeHtml(item.name)}">
        ${item.image ? `<img class="order-cart__item-img" src="${escapeHtml(item.image)}" alt="" loading="lazy" decoding="async">` : '<span class="order-cart__item-img order-cart__item-img--placeholder" aria-hidden="true"></span>'}
        <div class="order-cart__item-body">
          <strong>${escapeHtml(item.name)}</strong>
          ${item.note ? `<span class="order-cart__item-note">${escapeHtml(item.note)}</span>` : ""}
          <span class="order-cart__item-price">${escapeHtml(item.price || "At checkout")}</span>
          <div class="order-cart__qty" role="group" aria-label="Quantity for ${escapeHtml(item.name)}">
            <button type="button" class="order-cart__qty-btn" data-cart-qty="-1" aria-label="Decrease quantity">−</button>
            <span class="order-cart__qty-val">${item.qty}</span>
            <button type="button" class="order-cart__qty-btn" data-cart-qty="1" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button type="button" class="order-cart__remove" aria-label="Remove ${escapeHtml(item.name)}">×</button>
      </article>`
      )
      .join("");

    if (totalEl) {
      const sub = getSubtotal();
      totalEl.textContent = sub > 0 ? formatMoney(sub) : "See checkout";
    }
  }

  function updateBadges() {
    const count = getCount();
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = String(count);
      el.classList.toggle("is-empty", count === 0);
    });
    document.body.classList.toggle("has-cart-items", count > 0);
  }

  function openCart() {
    const root = document.getElementById("order-cart");
    if (!root) return;
    renderDrawer();
    root.classList.add("is-open");
    root.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
    document.getElementById("order-cart-close")?.focus();
  }

  function closeCart() {
    const root = document.getElementById("order-cart");
    if (!root) return;
    root.classList.remove("is-open");
    root.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
  }

  function toggleCart() {
    const root = document.getElementById("order-cart");
    if (root?.classList.contains("is-open")) closeCart();
    else openCart();
  }

  function bindUI() {
    document.addEventListener("click", (e) => {
      const addBtn = e.target.closest("[data-add-cart]");
      if (addBtn) {
        e.preventDefault();
        addFromButton(addBtn);
        return;
      }

      if (e.target.closest("#cart-toggle, #cart-fab, [data-cart-open]")) {
        e.preventDefault();
        toggleCart();
        return;
      }

      if (e.target.closest("#order-cart-close, #order-cart-backdrop")) {
        e.preventDefault();
        closeCart();
        return;
      }

      const qtyBtn = e.target.closest(".order-cart__qty-btn");
      if (qtyBtn) {
        e.preventDefault();
        const row = qtyBtn.closest(".order-cart__item");
        if (!row) return;
        const id = row.dataset.cartItemId;
        const name = row.dataset.cartItemName;
        const item = items.find((i) => i.id === id && i.name === name);
        if (!item) return;
        updateQty(id, name, item.qty + parseInt(qtyBtn.dataset.cartQty, 10));
        renderDrawer();
        return;
      }

      const removeBtn = e.target.closest(".order-cart__remove");
      if (removeBtn) {
        e.preventDefault();
        const row = removeBtn.closest(".order-cart__item");
        if (!row) return;
        removeItem(row.dataset.cartItemId, row.dataset.cartItemName);
        renderDrawer();
        showToast("Item removed");
        return;
      }

      if (e.target.closest("#order-cart-clear")) {
        e.preventDefault();
        clearCart();
        renderDrawer();
        showToast("Cart cleared");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("cart-open")) closeCart();
    });

    window.addEventListener("bb-cart-updated", () => {
      updateBadges();
      if (document.getElementById("order-cart")?.classList.contains("is-open")) renderDrawer();
    });

    updateBadges();
    renderDrawer();
  }

  function init() {
    if (document.getElementById("order-cart")) bindUI();
  }

  return {
    init,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    getItems,
    getCount,
    getSubtotal,
    openCart,
    closeCart,
    showToast,
    ORDER_URL,
  };
})();

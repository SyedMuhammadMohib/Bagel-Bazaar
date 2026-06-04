/**
 * Shared HTML shell fragments for Bagel Bazaar pages
 * Used as reference — pages are static HTML with matching structure
 */
import { appDownloadButtons } from "./app-components.mjs";
import { smartLoyaltyMoment, quickActionBar } from "./features.mjs";
const CART_ICON = `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;

export const cartShell = `<div class="order-cart" id="order-cart" aria-hidden="true">
  <div class="order-cart__backdrop" id="order-cart-backdrop"></div>
  <aside class="order-cart__panel" role="dialog" aria-modal="true" aria-labelledby="order-cart-title">
    <header class="order-cart__head">
      <h2 id="order-cart-title">Your order</h2>
      <button type="button" class="order-cart__close" id="order-cart-close" aria-label="Close cart">×</button>
    </header>
    <div class="order-cart__body">
      <p class="order-cart__empty" id="order-cart-empty">Your cart is empty. Add items from the menu to get started.</p>
      <div class="order-cart__items" id="order-cart-items"></div>
    </div>
    <footer class="order-cart__foot">
      <div class="order-cart__summary">
        <span>Estimated subtotal</span>
        <strong id="order-cart-total">$0.00</strong>
      </div>
      <div class="order-cart__actions">
        <a href="https://www.bagelbazaarmonroe.com/OrderOnline.tpl" class="btn btn-primary btn-magnetic" id="order-cart-checkout" target="_blank" rel="noopener">Checkout online</a>
        <button type="button" class="order-cart__clear" id="order-cart-clear">Clear cart</button>
      </div>
      <p class="order-cart__note">Items are saved on this device. Complete payment on our secure ordering site.</p>
    </footer>
  </aside>
</div>
<button type="button" class="cart-fab" id="cart-fab" aria-label="Open cart">${CART_ICON}<span class="cart-fab__count is-empty" id="cart-fab-count" data-cart-count>0</span></button>
<div class="cart-toast" id="cart-toast" role="status" aria-live="polite"></div>`;

export const HEAD = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/premium.css">
  <link rel="stylesheet" href="css/delight.css">
  <link rel="stylesheet" href="css/atmosphere.css">
  <link rel="stylesheet" href="css/cinematic.css">
  <link rel="stylesheet" href="css/features.css">
  <link rel="stylesheet" href="css/perf.css">
  <link rel="stylesheet" href="css/cart.css">
  <link rel="icon" href="assets/logo/bagel-bazaar-logo.png" type="image/png">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/ScrollTrigger.min.js" defer></script>
  <script src="js/site-config.js" defer></script>
  <script src="js/icons.js" defer></script>
  <script src="js/motion.js" defer></script>
  <script src="js/interactions.js" defer></script>
</head>`;

export function header(activeId) {
  const links = [
    ["welcome", "Welcome", "index.html"],
    ["menu", "Menu", "menu.html"],
    ["about", "About Us", "about.html"],
    ["location", "Location", "location.html"],
    ["contact", "Contact Us", "contact.html"],
    ["order", "Order Online", "order.html"],
    ["other", "Other", "other.html"],
    ["app", "Our App", "app.html"],
    ["loyalty", "Loyalty Program", "loyalty.html"],
  ];
  const desktop = links
    .map(
      ([id, label, href]) =>
        `<a href="${href}" data-nav="${id}" data-transition="page" class="nav-link${id === activeId ? " is-active" : ""}"><span class="nav-link__text">${label}</span></a>`
    )
    .join("\n        ");
  const mobile = links
    .map(
      ([id, label, href]) =>
        `<a href="${href}" data-nav="${id}" data-transition="page" class="nav-link${id === activeId ? " is-active" : ""}"><span class="nav-link__text">${label}</span></a>`
    )
    .join("\n      ");

  return `<a href="#main" class="skip-link">Skip to content</a>
  <div class="loader" id="loader" role="status" aria-live="polite" aria-busy="true">
    <div class="loader__backdrop"></div>
    <div class="loader__content">
      <div class="loader__emblem">
        <svg class="loader__ring" viewBox="0 0 120 120" aria-hidden="true">
          <circle class="loader__ring-track" cx="60" cy="60" r="52"/>
          <circle class="loader__ring-fill" id="loader-ring" cx="60" cy="60" r="52"/>
        </svg>
        <img src="assets/logo/bagel-bazaar-logo.png" alt="" class="loader__logo" width="72" height="72" decoding="async">
      </div>
      <p class="loader__brand">Bagel Bazaar</p>
      <p class="loader__location">Monroe, NJ</p>
      <p class="loader__tagline">Preparing your experience</p>
      <div class="loader__progress-wrap"><span id="loader-progress">0</span>%</div>
    </div>
  </div>
  <div class="page-transition" id="page-transition" aria-hidden="true">
    <div class="page-transition__panel page-transition__panel--left"></div>
    <div class="page-transition__panel page-transition__panel--right"></div>
    <div class="page-transition__brand"><img src="assets/logo/bagel-bazaar-logo.png" alt="" width="64" height="64"></div>
  </div>
  <div class="cursor-glow" id="cursor-glow" aria-hidden="true"></div>
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      <a href="index.html" class="logo" data-transition="page">
        <img src="assets/logo/bagel-bazaar-logo.png" alt="" class="logo-image" width="48" height="48">
        <span class="logo-text"><strong>Bagel Bazaar</strong><small>Monroe, NJ</small></span>
      </a>
      <nav class="nav-desktop" aria-label="Primary">
        ${desktop}
        <a href="tel:+16098609626" class="nav-phone">(609) 860-9626</a>
      </nav>
      <div class="header-cta">
        <button type="button" class="cart-toggle" id="cart-toggle" aria-label="View cart">${CART_ICON}<span class="cart-toggle__count is-empty" id="cart-toggle-count" data-cart-count>0</span></button>
        <a href="https://www.bagelbazaarmonroe.com/OrderOnline.tpl" class="btn btn-primary btn-magnetic header-order-btn" target="_blank" rel="noopener">Order Online</a>
        <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span><span></span><span></span></button>
      </div>
    </div>
    <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile" hidden>
      ${mobile}
      <a href="tel:+16098609626">(609) 860-9626</a>
    </nav>
  </header>`;
}

export function footer(extraScripts = "") {
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="assets/logo/bagel-bazaar-logo.png" alt="">
        <strong>Bagel Bazaar</strong>
        <p>337 Applegarth Rd #10, Monroe, NJ 08831<br>(609) 860-9626</p>
        <div class="footer-app">
          <p class="footer-app__label">Download the app</p>
          ${appDownloadButtons({ layout: "stacked", className: "app-download--footer", idPrefix: "footer" })}
        </div>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <a href="index.html" data-transition="page">Welcome</a>
        <a href="menu.html" data-transition="page">Menu</a>
        <a href="about.html" data-transition="page">About Us</a>
        <a href="location.html" data-transition="page">Location</a>
      </div>
      <div class="footer-col">
        <h4>Order and Rewards</h4>
        <a href="order.html" data-transition="page">Order Online</a>
        <a href="loyalty.html" data-transition="page">Loyalty Program</a>
        <a href="app.html" data-transition="page">Download Our App</a>
        <a href="other.html" data-transition="page">Other</a>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <a href="contact.html" data-transition="page">Contact Us</a>
        <a href="tel:+16098609626">(609) 860-9626</a>
        <a href="https://maps.google.com/?q=337+Applegarth+Rd+%2310+Monroe+NJ+08831" target="_blank" rel="noopener">Get Directions</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>&copy; <span id="year"></span> Bagel Bazaar Monroe. All rights reserved.</span>
      <span>Powered by QuikChow</span>
    </div>
  </footer>
  ${smartLoyaltyMoment()}
  ${quickActionBar()}
  ${cartShell}
  <script src="js/cart.js" defer></script>
  <script src="js/core.js" defer></script>${extraScripts}`;
}

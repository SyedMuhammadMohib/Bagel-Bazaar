/**
 * Premium interactive feature sections
 */
import { icon } from "./icons.mjs";

const ORDER = "https://www.bagelbazaarmonroe.com/OrderOnline.tpl";
const MAP = "https://maps.google.com/?q=337+Applegarth+Rd+%2310+Monroe+NJ+08831";
const PHONE = "tel:+16098609626";

/** Feature 1 — Signature featured-items spotlight */
export function signaturePicksSection() {
  return `<section class="signature-picks section section--atmosphere section--cinema" id="signature-picks" aria-labelledby="signature-picks-heading" data-reveal>
  <div class="section__ambient" aria-hidden="true"><span class="ambient-orb ambient-orb--1"></span></div>
  <div class="container">
    <div class="signature-picks__head section__head">
      <div>
        <p class="eyebrow">Signature picks</p>
        <h2 class="display-lg" id="signature-picks-heading">Most loved at Bagel Bazaar</h2>
        <p class="lead" style="margin:0.5rem 0 0">Guest favorites with one-tap ordering. Swipe to explore.</p>
      </div>
      <a href="${ORDER}" class="btn btn-outline btn-magnetic signature-picks__cta" target="_blank" rel="noopener">Order favorites</a>
    </div>
    <div class="signature-picks__stage">
      <div class="signature-picks__carousel">
        <button type="button" class="signature-picks__btn signature-picks__btn--prev" id="signature-picks-prev" aria-label="Previous favorite">&#8249;</button>
        <div class="signature-picks__viewport">
          <div class="signature-picks__scroller" id="signature-picks-track" role="list"></div>
        </div>
        <button type="button" class="signature-picks__btn signature-picks__btn--next" id="signature-picks-next" aria-label="Next favorite">&#8250;</button>
      </div>
      <div class="signature-picks__dots" id="signature-picks-dots" aria-hidden="true"></div>
    </div>
  </div>
</section>`;
}

/** Back-compat alias */
export const popularNowSection = signaturePicksSection;

export function breakfastBuilderSection() {
  return `<section class="breakfast-builder section section--inset-frame section--atmosphere" id="breakfast-builder" aria-labelledby="builder-heading" data-reveal>
  <div class="section__ambient" aria-hidden="true"><span class="ambient-orb ambient-orb--2"></span></div>
  <div class="container">
    <div class="inset-frame breakfast-builder__panel">
      <div class="breakfast-builder__intro section__head section__head--center">
        <p class="eyebrow">Build your breakfast</p>
        <h2 class="display-md" id="builder-heading">Your perfect morning, step by step</h2>
        <p class="lead section__head--center">Pick a bagel, spread, protein, and drink. We will have it ready when you arrive.</p>
      </div>
      <div class="breakfast-builder__steps" id="breakfast-builder">
        <div class="builder-step" data-builder-step="bagel">
          <h3 class="builder-step__label"><span class="builder-step__num">1</span> Choose your bagel</h3>
          <div class="builder-step__options" role="group" aria-label="Bagel choice"></div>
        </div>
        <div class="builder-step" data-builder-step="spread">
          <h3 class="builder-step__label"><span class="builder-step__num">2</span> Pick a spread</h3>
          <div class="builder-step__options" role="group" aria-label="Spread choice"></div>
        </div>
        <div class="builder-step" data-builder-step="protein">
          <h3 class="builder-step__label"><span class="builder-step__num">3</span> Add protein</h3>
          <div class="builder-step__options" role="group" aria-label="Protein choice"></div>
        </div>
        <div class="builder-step" data-builder-step="drink">
          <h3 class="builder-step__label"><span class="builder-step__num">4</span> Choose a drink</h3>
          <div class="builder-step__options" role="group" aria-label="Drink choice"></div>
        </div>
      </div>
      <div class="breakfast-builder__summary" id="builder-summary" aria-live="polite">
        <p class="breakfast-builder__preview">Everything bagel, cream cheese, bacon egg and cheese, hot coffee</p>
        <div class="breakfast-builder__summary-actions">
          <button type="button" class="btn btn-primary btn-magnetic btn-add-cart" id="builder-add-cart" data-add-cart data-cart-id="breakfast-combo" data-cart-name="Custom breakfast combo" data-cart-image="data/coffee.jpg" data-cart-note="Everything bagel, cream cheese, bacon egg and cheese, hot coffee"><span class="btn__text">Add combo to cart</span><span class="btn__shine"></span></button>
          <button type="button" class="btn btn-outline" data-cart-open>View cart</button>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/** Feature 7 — Smart loyalty / app moment (compact, site-wide) */
export function smartLoyaltyMoment() {
  return `<div class="smart-loyalty" aria-label="Rewards and app" data-reveal>
  <div class="container smart-loyalty__inner">
    <div class="smart-loyalty__copy">
      <p class="smart-loyalty__eyebrow">Member perks</p>
      <p class="smart-loyalty__text">Earn rewards on every order and reorder favorites faster in the app.</p>
    </div>
    <div class="smart-loyalty__actions">
      <a href="loyalty.html" class="btn btn-outline btn-sm" data-transition="page">Rewards</a>
      <a href="app.html" class="btn btn-primary btn-sm" data-transition="page">Get the app</a>
    </div>
  </div>
</div>`;
}

/** Feature 7 — Expanded loyalty strip (homepage / order) */
export function loyaltyValueStrip() {
  return `<section class="loyalty-strip section section--blush section--atmosphere" aria-label="App and loyalty benefits" data-reveal>
  <div class="container loyalty-strip__grid">
    <a href="app.html" class="loyalty-strip__card" data-transition="page" data-panel-spotlight>
      <span class="panel-spotlight" aria-hidden="true"></span>
      <span class="loyalty-strip__icon">${icon("bolt")}</span>
      <h3>Faster ordering</h3>
      <p>Order ahead from the app and skip the line.</p>
    </a>
    <a href="loyalty.html" class="loyalty-strip__card" data-transition="page" data-panel-spotlight>
      <span class="panel-spotlight" aria-hidden="true"></span>
      <span class="loyalty-strip__icon">${icon("repeat")}</span>
      <h3>Earn rewards</h3>
      <p>Points on every order, coupons in your inbox.</p>
    </a>
    <a href="app.html" class="loyalty-strip__card" data-transition="page" data-panel-spotlight>
      <span class="panel-spotlight" aria-hidden="true"></span>
      <span class="loyalty-strip__icon">${icon("food")}</span>
      <h3>Member favorites</h3>
      <p>Save go-to orders and repeat with one tap.</p>
    </a>
    <a href="order.html" class="loyalty-strip__card" data-transition="page" data-panel-spotlight>
      <span class="panel-spotlight" aria-hidden="true"></span>
      <span class="loyalty-strip__icon">${icon("car")}</span>
      <h3>Pickup or delivery</h3>
      <p>Choose what fits your morning schedule.</p>
    </a>
  </div>
</section>`;
}

/** Feature 4 — Menu review pairing strip (menu page) */
export function menuReviewPairing() {
  return `<section class="menu-reviews section section--atmosphere section--blush" aria-label="Guest favorites on the menu" data-reveal>
  <div class="container">
    <div class="menu-reviews__head section__head section__head--center">
      <p class="eyebrow">Guest favorites</p>
      <h2 class="display-md">What locals order most</h2>
    </div>
    <div class="menu-reviews__grid">
      <article class="menu-reviews__card">
        <img src="data/Belly Buster Sandwich.jpg" alt="" loading="lazy" decoding="async">
        <div><strong>Belly Buster</strong><p>They make a killer belly buster. Jesus Lopez</p></div>
      </article>
      <article class="menu-reviews__card">
        <img src="data/Egg & Cheese Sandwich.jpg" alt="" loading="lazy" decoding="async">
        <div><strong>Bacon Egg and Cheese</strong><p>Incredible bacon egg and cheese. Diana Lopez</p></div>
      </article>
      <article class="menu-reviews__card">
        <img src="data/coffee.jpg" alt="" loading="lazy" decoding="async">
        <div><strong>Morning Coffee</strong><p>The only place I get my coffee. Doxi Lopez</p></div>
      </article>
    </div>
    <p class="menu-reviews__link"><a href="index.html#reviews" class="link-slide" data-transition="page">Read all reviews</a></p>
  </div>
</section>`;
}

/** Feature 2 — Sticky quick-order bar (mobile + desktop) */
export function quickActionBar() {
  return `<nav class="mobile-bar mobile-bar--premium" id="mobile-bar" aria-label="Quick actions">
    <a href="${PHONE}" class="mobile-bar__action" aria-label="Call Bagel Bazaar"><span>Call</span></a>
    <a href="${MAP}" class="mobile-bar__action" target="_blank" rel="noopener" aria-label="Get directions"><span>Map</span></a>
    <a href="${ORDER}" class="btn btn-primary mobile-bar__order" target="_blank" rel="noopener">Order Now</a>
    <a href="loyalty.html" class="mobile-bar__action" data-transition="page" aria-label="Loyalty rewards"><span>Rewards</span></a>
  </nav>
  <aside class="order-dock order-dock--premium" id="order-dock" aria-label="Quick order" hidden>
    <div class="order-dock__inner container">
      <p class="order-dock__text"><strong>Bagel Bazaar</strong> open daily from 4:30 AM</p>
      <div class="order-dock__actions">
        <a href="${PHONE}" class="order-dock__link">Call</a>
        <a href="${MAP}" class="order-dock__link" target="_blank" rel="noopener">Directions</a>
        <a href="loyalty.html" class="order-dock__link" data-transition="page">Rewards</a>
        <a href="app.html" class="order-dock__link" data-transition="page">App</a>
        <a href="${ORDER}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">Order Now</a>
      </div>
    </div>
  </aside>`;
}

export const orderDock = quickActionBar;

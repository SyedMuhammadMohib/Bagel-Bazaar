/**
 * Reusable Bagel Bazaar app download components
 */
import { icon } from "./icons.mjs";

export const APP_LINKS = {
  ios: "https://apps.apple.com/us/app/bagel-bazaar-app/id6752311040",
  android:
    "https://play.google.com/store/apps/details?id=com.storefrontconsumer.bagel.bazaar&pcampaignid=web_share",
};

const appleIcon = `<svg class="store-badge__svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`;

const googleIcon = `<svg class="store-badge__svg store-badge__svg--play" viewBox="0 0 24 24" aria-hidden="true">
  <path fill="#EA4335" d="M1.04 1.82A1.02 1.02 0 0 0 0 2.84v18.32c0 .47.25.9.66 1.14l10.58-10.3L1.04 1.82z"/>
  <path fill="#FBBC04" d="M16.62 12 2.28 22.3l8.92-5.1 5.42-3.08L16.62 12z"/>
  <path fill="#4285F4" d="M2.28 1.7 16.62 12l-5.42-3.08L2.28 1.7z"/>
  <path fill="#34A853" d="M22.36 10.96a1.02 1.02 0 0 1 0 2.08l-3.82 2.12-4.92 2.84 8.74-5.02v-2.02z"/>
</svg>`;

/**
 * Premium App Store + Google Play badge buttons
 * @param {{ layout?: 'horizontal'|'stacked', className?: string, idPrefix?: string }} opts
 */
export function appDownloadButtons(opts = {}) {
  const layout = opts.layout || "horizontal";
  const cls = opts.className ? ` ${opts.className}` : "";
  const id = opts.idPrefix || "app";

  return `<div class="app-download app-download--${layout}${cls}" role="group" aria-label="Download the Bagel Bazaar app">
  <a href="${APP_LINKS.ios}" class="store-badge store-badge--apple has-ripple" id="${id}-ios" target="_blank" rel="noopener noreferrer" aria-label="Download Bagel Bazaar on the App Store">
    ${appleIcon}
    <span class="store-badge__text"><small>Download on the</small><strong>App Store</strong></span>
  </a>
  <a href="${APP_LINKS.android}" class="store-badge store-badge--google has-ripple" id="${id}-android" target="_blank" rel="noopener noreferrer" aria-label="Get Bagel Bazaar on Google Play">
    ${googleIcon}
    <span class="store-badge__text"><small>Get it on</small><strong>Google Play</strong></span>
  </a>
</div>`;
}

/** Compact promo strip for homepage / cross-sell */
export function appPromoStrip() {
  return `<section class="app-promo app-promo--cinematic section section--atmosphere" aria-labelledby="app-promo-heading" data-reveal>
  <div class="section__ambient" aria-hidden="true">
    <span class="ambient-orb ambient-orb--2"></span>
    <span class="ambient-orb ambient-orb--3"></span>
  </div>
  <div class="container app-promo__inner">
    <div class="app-promo__copy">
      <p class="eyebrow">Mobile app</p>
      <h2 class="display-md" id="app-promo-heading">Order faster from your phone</h2>
      <p class="lead">Customize meals, choose pickup or delivery, and reorder favorites in seconds with the official Bagel Bazaar app.</p>
      ${appDownloadButtons({ idPrefix: "promo", className: "app-download--light" })}
      <a href="app.html" class="app-promo__link link-slide" data-transition="page">Learn more about the app</a>
    </div>
    <div class="app-promo__visual" data-parallax-slow aria-hidden="true">
      <img src="data/Breakfast Bomb Sandwich.jpg" alt="" loading="lazy">
    </div>
  </div>
</section>`;
}

/** Cross-promo block for order / loyalty pages */
export function appPromoBlock(variant = "default") {
  const isCompact = variant === "compact";
  return `<div class="app-promo-block${isCompact ? " app-promo-block--compact" : ""}" data-reveal>
  <div class="app-promo-block__icon" aria-hidden="true">${icon("mobile", "ui-icon ui-icon--lg")}</div>
  <div class="app-promo-block__body">
    <h3 class="display-md" style="font-size:${isCompact ? "1.15rem" : "1.35rem"};margin:0 0 0.35rem">Get the official Bagel Bazaar app</h3>
    <p style="margin:0 0 1rem;color:var(--text-muted)">Simple ordering, meal customization, pickup or delivery, and faster repeat orders from your phone.</p>
    ${appDownloadButtons({ layout: isCompact ? "stacked" : "horizontal", idPrefix: variant })}
  </div>
</div>`;
}

/** Full app page body sections (after hero) */
export function appPageContent() {
  return `
      <section class="section section--cinema app-page">
        <div class="container app-page__hero-grid">
          <div class="app-mockup" data-reveal data-parallax-slow aria-hidden="true">
            <div class="app-mockup__glow"></div>
            <div class="app-mockup__device">
              <div class="app-mockup__notch"></div>
              <div class="app-mockup__screen">
                <img src="assets/logo/bagel-bazaar-logo.png" alt="" width="56" height="56">
                <p class="app-mockup__brand">Bagel Bazaar</p>
                <span class="app-mockup__pill">Order, customize, reorder</span>
                <ul class="app-mockup__list">
                  <li>Pickup or delivery</li>
                  <li>Full menu access</li>
                  <li>Loyalty rewards</li>
                </ul>
              </div>
            </div>
          </div>
          <div data-reveal>
            <p class="eyebrow">Official app</p>
            <h2 class="display-md">Your bagel run, simplified</h2>
            <p class="lead">The Bagel Bazaar app makes ordering simple and convenient. Customize your meals, choose pickup or delivery, and reorder favorites faster than ever.</p>
            ${appDownloadButtons({ idPrefix: "hero-app" })}
          </div>
        </div>
      </section>

      <section class="section section--alt section--cinema">
        <div class="container">
          <div class="section__head section__head--center" data-reveal>
            <p class="eyebrow">Why download</p>
            <h2 class="display-md">Built for busy mornings and easy reorders</h2>
          </div>
          <div class="app-benefits" data-reveal-stagger>
            <article class="app-benefit app-panel" data-reveal-item>
              <span class="app-benefit__icon" aria-hidden="true">${icon("bolt")}</span>
              <h3>Easy ordering</h3>
              <p>Browse the full menu and checkout in a few taps with no hassle.</p>
            </article>
            <article class="app-benefit app-panel" data-reveal-item>
              <span class="app-benefit__icon" aria-hidden="true">${icon("food")}</span>
              <h3>Meal customization</h3>
              <p>Build your bagel, sandwich, or coffee exactly the way you like it.</p>
            </article>
            <article class="app-benefit app-panel" data-reveal-item>
              <span class="app-benefit__icon" aria-hidden="true">${icon("car")}</span>
              <h3>Pickup or delivery</h3>
              <p>Choose what fits your schedule and we will have it ready.</p>
            </article>
            <article class="app-benefit app-panel" data-reveal-item>
              <span class="app-benefit__icon" aria-hidden="true">${icon("repeat")}</span>
              <h3>Faster repeat orders</h3>
              <p>Reorder favorites and earn loyalty rewards without starting over.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="cta-band cta-band--premium app-cta" data-reveal>
        <div class="cta-band__bg" aria-hidden="true"><div class="cta-band__orb"></div></div>
        <div class="container app-cta__inner">
          <h2 class="display-md">Download free today</h2>
          <p style="color:rgba(255,255,255,0.88);max-width:42ch;margin:0 auto 1.5rem">Join Monroe locals who order ahead, skip the line, and keep their favorites one tap away.</p>
          ${appDownloadButtons({ className: "app-download--light", idPrefix: "cta-app" })}
        </div>
      </section>`;
}

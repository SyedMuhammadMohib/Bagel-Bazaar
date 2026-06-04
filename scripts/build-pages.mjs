import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { HEAD, header, footer } from "./page-shell.mjs";
import { appDownloadButtons, appPageContent, appPromoBlock, appPromoStrip } from "./app-components.mjs";
import { signaturePicksSection, breakfastBuilderSection, loyaltyValueStrip, menuReviewPairing } from "./features.mjs";
import { icon, stars, HOURS_HTML, HOURS_SHORT } from "./icons.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function enc(path) {
  const slash = path.lastIndexOf("/");
  if (slash === -1) return encodeURIComponent(path);
  return path.slice(0, slash + 1) + encodeURIComponent(path.slice(slash + 1));
}

const pages = [
  {
    file: "index.html",
    page: "welcome",
    title: "Bagel Bazaar Monroe, NJ | Welcome",
    desc: "Fresh bagels, breakfast, lunch and more in Monroe, NJ. Order online or visit us today.",
    body: `
  <main id="main">
    <div id="page">
      <section class="hero hero--cinema hero--video">
        <div class="hero__ambient" aria-hidden="true">
          <div class="hero__video-wrap" data-hero-parallax>
            <video class="hero__video" autoplay muted loop playsinline preload="auto">
              <source src="data/Background_Video.mp4" type="video/mp4">
            </video>
          </div>
          <div class="hero__video-overlay"></div>
          <div class="hero__vignette"></div>
          <div class="hero__light-sweep"></div>
          <div class="hero__fog"></div>
          <div class="hero__ambient-glow" aria-hidden="true"></div>
          <div class="hero__grain"></div>
        </div>
        <div class="container hero__grid hero__grid--video">
          <div class="hero__content">
            <div class="hero__eyebrow-wrap">
              <p class="eyebrow hero__eyebrow">Monroe, New Jersey</p>
            </div>
            <h1 class="display-xl hero__title">
              <span class="line-mask"><span class="line-inner">Fresh bagels,</span></span>
              <span class="line-mask"><span class="line-inner"><em>built for mornings</em></span></span>
              <span class="line-mask"><span class="line-inner">worth slowing down for.</span></span>
            </h1>
            <p class="lead hero__lead">Authentic New York-style bagels, breakfast sandwiches, salads, subs, and wraps, made fresh daily from 4:30 AM. Order for pickup or stop by Applegarth Road.</p>
            <div class="hero__actions">
              <a href="https://www.bagelbazaarmonroe.com/OrderOnline.tpl" class="btn btn-primary btn-magnetic" target="_blank" rel="noopener"><span class="btn__text">Order Online</span><span class="btn__shine"></span></a>
              <a href="menu.html" class="btn btn-outline btn-magnetic" data-transition="page">Explore Menu</a>
            </div>
            <div class="hero__stats">
              <div class="hero__stat"><strong>4:30 AM</strong><span>Open daily, early</span></div>
              <div class="hero__stat"><strong data-count="219" data-suffix="+">0</strong><span>Menu items photographed</span></div>
              <div class="hero__stat"><strong data-count="5" data-decimals="1" data-suffix="/5">0</strong><span>Guest rating on Google</span></div>
            </div>
          </div>
          <div class="hero__visual" data-parallax-slow aria-hidden="true">
            <div class="hero__frame hero__frame--main">
              <img src="data/Belly Buster Sandwich.jpg" alt="" loading="eager">
            </div>
            <span class="hero__float">Fresh daily</span>
            <span class="hero__float hero__float--alt">4:30 AM</span>
          </div>
        </div>
        <div class="hero__scroll-cue" aria-hidden="true">
          <span class="hero__scroll-line"></span>
          Scroll
        </div>
      </section>

      <div class="marquee-strip marquee-strip--cinematic" aria-hidden="true">
        <div class="marquee-strip__track">
          <span class="marquee-strip__item"><span class="marquee-strip__dot"></span> NY-Style Bagels</span>
          <span class="marquee-strip__item"><span class="marquee-strip__dot"></span> Belly Buster Sandwiches</span>
          <span class="marquee-strip__item"><span class="marquee-strip__dot"></span> Fresh Coffee Bar</span>
          <span class="marquee-strip__item"><span class="marquee-strip__dot"></span> Catering and Platters</span>
          <span class="marquee-strip__item"><span class="marquee-strip__dot"></span> Rainbow Bagels</span>
          <span class="marquee-strip__item"><span class="marquee-strip__dot"></span> Loyalty Rewards</span>
          <span class="marquee-strip__item"><span class="marquee-strip__dot"></span> NY-Style Bagels</span>
          <span class="marquee-strip__item"><span class="marquee-strip__dot"></span> Belly Buster Sandwiches</span>
          <span class="marquee-strip__item"><span class="marquee-strip__dot"></span> Fresh Coffee Bar</span>
          <span class="marquee-strip__item"><span class="marquee-strip__dot"></span> Catering and Platters</span>
          <span class="marquee-strip__item"><span class="marquee-strip__dot"></span> Rainbow Bagels</span>
          <span class="marquee-strip__item"><span class="marquee-strip__dot"></span> Loyalty Rewards</span>
        </div>
      </div>

      ${signaturePicksSection()}

      <hr class="section-divider section-divider--animate">

      <section class="section section--inset section--cinema section--atmosphere section--blush section--scene-bento" data-section-depth>
        <div class="section__ambient" aria-hidden="true">
          <span class="ambient-orb ambient-orb--1"></span>
          <span class="ambient-orb ambient-orb--2"></span>
        </div>
        <div class="container">
          <div class="inset-panel">
            <div class="section__head section__head--center" data-reveal>
              <p class="eyebrow">Signature favorites</p>
              <h2 class="display-lg">The orders people come back for</h2>
              <p class="lead section__head--center">Every plate tells a story, from legendary breakfast stacks to deli classics and morning coffee rituals.</p>
            </div>
            <div class="bento-grid" data-reveal-stagger>
              <article class="bento-card bento-card--hero" data-reveal-item data-tilt>
                <div class="bento-card__media"><img src="data/Belly Buster Sandwich.jpg" alt="Belly Buster Sandwich" loading="lazy"></div>
                <div class="bento-card__body"><span class="bento-card__tag">Fan favorite</span><h3>Belly Buster</h3><p>Our legendary breakfast sandwich, hearty, stacked, and unforgettable.</p></div>
              </article>
              <article class="bento-card bento-card--a" data-reveal-item data-tilt>
                <div class="bento-card__media"><img src="data/Classic French Toast.jpg" alt="Classic French Toast" loading="lazy"></div>
                <div class="bento-card__body"><span class="bento-card__tag">Breakfast</span><h3>Classic French Toast</h3><p>Golden, fluffy, finished with warm syrup.</p></div>
              </article>
              <article class="bento-card bento-card--b" data-reveal-item data-tilt>
                <div class="bento-card__media"><img src="data/coffee.jpg" alt="Fresh coffee" loading="lazy"></div>
                <div class="bento-card__body"><span class="bento-card__tag">Coffee bar</span><h3>Morning Ritual</h3><p>Espresso, lattes, frappes, and Box o Joe.</p></div>
              </article>
              <article class="bento-card bento-card--c" data-reveal-item data-tilt>
                <div class="bento-card__media"><img src="${enc("data/#2 The Reuben.jpg")}" alt="The Reuben" loading="lazy"></div>
                <div class="bento-card__body"><span class="bento-card__tag">Lunch</span><h3>The Reuben</h3><p>Real deli-style, not the chains.</p></div>
              </article>
              <article class="bento-card bento-card--d" data-reveal-item data-tilt>
                <div class="bento-card__media"><img src="data/bagel with lox spread.jpg" alt="Bagel with lox" loading="lazy"></div>
                <div class="bento-card__body"><span class="bento-card__tag">Classic</span><h3>Lox and Spreads</h3><p>Premium toppings on NY-style bagels.</p></div>
              </article>
              <article class="bento-card bento-card--e" data-reveal-item data-tilt>
                <div class="bento-card__media"><img src="data/Caesar Salad.jpg" alt="Caesar Salad" loading="lazy"></div>
                <div class="bento-card__body"><span class="bento-card__tag">Lighter fare</span><h3>Fresh Salads</h3><p>Crisp greens and bold flavors.</p></div>
              </article>
            </div>
          </div>
        </div>
      </section>

      ${breakfastBuilderSection()}

      <div class="scene-bridge scene-bridge--to-rich" aria-hidden="true"></div>

      <section class="reviews reviews--premium reviews--cinematic section section--rich section--atmosphere section--cinema" id="reviews" aria-labelledby="reviews-heading">
        <div class="section__ambient" aria-hidden="true">
          <span class="ambient-orb ambient-orb--1"></span>
          <span class="ambient-orb ambient-orb--3"></span>
        </div>
        <div class="container reviews__stage">
          <div class="reviews__head section__head section__head--center" data-reveal>
            <p class="eyebrow">Google Reviews</p>
            <h2 class="display-lg" id="reviews-heading">Loved by Monroe Locals</h2>
            <p class="lead section__head--center">Five-star mornings from guests who keep coming back.</p>
          </div>
          <div class="review-food-chips" id="review-food-chips" role="group" aria-label="Filter reviews by menu item"></div>
          <div class="reviews__spotlight" id="reviews-spotlight" data-reveal aria-live="polite">
            <p class="reviews__spotlight-quote">Best bagels, crispy on the outside, soft and chewy on the inside.</p>
            <div class="reviews__spotlight-meta">
              <span class="reviews__spotlight-stars" aria-hidden="true"></span>
              <span class="reviews__spotlight-author">Selvin Iraheta-Gutierrez</span>
            </div>
          </div>
          <div class="reviews__toolbar" data-reveal>
            <div class="reviews__google-badge" aria-label="5 out of 5 stars on Google">
              <span class="reviews__google-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </span>
              ${stars(5, "reviews__google-stars star-row")}
              <span class="reviews__google-text"><strong>5.0</strong> average on Google</span>
            </div>
            <div class="reviews__filters" id="reviews-filters" role="tablist" aria-label="Filter reviews by topic"></div>
          </div>
          <div class="reviews-carousel" data-reveal>
            <button type="button" class="reviews-carousel__btn reviews-carousel__btn--prev" id="reviews-prev" aria-label="Previous reviews">&#8249;</button>
            <div class="reviews-carousel__viewport" id="reviews-viewport">
              <div class="reviews-carousel__track" id="reviews-track"></div>
            </div>
            <button type="button" class="reviews-carousel__btn reviews-carousel__btn--next" id="reviews-next" aria-label="Next reviews">&#8250;</button>
          </div>
          <div class="reviews-carousel__dots" id="reviews-dots" aria-label="Review carousel pagination"></div>
          <div class="reviews-marquee" aria-hidden="true">
            <div class="reviews-marquee__track" id="reviews-marquee"></div>
          </div>
        </div>
      </section>

      <div class="scene-bridge scene-bridge--to-light" aria-hidden="true"></div>

      <section class="section section--cinema section--atmosphere section--scene-story" data-pin-section>
        <div class="section__ambient" aria-hidden="true">
          <span class="ambient-orb ambient-orb--2"></span>
        </div>
        <div class="container story-panel">
          <div class="story-panel__media" data-pin-panel data-clip-reveal>
            <img src="data/Perfect Garden Salad.jpg" alt="Fresh garden salad at Bagel Bazaar" loading="lazy">
            <span class="story-panel__frame" aria-hidden="true"></span>
          </div>
          <div data-reveal>
            <p class="eyebrow">Why Bagel Bazaar</p>
            <h2 class="display-md"><span class="line-mask"><span class="line-inner">A local institution.</span></span> <span class="line-mask"><span class="line-inner">Elevated.</span></span></h2>
            <p class="lead">We use only the finest products and ingredients, from hand-rolled bagels to made-to-order breakfast and lunch.</p>
            <div class="story-panel__list" data-reveal-stagger>
              <div class="story-panel__item" data-reveal-item><span class="story-panel__num">01</span><div><strong>Fresh daily</strong><p style="margin:0.25rem 0 0;color:var(--text-muted);font-size:0.9375rem">Bagels baked in-house every morning from 4:30 AM.</p></div></div>
              <div class="story-panel__item" data-reveal-item><span class="story-panel__num">02</span><div><strong>Full menu</strong><p style="margin:0.25rem 0 0;color:var(--text-muted);font-size:0.9375rem">Breakfast, lunch, salads, subs, wraps, and catering.</p></div></div>
              <div class="story-panel__item" data-reveal-item><span class="story-panel__num">03</span><div><strong>Community first</strong><p style="margin:0.25rem 0 0;color:var(--text-muted);font-size:0.9375rem">Fast, friendly service that keeps Monroe coming back.</p></div></div>
            </div>
            <p style="margin-top:2rem"><a href="about.html" class="btn btn-outline btn-magnetic" data-transition="page">Our Story</a></p>
          </div>
        </div>
      </section>

      <section class="scene scene--daypart section section--rich section--atmosphere section--cinema" data-scene="daypart" data-section-depth>
        <div class="section__ambient" aria-hidden="true">
          <span class="ambient-orb ambient-orb--1"></span>
          <span class="ambient-orb ambient-orb--3"></span>
        </div>
        <div class="container">
          <div class="daypart-scene" data-reveal-stagger>
            <div class="daypart-scene__head section__head section__head--center" data-reveal-item>
              <p class="eyebrow">From sunrise to afternoon</p>
              <h2 class="display-lg">Breakfast gives way to lunch</h2>
              <p class="lead section__head--center">One kitchen, two moods. Start with bagels and coffee, stay for subs, salads, and deli classics.</p>
            </div>
            <div class="daypart-scene__grid">
              <article class="daypart-card" data-reveal-item data-tilt>
                <div class="cinematic-media"><img src="data/Classic French Toast.jpg" alt="Breakfast at Bagel Bazaar" loading="lazy"><span class="cinematic-media__label">Morning</span></div>
                <div><h3>Breakfast and coffee</h3><p>Bagels, egg sandwiches, French toast, and the coffee bar.</p></div>
              </article>
              <div class="daypart-scene__divider" aria-hidden="true"><span></span>Through the day<span></span></div>
              <article class="daypart-card" data-reveal-item data-tilt>
                <div class="cinematic-media"><img src="${enc("data/#2 The Reuben.jpg")}" alt="Lunch at Bagel Bazaar" loading="lazy"><span class="cinematic-media__label">Afternoon</span></div>
                <div><h3>Lunch and deli</h3><p>Subs, wraps, salads, and hot sandwiches made to order.</p></div>
              </article>
            </div>
            <p class="daypart-scene__cta" data-reveal-item><a href="menu.html" class="btn btn-white btn-magnetic" data-transition="page"><span class="btn__text">Explore the Full Menu</span></a></p>
          </div>
        </div>
      </section>

      ${loyaltyValueStrip()}

      ${appPromoStrip()}

      <section class="cta-band cta-band--premium cta-band--cinematic" data-reveal>
        <div class="cta-band__bg" aria-hidden="true"><div class="cta-band__orb"></div></div>
        <div class="container cta-band__grid">
          <div>
            <p class="eyebrow" style="color:rgba(255,255,255,0.75)">Ready when you are</p>
            <h2 class="display-md">Order pickup in minutes</h2>
            <p style="color:rgba(255,255,255,0.85);max-width:42ch">Save your favorites, earn loyalty rewards, and reorder with a few taps. Your next bagel is closer than you think.</p>
            <div class="cta-band__actions">
              <a href="https://www.bagelbazaarmonroe.com/OrderOnline.tpl" class="btn btn-white btn-magnetic" target="_blank" rel="noopener"><span class="btn__text">Order Now</span></a>
              <a href="menu.html" class="btn btn-outline btn-magnetic" style="border-color:rgba(255,255,255,0.5);color:#fff" data-transition="page">View Menu</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>`,
    scripts: `
  <script src="js/features-data.js" defer></script>
  <script src="js/features.js" defer></script>
  <script src="js/reviews-data.js" defer></script>
  <script src="js/reviews.js" defer></script>`,
  },
  {
    file: "menu.html",
    page: "menu",
    title: "Menu | Bagel Bazaar Monroe, NJ",
    desc: "Browse our full menu: bagels, breakfast, lunch, salads, subs, wraps, coffee, and beverages.",
    body: `
  <main id="main">
    <div id="page">
      <section class="page-hero page-hero--premium page-hero--cinematic">
        <div class="page-hero__bg" aria-hidden="true" data-hero-parallax>
          <img src="data/bagel with lox spread.jpg" alt="" loading="eager">
        </div>
        <div class="container page-hero__inner" data-reveal>
          <p class="eyebrow">Full menu</p>
          <h1 class="display-lg page-hero__title">
            <span class="line-mask"><span class="line-inner">Browse the menu.</span></span>
            <span class="line-mask"><span class="line-inner">Order in seconds.</span></span>
          </h1>
          <p class="lead page-hero__lead">219 items photographed with real menu images. Filter by category and order online anytime.</p>
        </div>
      </section>
      <section class="menu-section menu-section--premium menu-section--cinematic">
        <div class="menu-toolbar menu-toolbar--premium menu-toolbar--cinematic">
          <div class="container">
            <div class="menu-header">
              <p class="menu-header__count"><strong>219 items</strong> across 30 categories. Updated pricing.</p>
            </div>
            <div class="menu-nav" aria-label="Menu category navigation">
              <button type="button" class="menu-nav__btn menu-nav__btn--prev" id="menu-scroll-prev" aria-label="Scroll categories left">&#8249;</button>
              <div class="menu-browser-wrap menu-browser-wrap--premium" id="menu-browser-wrap">
                <div class="menu-browser" id="menu-filters" role="tablist" aria-label="Menu categories">
                  <span class="menu-indicator" id="menu-indicator"></span>
                </div>
              </div>
              <button type="button" class="menu-nav__btn menu-nav__btn--next" id="menu-scroll-next" aria-label="Scroll categories right">&#8250;</button>
            </div>
            <p class="menu-category-note" id="menu-category-note" hidden></p>
          </div>
        </div>
        <div class="container">
          <p class="menu-category-label" id="menu-category-label" aria-live="polite"></p>
          <div class="menu-grid menu-grid--premium" id="menu-grid" role="tabpanel"></div>
        </div>
      </section>
      ${menuReviewPairing()}
    </div>
  </main>`,
    scripts: `
  <script src="js/menu-data.js" defer></script>
  <script src="js/menu-images.js" defer></script>
  <script src="js/menu.js" defer></script>`,
  },
  {
    file: "about.html",
    page: "about",
    title: "About Us | Bagel Bazaar Monroe, NJ",
    desc: "Learn about Bagel Bazaar Monroe: fresh American cuisine, NY-style bagels, and a local favorite.",
    body: `
  <main id="main">
    <div id="page">
      <section class="page-hero page-hero--premium">
        <div class="container page-hero__inner" data-reveal>
          <p class="eyebrow">About us</p>
          <h1 class="display-lg page-hero__title">
            <span class="line-mask"><span class="line-inner">Welcome to</span></span>
            <span class="line-mask"><span class="line-inner">Bagel Bazaar</span></span>
          </h1>
          <p class="lead page-hero__lead">Fresh American cuisine using only the finest products and ingredients, plus salads, subs, wraps, and so much more.</p>
        </div>
      </section>
      <section class="section section--cinema section--atmosphere section--blush">
        <div class="section__ambient" aria-hidden="true">
          <span class="ambient-orb ambient-orb--1"></span>
          <span class="ambient-orb ambient-orb--2"></span>
        </div>
        <div class="container split split--framed">
          <div class="split__frame" data-reveal>
            <div class="split__media clip-reveal" data-clip-reveal>
              <div class="clip-reveal__inner"><img src="data/Breakfast Bomb Sandwich.jpg" alt="Breakfast at Bagel Bazaar" loading="lazy"></div>
            </div>
          </div>
          <div class="split__copy" data-reveal>
            <p class="eyebrow">Our kitchen</p>
            <h2 class="display-md">More than a bagel shop</h2>
            <p>Bagel Bazaar Monroe is where neighbors start their mornings and fuel their afternoons. From hand-rolled bagels and egg dishes to French toast, fresh salads, and hearty lunch favorites, we bring authentic flavor and fast, friendly service together under one roof.</p>
            <p>Stop by for a visit or place a delivery or takeout order. Try our interactive ordering once and you will be hooked.</p>
          </div>
        </div>
      </section>
      <section class="section section--rich section--atmosphere section--cinema" data-section-depth>
        <div class="section__ambient" aria-hidden="true">
          <span class="ambient-orb ambient-orb--1"></span>
          <span class="ambient-orb ambient-orb--3"></span>
        </div>
        <div class="container">
          <div class="section__head section__head--center" data-reveal>
            <p class="eyebrow">Our story</p>
            <h2 class="display-md">Built on mornings, community and craft</h2>
          </div>
          <div class="section-divider section-divider--animate"></div>
          <div class="timeline timeline--rich" data-reveal>
            <div class="timeline__item"><span class="timeline__dot">1</span><div class="timeline__content rich-card"><span class="rich-card__spotlight" aria-hidden="true"></span><h3>Early risers welcome</h3><p>Doors open at 4:30 AM because great mornings start before the sun.</p></div></div>
            <div class="timeline__item"><span class="timeline__dot">2</span><div class="timeline__content rich-card"><span class="rich-card__spotlight" aria-hidden="true"></span><h3>Hand-rolled and baked fresh</h3><p>NY-style bagels with classic and specialty flavors, made in-house daily.</p></div></div>
            <div class="timeline__item"><span class="timeline__dot">3</span><div class="timeline__content rich-card"><span class="rich-card__spotlight" aria-hidden="true"></span><h3>Full-service deli</h3><p>Breakfast, lunch, catering, coffee bar, and everything in between.</p></div></div>
            <div class="timeline__item"><span class="timeline__dot">4</span><div class="timeline__content rich-card"><span class="rich-card__spotlight" aria-hidden="true"></span><h3>Monroe's gathering place</h3><p>Fast, friendly service that turns first visits into lifelong regulars.</p></div></div>
          </div>
        </div>
      </section>
      <section class="section section--inset-frame section--atmosphere">
        <div class="section__ambient" aria-hidden="true"><span class="ambient-orb ambient-orb--2"></span></div>
        <div class="container">
          <div class="inset-frame" data-section-depth>
            <div class="section__head section__head--center" data-reveal>
              <p class="eyebrow">What we serve</p>
              <h2 class="display-md">Delicious egg dishes, French toast, fresh salads and more</h2>
            </div>
            <div class="info-grid" data-reveal-stagger>
              <div class="info-card info-card--premium" data-reveal-item data-panel-spotlight><span class="panel-spotlight" aria-hidden="true"></span><h3>Fresh Bagels Daily</h3><p>NY-style bagels baked in-house with classic and specialty spreads.</p></div>
              <div class="info-card info-card--premium" data-reveal-item data-panel-spotlight><span class="panel-spotlight" aria-hidden="true"></span><h3>Breakfast and Lunch</h3><p>Sandwiches, omelettes, burritos, quesadillas, burgers, and hot subs.</p></div>
              <div class="info-card info-card--premium" data-reveal-item data-panel-spotlight><span class="panel-spotlight" aria-hidden="true"></span><h3>Catering Ready</h3><p>Office breakfasts and group spreads, including Box o Joe, platters, and more.</p></div>
              <div class="info-card info-card--premium" data-reveal-item data-panel-spotlight><span class="panel-spotlight" aria-hidden="true"></span><h3>Order Your Way</h3><p>Online ordering, mobile app, and loyalty rewards for regulars.</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>`,
  },
  {
    file: "location.html",
    page: "location",
    title: "Location | Bagel Bazaar Monroe, NJ",
    desc: "Visit Bagel Bazaar at 337 Applegarth Rd #10, Monroe, NJ 08831. Hours, directions, and map.",
    body: `
  <main id="main">
    <div id="page">
      <section class="page-hero page-hero--premium page-hero--compact">
        <div class="container page-hero__inner" data-reveal>
          <p class="eyebrow">Visit us</p>
          <h1 class="display-lg page-hero__title"><span class="line-mask"><span class="line-inner">Find us in Monroe</span></span></h1>
          <p class="lead page-hero__lead">Easy to find, fast pickup, and always worth the trip.</p>
        </div>
      </section>
      <section class="section section--cinema section--atmosphere section--blush">
        <div class="section__ambient" aria-hidden="true">
          <span class="ambient-orb ambient-orb--1"></span>
          <span class="ambient-orb ambient-orb--2"></span>
        </div>
        <div class="container split split--framed">
          <div data-reveal-stagger>
            <div class="location-cards">
              <div class="location-card" data-reveal-item data-panel-spotlight><span class="panel-spotlight" aria-hidden="true"></span><span class="location-card__icon">${icon("pin")}</span><div><h3>Address</h3><p>337 Applegarth Rd #10<br>Monroe, NJ 08831</p></div></div>
              <div class="location-card" data-reveal-item data-panel-spotlight><span class="panel-spotlight" aria-hidden="true"></span><span class="location-card__icon">${icon("phone")}</span><div><h3>Phone</h3><p><a href="tel:+16098609626">(609) 860-9626</a></p></div></div>
              <div class="location-card" data-reveal-item data-panel-spotlight><span class="panel-spotlight" aria-hidden="true"></span><span class="location-card__icon">${icon("clock")}</span><div><h3>Hours</h3><p>${HOURS_HTML}</p></div></div>
            </div>
            <p style="margin-top:1.5rem" data-reveal-item>
              <a href="https://maps.google.com/?q=337+Applegarth+Rd+%2310+Monroe+NJ+08831" class="btn btn-primary btn-magnetic" target="_blank" rel="noopener"><span class="btn__text">Get Directions</span><span class="btn__shine"></span></a>
            </p>
          </div>
          <div class="split__frame" data-reveal>
            <div class="map-embed map-embed--premium map-embed--framed" data-clip-reveal>
              <iframe title="Bagel Bazaar Monroe map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=337+Applegarth+Rd+%2310+Monroe+NJ+08831&hl=en&z=18&output=embed&t=k"></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>`,
  },
  {
    file: "contact.html",
    page: "contact",
    title: "Contact Us | Bagel Bazaar Monroe, NJ",
    desc: "Contact Bagel Bazaar Monroe by phone, email, or message.",
    body: `
  <main id="main">
    <div id="page">
      <section class="page-hero page-hero--premium page-hero--compact">
        <div class="container page-hero__inner" data-reveal>
          <p class="eyebrow">Contact</p>
          <h1 class="display-lg page-hero__title"><span class="line-mask"><span class="line-inner">We'd love to hear from you</span></span></h1>
          <p class="lead page-hero__lead">Questions about catering, hours, or your order? Reach out anytime.</p>
        </div>
      </section>
      <section class="section section--cinema section--atmosphere section--rich" data-section-depth>
        <div class="section__ambient" aria-hidden="true">
          <span class="ambient-orb ambient-orb--1"></span>
          <span class="ambient-orb ambient-orb--2"></span>
          <span class="ambient-orb ambient-orb--3"></span>
        </div>
        <div class="container">
          <div class="section-divider section-divider--animate"></div>
          <div class="contact-stage" data-reveal-stagger>
            <div class="contact-stage__intro" data-reveal-item>
              <p class="eyebrow">Reach us</p>
              <h2 class="display-md">We're here to help</h2>
              <p class="lead">Questions about catering, hours, or your order? Pick the fastest way to connect, or send us a message and we will get back to you.</p>
              <div class="contact-channels">
                <a href="tel:+16098609626" class="contact-channel has-ripple" data-panel-spotlight>
                  <span class="contact-channel__spotlight" aria-hidden="true"></span>
                  <span class="contact-channel__icon">${icon("phone")}</span>
                  <div><span class="contact-channel__label">Phone</span><span class="contact-channel__value">(609) 860-9626</span><span class="contact-channel__hint">Call during business hours</span></div>
                </a>
                <a href="https://maps.google.com/?q=337+Applegarth+Rd+%2310+Monroe+NJ+08831" class="contact-channel has-ripple" target="_blank" rel="noopener" data-panel-spotlight>
                  <span class="contact-channel__spotlight" aria-hidden="true"></span>
                  <span class="contact-channel__icon">${icon("pin")}</span>
                  <div><span class="contact-channel__label">Visit</span><span class="contact-channel__value">337 Applegarth Rd #10</span><span class="contact-channel__hint">Monroe, NJ 08831</span></div>
                </a>
                <a href="https://www.bagelbazaarmonroe.com/OrderOnline.tpl" class="contact-channel has-ripple" target="_blank" rel="noopener" data-panel-spotlight>
                  <span class="contact-channel__spotlight" aria-hidden="true"></span>
                  <span class="contact-channel__icon">${icon("cart")}</span>
                  <div><span class="contact-channel__label">Order online</span><span class="contact-channel__value">bagelbazaarmonroe.com</span><span class="contact-channel__hint">Pickup and delivery</span></div>
                </a>
              </div>
            </div>
            <div class="contact-stage__form-wrap" data-reveal-item>
              <div class="contact-form-panel">
                <div class="contact-form-panel__header">
                  <h3>Send a message</h3>
                  <p>We typically respond within one business day.</p>
                </div>
                <form class="form-grid form-grid--premium" action="https://www.bagelbazaarmonroe.com/ContactUs.tpl" method="get">
                  <div class="form-field"><span class="form-field__glow" aria-hidden="true"></span><label for="name">Name</label><input id="name" name="name" type="text" autocomplete="name" required placeholder="Your name"></div>
                  <div class="form-field"><span class="form-field__glow" aria-hidden="true"></span><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required placeholder="you@email.com"></div>
                  <div class="form-field"><span class="form-field__glow" aria-hidden="true"></span><label for="message">Message</label><textarea id="message" name="message" rows="5" required placeholder="How can we help?"></textarea></div>
                  <button type="submit" class="btn btn-primary btn-magnetic btn-submit-premium"><span class="btn__text">Send Message</span><span class="btn__shine"></span></button>
                </form>
              </div>
            </div>
          </div>
          <div class="trust-band" style="margin-top:2.5rem" data-reveal>
            <div class="trust-band__item">${icon("check", "ui-icon ui-icon--mark")} Monroe favorite since day one</div>
            <div class="trust-band__item">${icon("check", "ui-icon ui-icon--mark")} Fast, friendly responses</div>
            <div class="trust-band__item">${icon("check", "ui-icon ui-icon--mark")} Catering and group orders welcome</div>
          </div>
        </div>
      </section>
    </div>
  </main>`,
  },
  {
    file: "order.html",
    page: "order",
    title: "Order Online | Bagel Bazaar Monroe, NJ",
    desc: "Order Bagel Bazaar online for pickup or delivery. Fast, easy, and saves your favorites.",
    body: `
  <main id="main">
    <div id="page">
      <section class="page-hero page-hero--premium">
        <div class="container page-hero__inner" data-reveal>
          <p class="eyebrow">Order online</p>
          <h1 class="display-lg page-hero__title">
            <span class="line-mask"><span class="line-inner">Your favorites,</span></span>
            <span class="line-mask"><span class="line-inner">a few clicks away</span></span>
          </h1>
          <p class="lead page-hero__lead">For takeout or delivery. Delivery within 4 miles with a $20 minimum and a 5% online convenience charge. Delivery Monday to Friday only, with no weekend delivery.</p>
          <p class="lead" style="margin-top:0.75rem;font-size:0.95rem"><strong>Available:</strong> ${HOURS_SHORT}</p>
        </div>
      </section>
      <section class="section section--cinema section--atmosphere section--blush">
        <div class="section__ambient" aria-hidden="true"><span class="ambient-orb ambient-orb--1"></span></div>
        <div class="container">
          <div class="inset-frame" data-section-depth data-reveal>
            <div class="urgency-panel urgency-panel--elevated">
              <div class="urgency-panel__pulse"><span class="hero__float-dot"></span> Kitchen open daily</div>
              <h2 class="display-md" style="margin:0 0 0.75rem">Skip the line and order ahead</h2>
              <p style="margin:0 0 1.5rem;color:var(--text-muted);max-width:48ch">Pick up fresh bagels and breakfast without the wait. Customize, checkout, and go.</p>
              <a href="https://www.bagelbazaarmonroe.com/OrderOnline.tpl" class="btn btn-primary btn-magnetic" target="_blank" rel="noopener"><span class="btn__text">Open Ordering</span><span class="btn__shine"></span></a>
            </div>
          </div>
        </div>
      </section>
      <section class="section section--rich section--atmosphere section--cinema">
        <div class="section__ambient" aria-hidden="true">
          <span class="ambient-orb ambient-orb--2"></span>
          <span class="ambient-orb ambient-orb--3"></span>
        </div>
        <div class="container">
          <div class="section__head section__head--center" data-reveal>
            <p class="eyebrow">How it works</p>
            <h2 class="display-md">Three steps to your order</h2>
          </div>
          <div class="info-grid" data-reveal-stagger style="margin-top:2rem">
            <div class="rich-card" data-reveal-item data-panel-spotlight><span class="rich-card__spotlight" aria-hidden="true"></span><span class="rich-card__num">1</span><h3>Browse the menu</h3><p>Explore bagels, breakfast, lunch, and drinks with photos of every item.</p></div>
            <div class="rich-card" data-reveal-item data-panel-spotlight><span class="rich-card__spotlight" aria-hidden="true"></span><span class="rich-card__num">2</span><h3>Customize and checkout</h3><p>Add items, choose pickup or delivery, and pay securely online.</p></div>
            <div class="rich-card" data-reveal-item data-panel-spotlight><span class="rich-card__spotlight" aria-hidden="true"></span><span class="rich-card__num">3</span><h3>Earn rewards</h3><p>Join our loyalty program and receive email coupons for future orders.</p></div>
          </div>
        </div>
      </section>
      ${loyaltyValueStrip()}
      <section class="section section--cinema">
        <div class="container">
          ${appPromoBlock()}
        </div>
      </section>
      <section class="section section--cinema section--atmosphere section--blush">
        <div class="section__ambient" aria-hidden="true"><span class="ambient-orb ambient-orb--2"></span></div>
        <div class="container split split--framed">
          <div class="split__frame" data-reveal>
            <div class="split__media clip-reveal" data-clip-reveal>
              <img src="data/Egg & Cheese Sandwich.jpg" alt="Order breakfast online" loading="lazy">
            </div>
          </div>
          <div class="split__copy" data-reveal>
            <p class="eyebrow">Explore first</p>
            <h2 class="display-md">Prefer to browse first?</h2>
            <p>View our full visual menu with prices and photos, then order when you're ready.</p>
            <p style="margin-top:1rem"><a href="menu.html" class="btn btn-outline btn-magnetic" data-transition="page"><span class="btn__text">View Menu</span></a></p>
          </div>
        </div>
      </section>
    </div>
  </main>`,
  },
  {
    file: "other.html",
    page: "other",
    title: "Other | Bagel Bazaar Monroe, NJ",
    desc: "Additional information, catering, and support for Bagel Bazaar Monroe.",
    body: `
  <main id="main">
    <div id="page">
      <section class="page-hero page-hero--premium page-hero--compact">
        <div class="container page-hero__inner" data-reveal>
          <p class="eyebrow">More from Bagel Bazaar</p>
          <h1 class="display-lg page-hero__title"><span class="line-mask"><span class="line-inner">Other services and info</span></span></h1>
          <p class="lead page-hero__lead">Catering, account help, privacy, and everything beyond the everyday menu.</p>
        </div>
      </section>
      <section class="section section--cinema section--atmosphere section--blush">
        <div class="section__ambient" aria-hidden="true">
          <span class="ambient-orb ambient-orb--1"></span>
          <span class="ambient-orb ambient-orb--2"></span>
        </div>
        <div class="container">
          <div class="section__head section__head--center" data-reveal>
            <p class="eyebrow">Quick links</p>
            <h2 class="display-md">Everything else you might need</h2>
          </div>
          <div class="section-divider section-divider--animate"></div>
          <div class="link-tiles" data-reveal-stagger>
            <a href="https://www.bagelbazaarmonroe.com/ShowMenu.tpl?vSHOWMENU=6231" class="link-tile" data-reveal-item target="_blank" rel="noopener"><h3>Catering Menu</h3><p>Group breakfasts, platters, and office spreads for any occasion.</p></a>
            <a href="https://www.bagelbazaarmonroe.com/YourAccount.tpl" class="link-tile" data-reveal-item target="_blank" rel="noopener"><h3>Your Account</h3><p>Manage saved addresses, favorites, and order history.</p></a>
            <a href="https://www.bagelbazaarmonroe.com/Help.tpl" class="link-tile" data-reveal-item target="_blank" rel="noopener"><h3>Help and FAQ</h3><p>Ordering support, delivery info, and common questions.</p></a>
            <a href="https://www.bagelbazaarmonroe.com/PrivacyPolicy.tpl" class="link-tile" data-reveal-item target="_blank" rel="noopener"><h3>Privacy Policy</h3><p>How we protect your information when you order online.</p></a>
          </div>
        </div>
      </section>
    </div>
  </main>`,
  },
  {
    file: "app.html",
    page: "app",
    title: "Our App | Bagel Bazaar Monroe, NJ",
    desc: "Download the official Bagel Bazaar app for easy ordering, meal customization, pickup or delivery, and faster reorders.",
    body: `
  <main id="main">
    <div id="page">
      <section class="page-hero page-hero--premium app-hero">
        <div class="container page-hero__inner" data-reveal>
          <p class="eyebrow">Official mobile app</p>
          <h1 class="display-lg page-hero__title">
            <span class="line-mask"><span class="line-inner">Bagel Bazaar</span></span>
            <span class="line-mask"><span class="line-inner">in your pocket</span></span>
          </h1>
          <p class="lead page-hero__lead">Ordering made simple and convenient. Customize meals, choose pickup or delivery, and reorder favorites faster from the official Bagel Bazaar app.</p>
          <div style="margin-top:1.75rem">
            ${appDownloadButtons({ idPrefix: "page-hero" })}
          </div>
        </div>
      </section>
      ${appPageContent()}
    </div>
  </main>`,
  },
  {
    file: "loyalty.html",
    page: "loyalty",
    title: "Loyalty Program | Bagel Bazaar Monroe, NJ",
    desc: "Earn points on every Bagel Bazaar order and receive reward coupons by email.",
    body: `
  <main id="main">
    <div id="page">
      <section class="page-hero page-hero--premium">
        <div class="container page-hero__inner" data-reveal>
          <p class="eyebrow">Loyalty program</p>
          <h1 class="display-lg page-hero__title">
            <span class="line-mask"><span class="line-inner">Order more.</span></span>
            <span class="line-mask"><span class="line-inner">Earn more.</span></span>
          </h1>
          <p class="lead page-hero__lead">Receive points for each order, then get an email coupon for a reward. Our way of saying thanks.</p>
        </div>
      </section>
      <section class="section section--rich section--atmosphere section--cinema">
        <div class="section__ambient" aria-hidden="true"><span class="ambient-orb ambient-orb--1"></span><span class="ambient-orb ambient-orb--3"></span></div>
        <div class="container">
          <div class="section__head section__head--center" data-reveal>
            <p class="eyebrow">How it works</p>
            <h2 class="display-md">Three steps to rewards</h2>
          </div>
          <div class="info-grid" data-reveal-stagger style="margin-top:2rem">
            <div class="rich-card" data-reveal-item data-panel-spotlight><span class="rich-card__spotlight" aria-hidden="true"></span><span class="rich-card__num">1</span><h3>Order online or in the app</h3><p>Place orders on our website or the official Bagel Bazaar app for iPhone and Android.</p></div>
            <div class="rich-card" data-reveal-item data-panel-spotlight><span class="rich-card__spotlight" aria-hidden="true"></span><span class="rich-card__num">2</span><h3>Earn points</h3><p>Every order adds to your loyalty balance automatically.</p></div>
            <div class="rich-card" data-reveal-item data-panel-spotlight><span class="rich-card__spotlight" aria-hidden="true"></span><span class="rich-card__num">3</span><h3>Get rewarded</h3><p>Watch your inbox for email coupons on future visits.</p></div>
          </div>
        </div>
      </section>
      <section class="section section--cinema section--blush section--atmosphere">
        <div class="section__ambient" aria-hidden="true"><span class="ambient-orb ambient-orb--2"></span></div>
        <div class="container">
          ${appPromoBlock("loyalty")}
        </div>
      </section>
      <section class="cta-band cta-band--premium" data-reveal>
        <div class="cta-band__bg" aria-hidden="true"><div class="cta-band__orb"></div></div>
        <div class="container">
          <h2 class="display-md">Start earning today</h2>
          <p style="color:rgba(255,255,255,0.85)">Create an account when you order and loyalty points apply automatically.</p>
          <a href="https://www.bagelbazaarmonroe.com/OrderOnline.tpl" class="btn btn-white btn-magnetic" target="_blank" rel="noopener">Order and Earn Points</a>
        </div>
      </section>
    </div>
  </main>`,
  },
];

for (const p of pages) {
  const html = `${HEAD.replace("<head>", `<head>\n  <meta name="description" content="${p.desc}">\n  <title>${p.title}</title>`)}
<body class="is-loading" data-page="${p.page}">
${header(p.page)}
${p.body}
${footer(p.scripts)}
</body>
</html>
`;
  writeFileSync(join(root, p.file), html, "utf8");
  console.log("Wrote", p.file);
}

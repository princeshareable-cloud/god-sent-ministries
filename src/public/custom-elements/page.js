(function () {
const PAGE_TAG = 'gsm-home-page';
const FONT_LINK_ID = 'gsm-custom-element-fonts';
const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap';
const DEFAULT_BASE_URL = 'https://princeshareable-cloud.github.io/god-sent-ministries/src/public/custom-elements';
const SECTION_DEFS = [
  { tag: 'hero-section', file: 'hero.js' },
  { tag: 'vision-section', file: 'vision.js' },
  { tag: 'about-section', file: 'about.js' },
  { tag: 'ministries-section', file: 'ministries.js' },
  { tag: 'pastors-section', file: 'pastors.js' },
  { tag: 'contact-section', file: 'contact.js' },
  { tag: 'footer-section', file: 'footer.js' }
];

function normalizeBaseUrl(baseUrl) {
  return String(baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, '');
}

function ensureFonts() {
  if (typeof document === 'undefined' || !document.head || document.getElementById(FONT_LINK_ID)) {
    return;
  }

  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

function ensureScripts(baseUrl) {
  const normalized = normalizeBaseUrl(baseUrl);

  SECTION_DEFS.forEach((section) => {
    if (customElements.get(section.tag)) {
      return;
    }

    const scriptUrl = `${normalized}/${section.file}`;
    if (document.querySelector(`script[data-gsm-src="${scriptUrl}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.dataset.gsmSrc = scriptUrl;
    document.head.appendChild(script);
  });

  return waitForDefinitions(SECTION_DEFS.map((section) => section.tag), 12000);
}

function waitForDefinitions(tags, timeoutMs) {
  const pending = tags.filter((tag) => !customElements.get(tag));
  if (!pending.length) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const startedAt = Date.now();

    const tick = () => {
      const unresolved = pending.filter((tag) => !customElements.get(tag));
      if (!unresolved.length) {
        resolve();
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        reject(new Error(`Timed out loading sections: ${unresolved.join(', ')}`));
        return;
      }

      window.setTimeout(tick, 50);
    };

    tick();
  });
}

class GsmHomePage extends HTMLElement {
  static get observedAttributes() {
    return ['base-url'];
  }

  constructor() {
    super();
    this._heightListener = this._notifyHeight.bind(this);
    this._toggleMenuListener = this._toggleMenu.bind(this);
    this._anchorClickListener = this._handleAnchorClicks.bind(this);
    this._lastSentHeight = 0;
    this._resizeObserver = null;
  }

  connectedCallback() {
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.height = 'auto';
    this._renderLoading();
    this._loadSections();
    window.addEventListener('resize', this._heightListener);
    this.addEventListener('click', this._anchorClickListener, true);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._heightListener);
    this.removeEventListener('click', this._anchorClickListener, true);
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'base-url' && oldValue !== newValue && this.isConnected) {
      this._renderLoading();
      this._loadSections();
    }
  }

  async _loadSections() {
    try {
      ensureFonts();
      await ensureScripts(this.getAttribute('base-url'));
      this._renderPage();
      this._wireNavigation();
      this._wireAutoHeight();
      this._attachImageListeners();
      this._notifyHeight();
      window.setTimeout(this._heightListener, 200);
      window.setTimeout(this._heightListener, 900);
      window.setTimeout(this._heightListener, 1600);
    } catch (error) {
      this._renderError(error instanceof Error ? error.message : String(error));
      this._notifyHeight();
    }
  }

  _renderLoading() {
    this.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background: #1a1714;
          color: #f6f1eb;
          font-family: 'DM Sans', Arial, sans-serif;
        }

        .gsm-page-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 260px;
          padding: 32px;
          letter-spacing: 0.08em;
          font-size: 12px;
          text-transform: uppercase;
          color: rgba(246, 241, 235, 0.72);
        }
      </style>
      <div class="gsm-page-loading">Loading page sections...</div>
    `;
  }

  _renderError(message) {
    this.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background: #1a1714;
          color: #f6f1eb;
          font-family: 'DM Sans', Arial, sans-serif;
        }

        .gsm-page-error {
          padding: 32px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(0, 0, 0, 0.22);
          color: #ffd8d8;
          font-size: 14px;
          line-height: 1.6;
        }

        .gsm-page-error strong {
          display: block;
          margin-bottom: 8px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 12px;
          color: #ffb4b4;
        }
      </style>
      <div class="gsm-page-error">
        <strong>Custom Element Load Error</strong>
        <div>${String(message).replace(/[<>&]/g, '')}</div>
      </div>
    `;
  }

  _renderPage() {
    this.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background: #1a1714;
          color: #f6f1eb;
          font-family: 'DM Sans', Arial, sans-serif;
        }

        .gsm-site-header,
        .gsm-site-header * {
          box-sizing: border-box;
        }

        .gsm-site-header {
          position: sticky;
          top: 0;
          z-index: 99;
          width: 100%;
          border-bottom: 1px solid rgba(246, 241, 235, 0.08);
          background: rgba(26, 23, 20, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .gsm-site-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 14px 24px;
        }

        .gsm-brand {
          color: #f6f1eb;
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          font-size: 30px;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          white-space: nowrap;
        }

        .gsm-brand span {
          color: #d4a05a;
        }

        .gsm-nav-toggle {
          display: none;
          border: 1px solid rgba(246, 241, 235, 0.2);
          background: transparent;
          color: rgba(246, 241, 235, 0.9);
          font-family: 'DM Sans', Arial, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 10px 14px;
          cursor: pointer;
        }

        .gsm-nav {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .gsm-nav a {
          color: rgba(246, 241, 235, 0.8);
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          transition: color 0.25s ease;
        }

        .gsm-nav a:hover {
          color: #d4a05a;
        }

        .gsm-nav .gsm-nav-cta {
          padding: 11px 18px;
          background: #b47b3a;
          color: #fff;
        }

        .gsm-nav .gsm-nav-cta:hover {
          color: #fff;
          background: #8a5d2a;
        }

        .gsm-page-stack {
          display: block;
          width: 100%;
          margin: 0;
          padding: 0;
          background: #1a1714;
        }

        .gsm-page-stack [id] {
          scroll-margin-top: 90px;
        }

        .gsm-page-stack > hero-section,
        .gsm-page-stack > vision-section,
        .gsm-page-stack > about-section,
        .gsm-page-stack > ministries-section,
        .gsm-page-stack > pastors-section,
        .gsm-page-stack > contact-section,
        .gsm-page-stack > footer-section {
          display: block;
          width: 100%;
          height: auto !important;
          margin: 0 !important;
          padding: 0;
          line-height: normal;
        }

        @media (max-width: 980px) {
          .gsm-site-header-inner {
            padding: 12px 16px;
          }

          .gsm-brand {
            font-size: 26px;
          }

          .gsm-nav-toggle {
            display: inline-block;
          }

          .gsm-nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            display: none;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            border-bottom: 1px solid rgba(246, 241, 235, 0.08);
            background: rgba(26, 23, 20, 0.97);
          }

          .gsm-nav.is-open {
            display: flex;
          }

          .gsm-nav a {
            display: block;
            padding: 14px 16px;
            border-top: 1px solid rgba(246, 241, 235, 0.08);
            text-align: left;
          }

          .gsm-nav .gsm-nav-cta {
            margin: 12px 16px 16px;
            text-align: center;
          }
        }
      </style>
      <header class="gsm-site-header">
        <div class="gsm-site-header-inner">
          <a class="gsm-brand" href="#home">God <span>Sent</span> Ministries</a>
          <button class="gsm-nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">Menu</button>
          <nav class="gsm-nav" aria-label="Primary">
            <a href="#home">Home</a>
            <a href="#vision">Vision</a>
            <a href="#about">About</a>
            <a href="#ministries">Ministries</a>
            <a href="#leadership">Leadership</a>
            <a href="#contact">Contact</a>
            <a href="#contact" class="gsm-nav-cta">Plan A Visit</a>
          </nav>
        </div>
      </header>
      <main class="gsm-page-stack">
        <hero-section></hero-section>
        <vision-section></vision-section>
        <about-section></about-section>
        <ministries-section></ministries-section>
        <pastors-section></pastors-section>
        <contact-section></contact-section>
        <footer-section></footer-section>
      </main>
    `;
  }

  _wireNavigation() {
    const toggle = this.querySelector('.gsm-nav-toggle');

    if (toggle) {
      toggle.addEventListener('click', this._toggleMenuListener);
    }
  }

  _handleAnchorClicks(event) {
    const path = event.composedPath ? event.composedPath() : [];
    const anchor = path.find((node) => node && node.tagName && String(node.tagName).toLowerCase() === 'a');
    if (!anchor || typeof anchor.getAttribute !== 'function') {
      return;
    }

    const href = anchor.getAttribute('href');
    if (!href || href.charAt(0) !== '#') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const target = this._findHashTarget(href);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const nav = this.querySelector('.gsm-nav');
    const toggle = this.querySelector('.gsm-nav-toggle');
    if (nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
    }

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  _findHashTarget(hash) {
    if (!hash || hash.length < 2) {
      return null;
    }

    let target = null;
    try {
      target = this.querySelector(hash);
    } catch (error) {
      return null;
    }

    if (!target && hash === '#home') {
      target = this.querySelector('.gsm-page-stack') || this;
    }

    return target;
  }

  _wireAutoHeight() {
    const stack = this.querySelector('.gsm-page-stack');
    if (!stack) {
      return;
    }

    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }

    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => {
        this._notifyHeight();
      });
      this._resizeObserver.observe(stack);
    }

    // Safety interval for late font/image/layout shifts.
    window.setTimeout(this._heightListener, 250);
    window.setTimeout(this._heightListener, 700);
    window.setTimeout(this._heightListener, 1300);
    window.setTimeout(this._heightListener, 2200);
  }

  _toggleMenu() {
    const nav = this.querySelector('.gsm-nav');
    const toggle = this.querySelector('.gsm-nav-toggle');
    if (!nav || !toggle) {
      return;
    }

    nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('is-open') ? 'true' : 'false');
    this._notifyHeight();
  }

  _attachImageListeners() {
    this.querySelectorAll('img').forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', this._heightListener, { once: true });
        img.addEventListener('error', this._heightListener, { once: true });
      }
    });
  }

  _notifyHeight() {
    if (typeof window === 'undefined') {
      return;
    }

    const stack = this.querySelector('.gsm-page-stack');
    const height = Math.ceil((stack && stack.scrollHeight) || this.scrollHeight || 0);
    if (!height) {
      return;
    }

    if (height === this._lastSentHeight) {
      return;
    }

    this._lastSentHeight = height;

    // Wix CustomElement API listens via $w('#customElement').on('eventName', ...)
    this.dispatchEvent(
      new CustomEvent('gsmHeight', {
        detail: { height }
      })
    );
  }
}

if (!customElements.get(PAGE_TAG)) {
  customElements.define(PAGE_TAG, GsmHomePage);
}
})();

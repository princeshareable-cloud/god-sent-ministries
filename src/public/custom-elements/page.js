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
  }

  connectedCallback() {
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.height = 'auto';
    this._renderLoading();
    this._loadSections();
    window.addEventListener('resize', this._heightListener);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._heightListener);
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
      this._attachImageListeners();
      this._notifyHeight();
      window.setTimeout(this._heightListener, 200);
      window.setTimeout(this._heightListener, 900);
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

        .gsm-page-stack {
          display: block;
          width: 100%;
          margin: 0;
          padding: 0;
          background: #1a1714;
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
      </style>
      <main class="gsm-page-stack" id="home">
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

    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          type: 'gsm-home-page-height',
          height
        },
        '*'
      );
    }
  }
}

if (!customElements.get(PAGE_TAG)) {
  customElements.define(PAGE_TAG, GsmHomePage);
}
})();

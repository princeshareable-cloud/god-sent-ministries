(function () {
const FOOTER_TAG = 'footer-section';
const FOOTER_FONT_LINK_ID = 'gsm-custom-element-fonts';
const FOOTER_FONT_HREF = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap';

function ensureFonts() {
  if (typeof document === 'undefined' || !document.head || document.getElementById(FOOTER_FONT_LINK_ID)) {
    return;
  }

  const link = document.createElement('link');
  link.id = FOOTER_FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FOOTER_FONT_HREF;
  document.head.appendChild(link);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

class FooterSection extends HTMLElement {
  static get observedAttributes() {
    return ['brand-text', 'copy-text'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }

  render() {
    ensureFonts();
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.height = '100%';

    const brand = escapeHtml(this.getAttribute('brand-text') || 'God Sent Ministries');
    const copy = this.getAttribute('copy-text') || '&#169; 2026 God Sent Ministries. All rights reserved. Crystal Lake, Illinois.';

    this.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          --gsm-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          --gsm-sans: 'DM Sans', Arial, sans-serif;
        }

        .gsm-footer,
        .gsm-footer * {
          box-sizing: border-box;
        }

        .gsm-footer {
          width: 100%;
          padding: 48px 24px;
          background: #0f0d0b;
          text-align: center;
          font-family: var(--gsm-sans);
        }

        .gsm-footer-brand {
          margin-bottom: 13px;
          color: rgba(246, 241, 235, 0.4);
          font-family: var(--gsm-serif);
          font-size: 16px;
        }

        .gsm-footer-copy {
          margin: 0;
          color: rgba(246, 241, 235, 0.25);
          font-size: 13px;
          letter-spacing: 0.05em;
        }
      </style>
      <footer class="gsm-footer" id="footer">
        <div class="gsm-footer-brand">${brand}</div>
        <p class="gsm-footer-copy">${copy}</p>
      </footer>
    `;
  }
}

if (!customElements.get(FOOTER_TAG)) {
  customElements.define(FOOTER_TAG, FooterSection);
}
})();

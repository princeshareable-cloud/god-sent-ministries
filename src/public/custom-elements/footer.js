class FooterSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['brand-text', 'copy-text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('brand-text')) this.setAttribute('brand-text', 'God Sent Ministries');
    if (!this.hasAttribute('copy-text')) this.setAttribute('copy-text', '\u00A9 2025 God Sent Ministries. All rights reserved. Crystal Lake, Illinois.');
    this.render();
  }

  render() {
    const brand = this.getAttribute('brand-text');
    const copy = this.getAttribute('copy-text');

    this.shadowRoot.innerHTML = '';

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap';
    this.shadowRoot.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        --serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
        --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      * { margin: 0; padding: 0; box-sizing: border-box; }

      footer {
        padding: 3rem 2rem;
        background: #0f0d0b;
        text-align: center;
        font-family: var(--sans);
        width: 100%;
        min-height: 100%;
      }

      .footer-brand {
        font-family: var(--serif);
        font-size: 1rem;
        color: rgba(246, 241, 235, 0.4);
        margin-bottom: 0.8rem;
      }

      p {
        font-size: 0.8rem;
        color: rgba(246, 241, 235, 0.25);
        letter-spacing: 0.05em;
      }
    `;
    this.shadowRoot.appendChild(style);

    const footer = document.createElement('footer');
    footer.innerHTML = `
      <div class="footer-brand">${brand}</div>
      <p>${copy}</p>
    `;
    this.shadowRoot.appendChild(footer);
  }
}

customElements.define('footer-section', FooterSection);

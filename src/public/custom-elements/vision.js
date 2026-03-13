class VisionSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['quote-text', 'label-text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('quote-text')) this.setAttribute('quote-text', '\u201cTo <strong>rescue</strong>, <strong>recover</strong> &amp; <strong>restore</strong> people to God who have never experienced the presence and power of God.\u201d');
    if (!this.hasAttribute('label-text')) this.setAttribute('label-text', 'Our Vision');
    this.render();
  }

  render() {
    const quote = this.getAttribute('quote-text');
    const label = this.getAttribute('label-text');

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
        --ivory: #f6f1eb;
        --warm-gray: #9a9189;
        --deep: #1a1714;
        --copper: #b47b3a;
        --copper-light: #d4a05a;
        --serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
        --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      * { margin: 0; padding: 0; box-sizing: border-box; }

      .vision {
        padding: 5rem 2rem;
        background: var(--deep);
        text-align: center;
        position: relative;
        width: 100%;
        min-height: 100%;
      }

      .vision-quote {
        font-family: var(--serif);
        font-size: clamp(1.6rem, 3vw, 2.8rem);
        font-weight: 300;
        font-style: italic;
        color: var(--ivory);
        line-height: 1.5;
        max-width: 900px;
        margin: 0 auto 3rem;
      }

      .vision-quote strong {
        font-weight: 500;
        font-style: normal;
        color: var(--copper-light);
      }

      .vision-label {
        font-family: var(--sans);
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.4em;
        text-transform: uppercase;
        color: var(--warm-gray);
      }

      .vision-divider {
        width: 1px;
        height: 60px;
        background: linear-gradient(180deg, var(--copper), transparent);
        margin: 0 auto 3rem;
      }
    `;
    this.shadowRoot.appendChild(style);

    const section = document.createElement('section');
    section.className = 'vision';
    section.innerHTML = `
      <div class="vision-divider"></div>
      <p class="vision-quote">${quote}</p>
      <div class="vision-label">${label}</div>
    `;
    this.shadowRoot.appendChild(section);
  }
}

customElements.define('vision-section', VisionSection);

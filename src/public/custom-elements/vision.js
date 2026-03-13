class VisionSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['quote-text', 'quote-strong-1', 'quote-strong-2', 'quote-strong-3', 'label-text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('quote-text')) this.setAttribute('quote-text', '&ldquo;To <strong>rescue</strong>, <strong>recover</strong> &amp; <strong>restore</strong> people to God who have never experienced the presence and power of God.&rdquo;');
    if (!this.hasAttribute('label-text')) this.setAttribute('label-text', 'Our Vision');
    
    this.render();
    this.initObserver();
  }

  initObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    setTimeout(() => {
      const reveals = this.shadowRoot.querySelectorAll('.reveal');
      reveals.forEach(el => observer.observe(el));
    }, 100);
  }

  render() {
    const quote = this.getAttribute('quote-text');
    const label = this.getAttribute('label-text');

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        :host {
          display: block;
          width: 100%;
          --ivory: #f6f1eb;
          --warm-gray: #9a9189;
          --deep: #1a1714;
          --copper: #b47b3a;
          --copper-light: #d4a05a;
          --serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .vision {
          padding: 8rem 2rem;
          background: var(--deep);
          text-align: center;
          position: relative;
        }

        .vision-quote {
          font-family: var(--serif);
          font-size: clamp(1.8rem, 3.5vw, 3rem);
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

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-d1 { transition-delay: 0.1s; }
      </style>

      <section class="vision">
        <div class="vision-divider"></div>
        <p class="vision-quote reveal">${quote}</p>
        <div class="vision-label reveal reveal-d1">${label}</div>
      </section>
    `;
  }
}

customElements.define('vision-section', VisionSection);

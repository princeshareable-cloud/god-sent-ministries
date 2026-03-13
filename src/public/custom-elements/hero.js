class HeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [
      'eyebrow-text',
      'title-text',
      'title-em-text',
      'subtitle-text',
      'primary-btn-text',
      'primary-btn-link',
      'secondary-btn-text',
      'secondary-btn-link',
      'background-image'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('eyebrow-text')) this.setAttribute('eyebrow-text', 'Crystal Lake, Illinois');
    if (!this.hasAttribute('title-text')) this.setAttribute('title-text', 'God Sent');
    if (!this.hasAttribute('title-em-text')) this.setAttribute('title-em-text', 'Ministries');
    if (!this.hasAttribute('subtitle-text')) this.setAttribute('subtitle-text', 'To rescue, recover, & restore people to God who have never experienced the presence and power of God.');
    if (!this.hasAttribute('primary-btn-text')) this.setAttribute('primary-btn-text', 'Join Us Sunday');
    if (!this.hasAttribute('primary-btn-link')) this.setAttribute('primary-btn-link', '#contact');
    if (!this.hasAttribute('secondary-btn-text')) this.setAttribute('secondary-btn-text', 'Our Story');
    if (!this.hasAttribute('secondary-btn-link')) this.setAttribute('secondary-btn-link', '#about');
    if (!this.hasAttribute('background-image')) this.setAttribute('background-image', 'https://princeshareable-cloud.github.io/god-sent-ministries/src/public/congregation.jpeg');
    
    this.render();
  }

  render() {
    const eyebrow = this.getAttribute('eyebrow-text');
    const title = this.getAttribute('title-text');
    const titleEm = this.getAttribute('title-em-text');
    const subtitle = this.getAttribute('subtitle-text');
    const primaryBtnText = this.getAttribute('primary-btn-text');
    const primaryBtnLink = this.getAttribute('primary-btn-link');
    const secondaryBtnText = this.getAttribute('secondary-btn-text');
    const secondaryBtnLink = this.getAttribute('secondary-btn-link');
    const bg = this.getAttribute('background-image');

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        :host {
          display: block;
          width: 100%;
          --ivory: #f6f1eb;
          --copper: #b47b3a;
          --copper-light: #d4a05a;
          --copper-dark: #8a5d2a;
          --serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hero {
          height: 100vh;
          min-height: 700px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: var(--sans);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: url('${bg}') center 30%/cover no-repeat;
          filter: brightness(0.35) contrast(1.1) saturate(0.8) sepia(0.15);
          transform: scale(1.08);
          animation: heroZoom 30s ease-in-out infinite alternate;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(26, 23, 20, 0.4) 0%, rgba(26, 23, 20, 0.2) 40%, rgba(26, 23, 20, 0.85) 100%);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 850px;
          padding: 2rem;
        }

        .hero-eyebrow {
          font-family: var(--sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--copper-light);
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeUp 0.8s 0.3s both;
        }

        h1 {
          font-family: var(--serif);
          font-size: clamp(3.2rem, 7vw, 6.5rem);
          font-weight: 300;
          color: var(--ivory);
          line-height: 1.05;
          margin-bottom: 2rem;
          letter-spacing: -0.01em;
          opacity: 0;
          animation: fadeUp 1s 0.5s both;
        }

        h1 em {
          font-style: italic;
          font-weight: 400;
          color: var(--copper-light);
        }

        .hero-body {
          font-family: var(--sans);
          font-size: 1.15rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(246, 241, 235, 0.75);
          max-width: 580px;
          margin: 0 auto 3rem;
          opacity: 0;
          animation: fadeUp 1s 0.8s both;
        }

        .hero-buttons {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 1s 1.1s both;
        }

        a {
            text-decoration: none;
        }

        .btn {
          font-family: var(--sans);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 1rem 2.8rem;
          cursor: pointer;
          border: none;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-primary {
          background: var(--copper);
          color: #fff;
        }

        .btn-primary:hover {
          background: var(--copper-dark);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(180, 123, 58, 0.3);
        }

        .btn-outline {
          background: transparent;
          color: var(--ivory);
          border: 1.5px solid rgba(246, 241, 235, 0.35);
        }

        .btn-outline:hover {
          border-color: var(--copper-light);
          color: var(--copper-light);
        }

        .hero-scroll {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          opacity: 0;
          animation: fadeIn 1s 2s both;
        }

        .hero-scroll span {
          font-family: var(--sans);
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(246, 241, 235, 0.4);
          writing-mode: vertical-rl;
        }

        .hero-scroll::after {
          content: '';
          display: block;
          width: 1px;
          height: 40px;
          margin-top: 0.8rem;
          margin-left: 50%;
          background: linear-gradient(180deg, var(--copper-light), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes heroZoom { to { transform: scale(1.18); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(35px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scrollPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
      </style>

      <section class="hero" id="home">
        <div class="hero-bg"></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-eyebrow">${eyebrow}</div>
          <h1>${title}<br><em>${titleEm}</em></h1>
          <p class="hero-body">${subtitle}</p>
          <div class="hero-buttons">
            <a href="${primaryBtnLink}" class="btn btn-primary">${primaryBtnText}</a>
            <a href="${secondaryBtnLink}" class="btn btn-outline">${secondaryBtnText}</a>
          </div>
        </div>
        <div class="hero-scroll"><span>Scroll</span></div>
      </section>
    `;
  }
}

customElements.define('hero-section', HeroSection);

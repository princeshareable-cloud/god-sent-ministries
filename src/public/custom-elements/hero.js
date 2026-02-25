class HeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title-text', 'subtitle-text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    if (!this.hasAttribute('title-text')) {
      this.setAttribute('title-text', 'GOD SENT MINISTRIES');
    }
    if (!this.hasAttribute('subtitle-text')) {
      this.setAttribute('subtitle-text', 'To rescue, recover, & restore people to God who have never experienced the presence and power of God.');
    }
    this.render();
  }

  render() {
    const titleText = this.getAttribute('title-text');
    const subtitleText = this.getAttribute('subtitle-text');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #0f1011; /* Premium Dark Editorial */
          color: #ffffff;
        }

        .hero-container {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
        }

        /* Subtle glowing orb in background */
        .hero-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(100, 110, 130, 0.15) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          max-width: 900px;
          animation: fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        h1 {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 0 0 1.5rem 0;
          line-height: 1.1;
          background: linear-gradient(180deg, #ffffff 0%, #b0b5bd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        p {
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 400;
          line-height: 1.6;
          color: #a0a6b0;
          max-width: 600px;
          margin: 0 auto 3rem auto;
          letter-spacing: 0.02em;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.6;
          animation: pulse 2s infinite;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, #ffffff);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; }
        }
      </style>
      
      <div class="hero-container">
        <div class="content-wrapper">
          <h1>${titleText}</h1>
          <p>${subtitleText}</p>
        </div>
        <div class="scroll-indicator">
          <span>SCROLL</span>
          <div class="scroll-line"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('hero-section', HeroSection);

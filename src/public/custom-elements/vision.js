class VisionSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['vision-title', 'vision-text', 'mission-title', 'mission-text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('vision-title')) this.setAttribute('vision-title', 'Our Vision');
    if (!this.hasAttribute('vision-text')) this.setAttribute('vision-text', 'To rescue, recover & restore people to God who have never experienced the presence and power of God.');
    if (!this.hasAttribute('mission-title')) this.setAttribute('mission-title', 'Our Mission');
    if (!this.hasAttribute('mission-text')) this.setAttribute('mission-text', 'Reaching the Lost, Making Disciples.');
    this.render();
    this._observeScroll();
  }

  _observeScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.2 });
    this.shadowRoot.querySelectorAll('.animate').forEach(el => observer.observe(el));
  }

  render() {
    const getAttr = (n) => this.getAttribute(n) || '';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Raleway:wght@300;400;500;600&display=swap');

        :host { display: block; width: 100%; }

        .section {
          padding: 8rem 2rem;
          background: linear-gradient(135deg, #0d0020 0%, #1a0530 50%, #0d0020 100%);
          position: relative;
          overflow: hidden;
        }

        /* Radial gold glow behind the text */
        .section::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          position: relative;
          z-index: 2;
        }

        /* Vertical divider that glows */
        .container::after {
          content: '';
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 80%;
          background: linear-gradient(180deg, transparent, rgba(212, 175, 55, 0.4), transparent);
        }

        .block { padding: 2rem; }

        .icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid rgba(212, 175, 55, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          font-size: 1.3rem;
        }

        .label {
          font-family: 'Raleway', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 1.5rem;
        }

        h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
          margin: 0 0 1.5rem;
        }

        p {
          font-family: 'Raleway', sans-serif;
          font-size: 1.15rem;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .highlight {
          color: #d4af37;
          font-weight: 500;
        }

        .animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate.visible { opacity: 1; transform: translateY(0); }
        .animate:nth-child(2) { transition-delay: 0.2s; }

        @media (max-width: 900px) {
          .container { grid-template-columns: 1fr; gap: 3rem; }
          .container::after { display: none; }
          .section { padding: 5rem 1.5rem; }
        }
      </style>

      <div class="section">
        <div class="container">
          <div class="block animate">
            <div class="icon">👁</div>
            <div class="label">Vision</div>
            <h3>${getAttr('vision-title')}</h3>
            <p>${getAttr('vision-text').replace('rescue', '<span class="highlight">rescue</span>').replace('recover', '<span class="highlight">recover</span>').replace('restore', '<span class="highlight">restore</span>')}</p>
          </div>
          <div class="block animate">
            <div class="icon">✝</div>
            <div class="label">Mission</div>
            <h3>${getAttr('mission-title')}</h3>
            <p>${getAttr('mission-text').replace('Lost', '<span class="highlight">Lost</span>').replace('Disciples', '<span class="highlight">Disciples</span>')}</p>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('vision-section', VisionSection);

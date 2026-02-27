class AboutSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['heading-text', 'body-text', 'image-url'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('heading-text')) this.setAttribute('heading-text', 'About Us');
    if (!this.hasAttribute('body-text')) this.setAttribute('body-text', 'God Sent is a Christian Ministries and church located in Crystal Lake, Illinois-USA. This church started in 2022 as a prayer altar online, on a WhatsApp platform and later on Zoom platform as the need for live streaming was needed by our communities living in different spheres of the world. God later opened doors for us to establish a physical church in Crystal Lake, Illinois. Our desire is to see people saved, healed, delivered and restored back to God.');
    if (!this.hasAttribute('image-url')) this.setAttribute('image-url', '../community.jpeg');
    this.render();
    this._observeScroll();
  }

  _observeScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    this.shadowRoot.querySelectorAll('.animate').forEach(el => observer.observe(el));
  }

  render() {
    const heading = this.getAttribute('heading-text');
    const body = this.getAttribute('body-text');
    const img = this.getAttribute('image-url');

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Raleway:wght@300;400;500;600&display=swap');

        :host { display: block; width: 100%; }

        .section {
          padding: 8rem 2rem;
          background: linear-gradient(180deg, #0a0015 0%, #110022 50%, #0a0015 100%);
          position: relative;
          overflow: hidden;
        }

        .section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 80px;
          background: linear-gradient(180deg, #d4af37, transparent);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .img-col {
          position: relative;
        }

        .img-frame {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(100, 50, 180, 0.3), 0 0 0 1px rgba(212, 175, 55, 0.2);
        }

        .img-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, transparent 60%);
          pointer-events: none;
        }

        img {
          display: block;
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .img-frame:hover img { transform: scale(1.05); }

        /* Decorative floating accent */
        .accent-box {
          position: absolute;
          bottom: -20px;
          right: -20px;
          width: 120px;
          height: 120px;
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 8px;
          z-index: -1;
        }

        .text-col { padding: 1rem 0; }

        .label {
          font-family: 'Raleway', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 1rem;
          display: block;
        }

        h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 2rem;
          line-height: 1.15;
        }

        .gold-line {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #d4af37, #8b5cf6);
          margin-bottom: 2rem;
          border-radius: 3px;
        }

        p {
          font-family: 'Raleway', sans-serif;
          font-size: 1.1rem;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .animate {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .animate:nth-child(2) { transition-delay: 0.15s; }

        @media (max-width: 900px) {
          .container { grid-template-columns: 1fr; gap: 3rem; }
          .section { padding: 5rem 1.5rem; }
          .accent-box { display: none; }
        }
      </style>

      <div class="section">
        <div class="container">
          <div class="img-col animate">
            <div class="img-frame">
              <img src="${img}" alt="God Sent Ministries Community">
            </div>
            <div class="accent-box"></div>
          </div>
          <div class="text-col animate">
            <span class="label">Who We Are</span>
            <h2>${heading}</h2>
            <div class="gold-line"></div>
            <p>${body}</p>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('about-section', AboutSection);

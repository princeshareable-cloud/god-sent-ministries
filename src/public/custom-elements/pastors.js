class PastorsSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['heading', 'pastor1-name', 'pastor1-title', 'pastor1-bio', 'pastor1-img', 'pastor2-name', 'pastor2-title', 'pastor2-bio', 'pastor2-img'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('heading')) this.setAttribute('heading', 'Our Leadership');
    if (!this.hasAttribute('pastor1-name')) this.setAttribute('pastor1-name', 'Apostle David Mugerwa');
    if (!this.hasAttribute('pastor1-title')) this.setAttribute('pastor1-title', 'Senior Pastor & Founder');
    if (!this.hasAttribute('pastor1-bio')) this.setAttribute('pastor1-bio', 'Apostle David holds a Bachelors degree in Christian Ministry and a Masters degree in Evangelism & Leadership from Wheaton College MA. He is passionate about Church planting, evangelism, and transforming lives through the power of the Gospel.');
    if (!this.hasAttribute('pastor1-img')) this.setAttribute('pastor1-img', '../pastor-david.jpeg');
    if (!this.hasAttribute('pastor2-name')) this.setAttribute('pastor2-name', 'Pastor Debbie Mugerwa');
    if (!this.hasAttribute('pastor2-title')) this.setAttribute('pastor2-title', 'Co-Pastor');
    if (!this.hasAttribute('pastor2-bio')) this.setAttribute('pastor2-bio', 'Pastor Debbie holds a diploma in Early Childhood Development from Concordia University. Her passion is rooted in teaching the word of God, leading children ministries, and counseling women through challenging seasons of life.');
    if (!this.hasAttribute('pastor2-img')) this.setAttribute('pastor2-img', '../pastors-couple.jpeg');
    this.render();
    this._observeScroll();
  }

  _observeScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    this.shadowRoot.querySelectorAll('.animate').forEach(el => observer.observe(el));
  }

  render() {
    const g = (n) => this.getAttribute(n) || '';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Raleway:wght@300;400;500;600&display=swap');

        :host { display: block; width: 100%; }

        .section {
          padding: 8rem 2rem;
          background: linear-gradient(180deg, #05000d 0%, #110022 50%, #0a0015 100%);
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

        .container { max-width: 1200px; margin: 0 auto; }

        .header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .label {
          font-family: 'Raleway', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 1rem;
        }

        h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .pastors-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .pastor-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(25, 10, 50, 0.6), rgba(15, 5, 30, 0.8));
          border: 1px solid rgba(138, 43, 226, 0.2);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pastor-card:hover {
          border-color: rgba(212, 175, 55, 0.4);
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(100, 50, 180, 0.3);
        }

        .img-wrapper {
          width: 100%;
          aspect-ratio: 4/5;
          overflow: hidden;
          position: relative;
        }

        .img-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(10, 0, 21, 0.95) 0%, rgba(10, 0, 21, 0.3) 50%, transparent 100%);
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pastor-card:hover img { transform: scale(1.05); }

        .info {
          padding: 2.5rem;
          position: relative;
          margin-top: -4rem;
          z-index: 2;
        }

        .pastor-title {
          font-family: 'Raleway', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 0.5rem;
        }

        h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 1rem;
        }

        p {
          font-family: 'Raleway', sans-serif;
          font-size: 0.95rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .animate {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate.visible { opacity: 1; transform: translateY(0); }
        .animate:nth-child(2) { transition-delay: 0.2s; }

        @media (max-width: 900px) {
          .pastors-grid { grid-template-columns: 1fr; }
          .section { padding: 5rem 1.5rem; }
        }
      </style>

      <div class="section">
        <div class="container">
          <div class="header">
            <div class="label">Shepherds of the Flock</div>
            <h2>${g('heading')}</h2>
          </div>
          <div class="pastors-grid">
            <div class="pastor-card animate">
              <div class="img-wrapper">
                <img src="${g('pastor1-img')}" alt="${g('pastor1-name')}">
              </div>
              <div class="info">
                <div class="pastor-title">${g('pastor1-title')}</div>
                <h3>${g('pastor1-name')}</h3>
                <p>${g('pastor1-bio')}</p>
              </div>
            </div>
            <div class="pastor-card animate">
              <div class="img-wrapper">
                <img src="${g('pastor2-img')}" alt="${g('pastor2-name')}">
              </div>
              <div class="info">
                <div class="pastor-title">${g('pastor2-title')}</div>
                <h3>${g('pastor2-name')}</h3>
                <p>${g('pastor2-bio')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('pastors-section', PastorsSection);

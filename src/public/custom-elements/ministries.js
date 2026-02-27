class MinistriesSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['heading', 'ministry-1-title', 'ministry-1-desc', 'ministry-2-title', 'ministry-2-desc', 'ministry-3-title', 'ministry-3-desc', 'ministry-4-title', 'ministry-4-desc'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('heading')) this.setAttribute('heading', 'Our Ministries');
    if (!this.hasAttribute('ministry-1-title')) this.setAttribute('ministry-1-title', 'Church Ministry');
    if (!this.hasAttribute('ministry-1-desc')) this.setAttribute('ministry-1-desc', 'Helping members learn more about God, worship meaningfully, and grow closer to God through spiritual growth and discipleship.');
    if (!this.hasAttribute('ministry-2-title')) this.setAttribute('ministry-2-title', 'Evangelism Outreach');
    if (!this.hasAttribute('ministry-2-desc')) this.setAttribute('ministry-2-desc', 'Sharing the message and teachings of Jesus Christ with the intention of bringing people to Him.');
    if (!this.hasAttribute('ministry-3-title')) this.setAttribute('ministry-3-title', 'Hospital Ministry');
    if (!this.hasAttribute('ministry-3-desc')) this.setAttribute('ministry-3-desc', 'Providing support and services to people who are hospitalized, in nursing homes, or homebound.');
    if (!this.hasAttribute('ministry-4-title')) this.setAttribute('ministry-4-title', 'Prisons & Orphanages');
    if (!this.hasAttribute('ministry-4-desc')) this.setAttribute('ministry-4-desc', 'Serving incarcerated people and their families, and helping children in need.');
    this.render();
    this._observeScroll();
  }

  _observeScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    this.shadowRoot.querySelectorAll('.card').forEach(el => observer.observe(el));
  }

  render() {
    const g = (n) => this.getAttribute(n) || '';
    const icons = ['⛪', '📖', '🏥', '🤝'];

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Raleway:wght@300;400;500;600&display=swap');

        :host { display: block; width: 100%; }

        .section {
          padding: 8rem 2rem;
          background: linear-gradient(180deg, #0a0015 0%, #05000d 100%);
          position: relative;
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

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .card {
          position: relative;
          padding: 3rem;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(25, 10, 50, 0.8), rgba(15, 5, 30, 0.9));
          border: 1px solid rgba(138, 43, 226, 0.2);
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          opacity: 0;
          transform: translateY(40px);
        }

        .card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .card:nth-child(2).visible { transition-delay: 0.1s; }
        .card:nth-child(3).visible { transition-delay: 0.2s; }
        .card:nth-child(4).visible { transition-delay: 0.3s; }

        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s;
        }

        .card:hover {
          border-color: rgba(212, 175, 55, 0.4);
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(100, 50, 180, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.15);
        }

        .card:hover::before { opacity: 1; }

        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          display: block;
        }

        .card-num {
          font-family: 'Raleway', sans-serif;
          position: absolute;
          top: 2rem;
          right: 2rem;
          font-size: 4rem;
          font-weight: 700;
          color: rgba(138, 43, 226, 0.1);
          line-height: 1;
        }

        h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 1rem;
          position: relative;
          z-index: 1;
        }

        p {
          font-family: 'Raleway', sans-serif;
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          position: relative;
          z-index: 1;
          transition: color 0.4s;
        }

        .card:hover p { color: rgba(255, 255, 255, 0.85); }

        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr; }
          .card { padding: 2.5rem; }
          .section { padding: 5rem 1.5rem; }
        }
      </style>

      <div class="section">
        <div class="container">
          <div class="header">
            <div class="label">What We Do</div>
            <h2>${g('heading')}</h2>
          </div>
          <div class="grid">
            ${[1, 2, 3, 4].map(i => `
              <div class="card">
                <span class="card-num">0${i}</span>
                <span class="card-icon">${icons[i - 1]}</span>
                <h3>${g('ministry-' + i + '-title')}</h3>
                <p>${g('ministry-' + i + '-desc')}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('ministries-section', MinistriesSection);

class ContactSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [
      'eyebrow-text', 'title-text',
      'loc-title', 'loc-1', 'loc-2',
      'email-title', 'email-val',
      'st-title',
      'd1', 't1', 'd2', 't2', 'd3', 't3', 'd4', 't4'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('eyebrow-text')) this.setAttribute('eyebrow-text', 'Get In Touch');
    if (!this.hasAttribute('title-text')) this.setAttribute('title-text', 'Come worship<br>with us.');
    
    if (!this.hasAttribute('loc-title')) this.setAttribute('loc-title', 'Location');
    if (!this.hasAttribute('loc-1')) this.setAttribute('loc-1', 'Crystal Lake, Illinois-USA');
    if (!this.hasAttribute('loc-2')) this.setAttribute('loc-2', 'Online Campus via Zoom & WhatsApp');

    if (!this.hasAttribute('email-title')) this.setAttribute('email-title', 'Email');
    if (!this.hasAttribute('email-val')) this.setAttribute('email-val', 'contact@godsentministries.org');

    if (!this.hasAttribute('st-title')) this.setAttribute('st-title', 'Service Times');
    if (!this.hasAttribute('d1')) this.setAttribute('d1', 'Sunday Worship');
    if (!this.hasAttribute('t1')) this.setAttribute('t1', '10:00 AM');
    if (!this.hasAttribute('d2')) this.setAttribute('d2', 'Wednesday Bible Study');
    if (!this.hasAttribute('t2')) this.setAttribute('t2', '7:00 PM');
    if (!this.hasAttribute('d3')) this.setAttribute('d3', 'Friday Prayer Night');
    if (!this.hasAttribute('t3')) this.setAttribute('t3', '8:00 PM');
    if (!this.hasAttribute('d4')) this.setAttribute('d4', 'Online (Zoom)');
    if (!this.hasAttribute('t4')) this.setAttribute('t4', 'Ongoing');

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
    const eyebrow = this.getAttribute('eyebrow-text');
    const title = this.getAttribute('title-text');
    
    const locTitle = this.getAttribute('loc-title');
    const loc1 = this.getAttribute('loc-1');
    const loc2 = this.getAttribute('loc-2');
    
    const emailTitle = this.getAttribute('email-title');
    const emailVal = this.getAttribute('email-val');

    const stTitle = this.getAttribute('st-title');
    const d1 = this.getAttribute('d1'); const t1 = this.getAttribute('t1');
    const d2 = this.getAttribute('d2'); const t2 = this.getAttribute('t2');
    const d3 = this.getAttribute('d3'); const t3 = this.getAttribute('t3');
    const d4 = this.getAttribute('d4'); const t4 = this.getAttribute('t4');

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        :host {
          display: block;
          width: 100%;
          --ivory: #f6f1eb;
          --warm-gray: #9a9189;
          --charcoal: #2c2825;
          --deep: #1a1714;
          --copper: #b47b3a;
          --copper-light: #d4a05a;
          --serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        a { color: inherit; text-decoration: none; }

        .section-dark {
          padding: 7rem 2rem;
          background: var(--deep);
          color: var(--ivory);
          font-family: var(--sans);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .section-eyebrow {
          font-family: var(--sans);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--copper);
          margin-bottom: 1.2rem;
        }

        .section-title {
          font-family: var(--serif);
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 300;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          color: var(--ivory);
        }

        .gold-rule {
          width: 50px;
          height: 2px;
          background: var(--copper);
          margin-bottom: 2rem;
        }

        .contact-info h3 {
          font-family: var(--serif);
          font-size: 1.4rem;
          font-weight: 500;
          color: var(--ivory);
          margin-bottom: 0.5rem;
        }

        .contact-info p,
        .contact-info a {
          font-size: 1rem;
          color: rgba(246, 241, 235, 0.5);
          line-height: 1.7;
        }

        .contact-info a:hover {
          color: var(--copper-light);
        }

        .contact-block {
          margin-bottom: 2.5rem;
        }

        .service-times {
          padding: 3rem;
          border: 1px solid rgba(246, 241, 235, 0.1);
        }

        .service-times h3 {
          font-family: var(--serif);
          font-size: 1.8rem;
          font-weight: 400;
          color: var(--ivory);
          margin-bottom: 2rem;
        }

        .service-row {
          display: flex;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(246, 241, 235, 0.06);
          font-size: 0.95rem;
        }

        .service-row .day { color: rgba(246, 241, 235, 0.5); }
        .service-row .time { color: var(--copper-light); font-weight: 500; }

        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
          .container { padding: 0; }
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.1s; }
        .reveal-d2 { transition-delay: 0.2s; }
        .reveal-d3 { transition-delay: 0.3s; }
      </style>

      <section class="section-dark" id="contact">
        <div class="container">
          <div class="contact-grid">
            <div class="contact-info">
              <div class="section-eyebrow reveal">${eyebrow}</div>
              <h2 class="section-title reveal reveal-d1">${title}</h2>
              <div class="gold-rule reveal reveal-d2"></div>
              <div class="contact-block reveal reveal-d2">
                <h3>${locTitle}</h3>
                <p>${loc1}</p>
                <p>${loc2}</p>
              </div>
              <div class="contact-block reveal reveal-d3">
                <h3>${emailTitle}</h3>
                <p><a href="mailto:${emailVal}">${emailVal}</a></p>
              </div>
            </div>
            <div class="service-times reveal reveal-d1">
              <h3>${stTitle}</h3>
              <div class="service-row"><span class="day">${d1}</span><span class="time">${t1}</span></div>
              <div class="service-row"><span class="day">${d2}</span><span class="time">${t2}</span></div>
              <div class="service-row"><span class="day">${d3}</span><span class="time">${t3}</span></div>
              <div class="service-row"><span class="day">${d4}</span><span class="time">${t4}</span></div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('contact-section', ContactSection);

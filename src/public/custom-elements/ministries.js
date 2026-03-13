class MinistriesSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [
      'eyebrow-text', 'title-text', 'body-text',
      'm1-title', 'm1-desc', 'm2-title', 'm2-desc',
      'm3-title', 'm3-desc', 'm4-title', 'm4-desc'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('eyebrow-text')) this.setAttribute('eyebrow-text', 'What We Do');
    if (!this.hasAttribute('title-text')) this.setAttribute('title-text', 'Our Ministries');
    if (!this.hasAttribute('body-text')) this.setAttribute('body-text', 'Serving communities through faith, compassion, and the transformative power of the Gospel.');
    if (!this.hasAttribute('m1-title')) this.setAttribute('m1-title', 'Church Ministry');
    if (!this.hasAttribute('m1-desc')) this.setAttribute('m1-desc', 'Helping members learn more about God, worship meaningfully, and grow closer to Him through spiritual growth, discipleship, and community.');
    if (!this.hasAttribute('m2-title')) this.setAttribute('m2-title', 'Evangelism Outreach');
    if (!this.hasAttribute('m2-desc')) this.setAttribute('m2-desc', 'Sharing the message and teachings of Jesus Christ with intention and purpose, bringing people to experience His love and grace.');
    if (!this.hasAttribute('m3-title')) this.setAttribute('m3-title', 'Hospital Ministry');
    if (!this.hasAttribute('m3-desc')) this.setAttribute('m3-desc', 'Providing spiritual support, prayer, and companionship to those who are hospitalized, in nursing homes, or homebound.');
    if (!this.hasAttribute('m4-title')) this.setAttribute('m4-title', 'Prisons & Orphanages');
    if (!this.hasAttribute('m4-desc')) this.setAttribute('m4-desc', 'Serving incarcerated individuals and their families while extending love and care to children in need of hope and belonging.');
    this.render();
  }

  render() {
    const eyebrow = this.getAttribute('eyebrow-text');
    const title = this.getAttribute('title-text');
    const body = this.getAttribute('body-text');
    const m1t = this.getAttribute('m1-title'); const m1d = this.getAttribute('m1-desc');
    const m2t = this.getAttribute('m2-title'); const m2d = this.getAttribute('m2-desc');
    const m3t = this.getAttribute('m3-title'); const m3d = this.getAttribute('m3-desc');
    const m4t = this.getAttribute('m4-title'); const m4d = this.getAttribute('m4-desc');

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
        --cream: #ebe5db;
        --sand: #d6cec3;
        --warm-gray: #9a9189;
        --charcoal: #2c2825;
        --copper: #b47b3a;
        --serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
        --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      * { margin: 0; padding: 0; box-sizing: border-box; }

      .section-cream {
        background: var(--cream);
        padding: 5rem 2rem;
        color: var(--charcoal);
        font-family: var(--sans);
        width: 100%;
        min-height: 100%;
      }

      .container { max-width: 1200px; margin: 0 auto; }

      .ministries-header { text-align: center; margin-bottom: 4rem; }

      .section-eyebrow {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.35em;
        text-transform: uppercase;
        color: var(--copper);
        margin-bottom: 1.2rem;
      }

      .section-title {
        font-family: var(--serif);
        font-size: clamp(2.2rem, 4vw, 3.5rem);
        font-weight: 300;
        line-height: 1.15;
        margin-bottom: 1.5rem;
      }

      .section-body {
        font-size: 1.05rem;
        line-height: 1.85;
        color: var(--warm-gray);
        max-width: 600px;
        margin: 0 auto;
      }

      .ministries-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      .ministry-card {
        padding: 3rem;
        border: 1px solid rgba(44, 40, 37, 0.1);
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: default;
        background: transparent;
      }

      .ministry-card:hover {
        border-color: var(--copper);
        transform: translateY(-4px);
        box-shadow: 0 20px 50px rgba(44, 40, 37, 0.08);
      }

      .ministry-num {
        font-family: var(--serif);
        font-size: 3.5rem;
        font-weight: 300;
        color: var(--sand);
        line-height: 1;
        margin-bottom: 1.5rem;
        transition: color 0.4s;
      }

      .ministry-card:hover .ministry-num { color: var(--copper); }

      .ministry-card h3 {
        font-family: var(--serif);
        font-size: 1.6rem;
        font-weight: 500;
        margin-bottom: 1rem;
      }

      .ministry-card p {
        font-size: 0.95rem;
        line-height: 1.75;
        color: var(--warm-gray);
      }

      @media (max-width: 768px) { .ministries-grid { grid-template-columns: 1fr; } }
    `;
    this.shadowRoot.appendChild(style);

    const section = document.createElement('section');
    section.className = 'section-cream';
    section.innerHTML = `
      <div class="container">
        <div class="ministries-header">
          <div class="section-eyebrow">${eyebrow}</div>
          <h2 class="section-title">${title}</h2>
          <p class="section-body">${body}</p>
        </div>
        <div class="ministries-grid">
          <div class="ministry-card"><div class="ministry-num">01</div><h3>${m1t}</h3><p>${m1d}</p></div>
          <div class="ministry-card"><div class="ministry-num">02</div><h3>${m2t}</h3><p>${m2d}</p></div>
          <div class="ministry-card"><div class="ministry-num">03</div><h3>${m3t}</h3><p>${m3d}</p></div>
          <div class="ministry-card"><div class="ministry-num">04</div><h3>${m4t}</h3><p>${m4d}</p></div>
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(section);
  }
}

customElements.define('ministries-section', MinistriesSection);

class AboutSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [
      'eyebrow-text', 'title-text', 'title-em-text', 'body-text', 'image-src',
      'stat-1-num', 'stat-1-label', 'stat-2-num', 'stat-2-label', 'stat-3-num', 'stat-3-label'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('eyebrow-text')) this.setAttribute('eyebrow-text', 'Who We Are');
    if (!this.hasAttribute('title-text')) this.setAttribute('title-text', 'A church born from ');
    if (!this.hasAttribute('title-em-text')) this.setAttribute('title-em-text', 'prayer');
    if (!this.hasAttribute('body-text')) this.setAttribute('body-text', 'God Sent is a Christian Ministries and church located in Crystal Lake, Illinois. Started in 2022 as a simple prayer altar on WhatsApp, it grew to Zoom as communities across different spheres of the world sought live worship. God later opened doors for a physical church in Crystal Lake. Our desire is to see people saved, healed, delivered and restored back to God.');
    if (!this.hasAttribute('image-src')) this.setAttribute('image-src', 'https://princeshareable-cloud.github.io/god-sent-ministries/src/public/community.jpeg');
    if (!this.hasAttribute('stat-1-num')) this.setAttribute('stat-1-num', '2022');
    if (!this.hasAttribute('stat-1-label')) this.setAttribute('stat-1-label', 'Founded');
    if (!this.hasAttribute('stat-2-num')) this.setAttribute('stat-2-num', '4');
    if (!this.hasAttribute('stat-2-label')) this.setAttribute('stat-2-label', 'Ministries');
    if (!this.hasAttribute('stat-3-num')) this.setAttribute('stat-3-num', 'Global');
    if (!this.hasAttribute('stat-3-label')) this.setAttribute('stat-3-label', 'Reach');
    this.render();
  }

  render() {
    const eyebrow = this.getAttribute('eyebrow-text');
    const title = this.getAttribute('title-text');
    const titleEm = this.getAttribute('title-em-text');
    const body = this.getAttribute('body-text');
    const imgSrc = this.getAttribute('image-src');
    const s1n = this.getAttribute('stat-1-num');
    const s1l = this.getAttribute('stat-1-label');
    const s2n = this.getAttribute('stat-2-num');
    const s2l = this.getAttribute('stat-2-label');
    const s3n = this.getAttribute('stat-3-num');
    const s3l = this.getAttribute('stat-3-label');

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
        --sand: #d6cec3;
        --warm-gray: #9a9189;
        --charcoal: #2c2825;
        --copper: #b47b3a;
        --serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
        --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      * { margin: 0; padding: 0; box-sizing: border-box; }
      img { display: block; max-width: 100%; }

      .section {
        padding: 5rem 2rem;
        background: var(--ivory);
        color: var(--charcoal);
        font-family: var(--sans);
        width: 100%;
        min-height: 100%;
      }

      .container { max-width: 1200px; margin: 0 auto; }

      .about-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 5rem;
        align-items: center;
      }

      .about-img-wrapper { position: relative; }

      .about-img {
        width: 100%;
        aspect-ratio: 3/4;
        object-fit: cover;
        filter: saturate(0.9) contrast(1.05);
      }

      .about-img-wrapper::before {
        content: '';
        position: absolute;
        top: -20px;
        right: -20px;
        width: 60%;
        height: calc(100% + 40px);
        border: 1.5px solid var(--copper);
        opacity: 0.3;
        pointer-events: none;
      }

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

      .section-title em { font-style: italic; color: var(--copper); }

      .gold-rule {
        width: 50px;
        height: 2px;
        background: var(--copper);
        margin-bottom: 2rem;
      }

      .section-body {
        font-size: 1.05rem;
        line-height: 1.85;
        color: var(--warm-gray);
        max-width: 600px;
      }

      .about-stats {
        display: flex;
        gap: 3rem;
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid var(--sand);
      }

      .stat-num {
        font-family: var(--serif);
        font-size: 2.5rem;
        font-weight: 300;
        color: var(--copper);
        line-height: 1;
      }

      .stat-label {
        font-size: 0.8rem;
        font-weight: 500;
        letter-spacing: 0.05em;
        color: var(--warm-gray);
        margin-top: 0.5rem;
      }

      @media (max-width: 900px) {
        .about-grid { grid-template-columns: 1fr; gap: 3rem; }
        .about-img-wrapper::before { display: none; }
      }
    `;
    this.shadowRoot.appendChild(style);

    const section = document.createElement('section');
    section.className = 'section';
    section.innerHTML = `
      <div class="container">
        <div class="about-grid">
          <div class="about-img-wrapper">
            <img src="${imgSrc}" alt="About Us" class="about-img">
          </div>
          <div class="about-text">
            <div class="section-eyebrow">${eyebrow}</div>
            <h2 class="section-title">${title}<em>${titleEm}</em></h2>
            <div class="gold-rule"></div>
            <p class="section-body">${body}</p>
            <div class="about-stats">
              <div><div class="stat-num">${s1n}</div><div class="stat-label">${s1l}</div></div>
              <div><div class="stat-num">${s2n}</div><div class="stat-label">${s2l}</div></div>
              <div><div class="stat-num">${s3n}</div><div class="stat-label">${s3l}</div></div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(section);
  }
}

customElements.define('about-section', AboutSection);

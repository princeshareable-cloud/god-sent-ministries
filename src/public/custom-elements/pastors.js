class PastorsSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [
      'eyebrow-text', 'title-text',
      'p1-img', 'p1-role', 'p1-name', 'p1-bio',
      'p2-img', 'p2-role', 'p2-name', 'p2-bio'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('eyebrow-text')) this.setAttribute('eyebrow-text', 'Shepherds of the Flock');
    if (!this.hasAttribute('title-text')) this.setAttribute('title-text', 'Our Leadership');
    if (!this.hasAttribute('p1-img')) this.setAttribute('p1-img', 'https://princeshareable-cloud.github.io/god-sent-ministries/src/public/pastor-david.jpeg');
    if (!this.hasAttribute('p1-role')) this.setAttribute('p1-role', 'Senior Pastor & Founder');
    if (!this.hasAttribute('p1-name')) this.setAttribute('p1-name', 'Apostle David Mugerwa');
    if (!this.hasAttribute('p1-bio')) this.setAttribute('p1-bio', "Apostle David holds a Bachelor\u2019s degree in Christian Ministry and a Master\u2019s degree in Evangelism & Leadership from Wheaton College. He is passionate about church planting, evangelism, and transforming lives through the power of the Gospel.");
    if (!this.hasAttribute('p2-img')) this.setAttribute('p2-img', 'https://princeshareable-cloud.github.io/god-sent-ministries/src/public/pastor-debbie.jpeg');
    if (!this.hasAttribute('p2-role')) this.setAttribute('p2-role', 'Co-Pastor');
    if (!this.hasAttribute('p2-name')) this.setAttribute('p2-name', 'Pastor Debbie Mugerwa');
    if (!this.hasAttribute('p2-bio')) this.setAttribute('p2-bio', "Pastor Debbie holds a diploma in Early Childhood Development from Concordia University. Her passion is rooted in teaching the Word of God, leading children\u2019s ministries, and counseling women through the most challenging seasons of life.");
    this.render();
  }

  render() {
    const eyebrow = this.getAttribute('eyebrow-text');
    const title = this.getAttribute('title-text');
    const p1img = this.getAttribute('p1-img');
    const p1role = this.getAttribute('p1-role');
    const p1name = this.getAttribute('p1-name');
    const p1bio = this.getAttribute('p1-bio');
    const p2img = this.getAttribute('p2-img');
    const p2role = this.getAttribute('p2-role');
    const p2name = this.getAttribute('p2-name');
    const p2bio = this.getAttribute('p2-bio');

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

      .pastors-header { text-align: center; margin-bottom: 5rem; }

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

      .pastors-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
      }

      .pastor-img-wrap {
        overflow: hidden;
        margin-bottom: 2rem;
        position: relative;
      }

      .pastor-img-wrap::after {
        content: '';
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 30%;
        background: linear-gradient(0deg, var(--ivory), transparent);
        pointer-events: none;
      }

      .pastor-img {
        width: 100%;
        aspect-ratio: 3/4;
        object-fit: cover;
        object-position: top;
        filter: saturate(0.85) contrast(1.05);
        transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .pastor-card:hover .pastor-img { transform: scale(1.03); }

      .pastor-role {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--copper);
        margin-bottom: 0.5rem;
      }

      .pastor-name {
        font-family: var(--serif);
        font-size: 2rem;
        font-weight: 500;
        margin-bottom: 1rem;
      }

      .pastor-bio {
        font-size: 0.95rem;
        line-height: 1.8;
        color: var(--warm-gray);
      }

      @media (max-width: 768px) { .pastors-grid { grid-template-columns: 1fr; } }
    `;
    this.shadowRoot.appendChild(style);

    const section = document.createElement('section');
    section.className = 'section';
    section.innerHTML = `
      <div class="container">
        <div class="pastors-header">
          <div class="section-eyebrow">${eyebrow}</div>
          <h2 class="section-title">${title}</h2>
        </div>
        <div class="pastors-grid">
          <div class="pastor-card">
            <div class="pastor-img-wrap"><img src="${p1img}" alt="${p1name}" class="pastor-img"></div>
            <div class="pastor-role">${p1role}</div>
            <h3 class="pastor-name">${p1name}</h3>
            <p class="pastor-bio">${p1bio}</p>
          </div>
          <div class="pastor-card">
            <div class="pastor-img-wrap"><img src="${p2img}" alt="${p2name}" class="pastor-img"></div>
            <div class="pastor-role">${p2role}</div>
            <h3 class="pastor-name">${p2name}</h3>
            <p class="pastor-bio">${p2bio}</p>
          </div>
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(section);
  }
}

customElements.define('pastors-section', PastorsSection);

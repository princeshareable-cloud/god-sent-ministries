class MinistriesSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return [
            'heading',
            'ministry-1-title', 'ministry-1-desc',
            'ministry-2-title', 'ministry-2-desc',
            'ministry-3-title', 'ministry-3-desc',
            'ministry-4-title', 'ministry-4-desc'
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        // Default values based on the initial email
        if (!this.hasAttribute('heading')) this.setAttribute('heading', 'OUR MINISTRIES');

        if (!this.hasAttribute('ministry-1-title')) this.setAttribute('ministry-1-title', 'Church Ministry');
        if (!this.hasAttribute('ministry-1-desc')) this.setAttribute('ministry-1-desc', 'Helping members learn more about God, worship meaningfully, and grow closer to God through spiritual growth and discipleship.');

        if (!this.hasAttribute('ministry-2-title')) this.setAttribute('ministry-2-title', 'Evangelism');
        if (!this.hasAttribute('ministry-2-desc')) this.setAttribute('ministry-2-desc', 'Sharing the message and teachings of Jesus Christ with the intention of bringing people to Him.');

        if (!this.hasAttribute('ministry-3-title')) this.setAttribute('ministry-3-title', 'Hospital Outreach');
        if (!this.hasAttribute('ministry-3-desc')) this.setAttribute('ministry-3-desc', 'Providing support and services to people who are hospitalized, in nursing homes, or homebound, including prayer and Holy Communion.');

        if (!this.hasAttribute('ministry-4-title')) this.setAttribute('ministry-4-title', 'Prisons & Orphanages');
        if (!this.hasAttribute('ministry-4-desc')) this.setAttribute('ministry-4-desc', 'Serving incarcerated people and their families, and helping children in need by providing resources, education, and care.');

        this.render();
    }

    render() {
        const getAttr = (name) => this.getAttribute(name) || '';

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #000000;
          color: #ffffff;
          padding: 8rem 0;
          position: relative;
        }

        /* Subtle glowing background accent */
        :host::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 50vw;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(20, 25, 30, 0.4) 100%);
          pointer-events: none;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 10;
        }

        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 2rem;
        }

        h2 {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 300;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin: 0;
          position: relative;
          color: #ffffff;
          line-height: 1;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .card {
          background-color: #050505;
          padding: 4rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 300px;
          transition: background-color 0.4s ease, transform 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .card:hover {
          background-color: #0a0b0c;
        }

        .card:hover::before {
          opacity: 1;
        }

        .card-number {
          font-family: monospace;
          font-size: 1rem;
          color: #505050;
          margin-bottom: 2rem;
        }

        h3 {
          font-size: 2rem;
          font-weight: 400;
          margin: 0 0 1.5rem 0;
          letter-spacing: 0.02em;
        }

        p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #808080;
          margin: 0;
          transition: color 0.4s ease;
        }

        .card:hover p {
          color: #b0b0b0;
        }

        .arrow {
          margin-top: 3rem;
          width: 40px;
          height: 1px;
          background-color: #505050;
          position: relative;
          transition: width 0.4s ease, background-color 0.4s ease;
        }

        .arrow::after {
          content: '';
          position: absolute;
          right: 0;
          top: -4px;
          width: 8px;
          height: 8px;
          border-top: 1px solid #505050;
          border-right: 1px solid #505050;
          transform: rotate(45deg);
          transition: border-color 0.4s ease;
        }

        .card:hover .arrow {
          width: 60px;
          background-color: #ffffff;
        }

        .card:hover .arrow::after {
          border-color: #ffffff;
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .card {
            padding: 3rem 2rem;
            min-height: auto;
          }
        }
      </style>
      
      <div class="container">
        <div class="section-header">
          <h2>${getAttr('heading')}</h2>
        </div>
        
        <div class="grid">
          <div class="card">
            <div class="card-number">01</div>
            <div>
              <h3>${getAttr('ministry-1-title')}</h3>
              <p>${getAttr('ministry-1-desc')}</p>
              <div class="arrow"></div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-number">02</div>
            <div>
              <h3>${getAttr('ministry-2-title')}</h3>
              <p>${getAttr('ministry-2-desc')}</p>
              <div class="arrow"></div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-number">03</div>
            <div>
              <h3>${getAttr('ministry-3-title')}</h3>
              <p>${getAttr('ministry-3-desc')}</p>
              <div class="arrow"></div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-number">04</div>
            <div>
              <h3>${getAttr('ministry-4-title')}</h3>
              <p>${getAttr('ministry-4-desc')}</p>
              <div class="arrow"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    }
}

customElements.define('ministries-section', MinistriesSection);

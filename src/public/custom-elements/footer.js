class FooterSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['location', 'email', 'phone'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('location')) this.setAttribute('location', 'Crystal Lake, Illinois-USA');
    if (!this.hasAttribute('email')) this.setAttribute('email', 'contact@godsentministries.org');
    if (!this.hasAttribute('phone')) this.setAttribute('phone', '');
    this.render();
  }

  render() {
    const g = (n) => this.getAttribute(n) || '';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Raleway:wght@300;400;500;600&display=swap');

        :host { display: block; width: 100%; }

        .footer {
          background: linear-gradient(180deg, #0a0015 0%, #020005 100%);
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
        }

        .main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 4rem;
        }

        .brand h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 1rem;
          background: linear-gradient(135deg, #ffffff, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand p {
          font-family: 'Raleway', sans-serif;
          font-size: 0.95rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.4);
          max-width: 350px;
        }

        .col-title {
          font-family: 'Raleway', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 1.5rem;
        }

        ul { list-style: none; padding: 0; margin: 0; }

        li {
          font-family: 'Raleway', sans-serif;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
          margin-bottom: 0.8rem;
          line-height: 1.6;
        }

        a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.3s;
        }

        a:hover { color: #d4af37; }

        .bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .bottom span {
          font-family: 'Raleway', sans-serif;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.25);
        }

        @media (max-width: 900px) {
          .main { grid-template-columns: 1fr; gap: 3rem; padding: 3rem 1.5rem; }
          .bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      </style>

      <footer class="footer">
        <div class="main">
          <div class="brand">
            <h2>God Sent Ministries</h2>
            <p>Started in 2022 as a prayer altar, now reaching communities across different spheres of the world through the presence and power of God.</p>
          </div>
          <div>
            <div class="col-title">Location</div>
            <ul>
              <li>${g('location')}</li>
              <li>Online Campus via Zoom</li>
            </ul>
          </div>
          <div>
            <div class="col-title">Get In Touch</div>
            <ul>
              <li><a href="mailto:${g('email')}">${g('email')}</a></li>
              ${g('phone') ? '<li><a href="tel:' + g('phone') + '">' + g('phone') + '</a></li>' : ''}
            </ul>
          </div>
        </div>
        <div class="bottom">
          <span>&copy; ${new Date().getFullYear()} God Sent Ministries. All rights reserved.</span>
          <span>Designed with love & purpose.</span>
        </div>
      </footer>
    `;
  }
}
customElements.define('footer-section', FooterSection);

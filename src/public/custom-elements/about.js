class AboutSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['heading-text', 'body-text', 'image-url'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        if (!this.hasAttribute('heading-text')) {
            this.setAttribute('heading-text', 'ABOUT US');
        }
        if (!this.hasAttribute('body-text')) {
            this.setAttribute('body-text', 'God Sent is a Christian Ministries and church located in Crystal Lake, Illinois-USA. This church started in 2022 as a prayer alter online, on a WhatsApp platform and later on Zoom platform as the need for live streaming was needed...');
        }
        if (!this.hasAttribute('image-url')) {
            this.setAttribute('image-url', 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop');
        }
        this.render();
    }

    render() {
        const headingText = this.getAttribute('heading-text');
        const bodyText = this.getAttribute('body-text');
        const imageUrl = this.getAttribute('image-url');

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #050505; /* Deep rich black */
          color: #e0e0e0;
          padding: 6rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .text-content {
          order: 2; /* Image on left, text on right by default */
        }

        h2 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 300;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 2rem 0;
          position: relative;
          color: #ffffff;
        }

        h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 60px;
          height: 2px;
          background-color: #ffffff;
        }

        p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #909090;
          margin-bottom: 1.5rem;
        }

        .image-container {
          order: 1;
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          aspect-ratio: 4/5;
        }

        .image-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
          pointer-events: none;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .image-container:hover img {
          transform: scale(1.03);
        }

        @media (max-width: 900px) {
          .container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .text-content {
            order: 1;
          }
          .image-container {
            order: 2;
            aspect-ratio: 16/9;
          }
        }
      </style>
      
      <div class="container">
        <div class="image-container">
          <img src="${imageUrl}" alt="About God Sent Ministries">
        </div>
        <div class="text-content">
          <h2>${headingText}</h2>
          <p>${bodyText}</p>
        </div>
      </div>
    `;
    }
}

customElements.define('about-section', AboutSection);

class HeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title-text', 'subtitle-text', 'background-image'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  connectedCallback() {
    if (!this.hasAttribute('title-text')) this.setAttribute('title-text', 'GOD SENT MINISTRIES');
    if (!this.hasAttribute('subtitle-text')) this.setAttribute('subtitle-text', 'To rescue, recover, & restore people to God who have never experienced the presence and power of God.');
    if (!this.hasAttribute('background-image')) this.setAttribute('background-image', '../hero-bg.jpeg');
    this.render();
    this._startParticles();
  }

  _startParticles() {
    const canvas = this.shadowRoot.querySelector('#particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, stars = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    const createStars = () => {
      stars = [];
      for (let i = 0; i < 80; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.8 + 0.3,
          alpha: Math.random(),
          da: (Math.random() - 0.5) * 0.015,
          dy: -Math.random() * 0.3 - 0.1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        s.alpha += s.da;
        if (s.alpha <= 0 || s.alpha >= 1) s.da *= -1;
        s.y += s.dy;
        if (s.y < -5) { s.y = h + 5; s.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 175, 55, ' + Math.max(0, Math.min(1, s.alpha)) + ')';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    resize();
    createStars();
    draw();
    window.addEventListener('resize', () => { resize(); createStars(); });
  }

  render() {
    const title = this.getAttribute('title-text');
    const subtitle = this.getAttribute('subtitle-text');
    const bg = this.getAttribute('background-image');

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Raleway:wght@300;400;500;600&display=swap');

        :host { display: block; width: 100%; }

        .hero {
          position: relative;
          height: 100vh;
          min-height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0a0015;
        }

        .bg-image {
          position: absolute;
          inset: 0;
          background: url('${bg}') center/cover no-repeat;
          filter: brightness(0.4) saturate(1.3);
          transform: scale(1.05);
          animation: slowZoom 25s ease-in-out infinite alternate;
        }

        .gradient-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(100, 50, 180, 0.5) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 100%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
            linear-gradient(180deg, rgba(10, 0, 21, 0.3) 0%, rgba(10, 0, 21, 0.7) 100%);
        }

        canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 1000px;
          padding: 2rem;
        }

        .logo-mark {
          display: inline-block;
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin-bottom: 2rem;
          animation: fadeIn 1s 0.3s both;
        }

        h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3rem, 7vw, 6.5rem);
          font-weight: 900;
          line-height: 1.05;
          margin: 0 0 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: linear-gradient(135deg, #fff 0%, #ffeaa7 35%, #d4af37 65%, #fff 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeUp 1.2s 0.5s both, shimmer 6s ease-in-out infinite;
          filter: drop-shadow(0 0 30px rgba(212, 175, 55, 0.4));
        }

        .divider {
          width: 80px;
          height: 3px;
          margin: 0 auto 2rem;
          background: linear-gradient(90deg, #d4af37, #8b5cf6);
          border-radius: 3px;
          animation: fadeUp 1s 0.8s both;
        }

        p {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 300;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          max-width: 700px;
          margin: 0 auto 3rem;
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
          animation: fadeUp 1s 1s both;
        }

        .cta {
          display: inline-block;
          font-family: 'Raleway', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #fff;
          padding: 18px 50px;
          border: 2px solid rgba(212, 175, 55, 0.6);
          border-radius: 0;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(138, 43, 226, 0.15));
          text-decoration: none;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fadeUp 1s 1.2s both;
          position: relative;
          overflow: hidden;
        }

        .cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #d4af37, #8b5cf6);
          opacity: 0;
          transition: opacity 0.5s;
        }

        .cta span { position: relative; z-index: 1; }

        .cta:hover { border-color: #d4af37; transform: translateY(-3px); box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3); }
        .cta:hover::before { opacity: 1; }

        .scroll-hint {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          animation: fadeIn 1s 2s both;
        }

        .scroll-hint span {
          font-family: 'Raleway', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
        }

        .scroll-line {
          width: 1px;
          height: 50px;
          position: relative;
          overflow: hidden;
        }

        .scroll-line::after {
          content: '';
          position: absolute;
          top: -50px;
          left: 0;
          width: 1px;
          height: 50px;
          background: linear-gradient(180deg, transparent, #d4af37);
          animation: scrollLine 2s ease-in-out infinite;
        }

        @keyframes slowZoom { to { transform: scale(1.15); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes scrollLine { 0% { top: -50px; } 100% { top: 50px; } }

        @media (max-width: 768px) {
          .content { padding: 1.5rem; }
          .cta { padding: 15px 35px; font-size: 0.8rem; }
        }
      </style>

      <div class="hero">
        <div class="bg-image"></div>
        <div class="gradient-overlay"></div>
        <canvas id="particles"></canvas>
        <div class="content">
          <div class="logo-mark"></div>
          <h1>${title}</h1>
          <div class="divider"></div>
          <p>${subtitle}</p>
          <a class="cta"><span>JOIN US THIS SUNDAY</span></a>
        </div>
        <div class="scroll-hint">
          <span>Discover</span>
          <div class="scroll-line"></div>
        </div>
      </div>
    `;
  }
}
customElements.define('hero-section', HeroSection);

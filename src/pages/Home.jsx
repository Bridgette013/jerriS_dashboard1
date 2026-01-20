import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="hero-image-container">
            <img 
              src="/images/jerri-headshot.png" 
              alt="Jerri S." 
              className="hero-image"
            />
            <div className="hero-image-ring"></div>
          </div>
          
          <h1 className="hero-name">Jerri S.</h1>
          <p className="hero-tagline">The chaos. The clutter. The real.</p>
          
          <p className="hero-bio">
            Single mom. Four kids. Two cats. Zero filters.<br />
            <span className="hero-highlight">Just imagine...</span> someone finally gets it.
          </p>

          {/* Social Links */}
          <div className="social-links">
            <a href="https://facebook.com/jerri.winters" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Follow on Facebook
            </a>
            <a href="https://youtube.com/@jerris" target="_blank" rel="noopener noreferrer" className="social-btn youtube">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Subscribe on YouTube
            </a>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat">
              <span className="stat-number">4M+</span>
              <span className="stat-label">Views</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">16K+</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">4</span>
              <span className="stat-label">Tiny Humans</span>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Crew */}
      <section className="crew-section">
        <h2 className="section-title">Meet the Crew</h2>
        <p className="section-subtitle">The real stars of this chaos</p>
        
        <div className="crew-grid">
          <div className="crew-card crew-card-large">
            <img src="/images/jerri-baby.png" alt="Jerri with Jasper" />
            <div className="crew-card-overlay">
              <span>Jasper, 3</span>
              <span className="crew-tag">The Baby</span>
            </div>
          </div>
          <div className="crew-card">
            <img src="/images/crew-stack.png" alt="Emmarose, Lillyana, and Jasper" />
            <div className="crew-card-overlay">
              <span>The Middles</span>
            </div>
          </div>
          <div className="crew-card">
            <img src="/images/crew-bench.png" alt="Deegan, Lillyana, and Emmarose" />
            <div className="crew-card-overlay">
              <span>Squad Goals</span>
            </div>
          </div>
        </div>

        <div className="crew-names">
          <span>Deegan, 16</span>
          <span className="dot">•</span>
          <span>Emmarose, 11</span>
          <span className="dot">•</span>
          <span>Lillyana, 7</span>
          <span className="dot">•</span>
          <span>Jasper, 3</span>
          <span className="dot">•</span>
          <span>Bonnie & Clyde 🐱🐱</span>
        </div>
      </section>

      {/* You're Not Alone Section */}
      <section className="message-section">
        <div className="message-content">
          <div className="quote-mark">"</div>
          <p className="message-text">
            I show the mess because I know you have one too. The dishes piled up. 
            The tears in the car after drop-off. The days where you didn't brush 
            your teeth until 4pm.
          </p>
          <p className="message-emphasis">
            You're not broken. You're not behind. You're not alone.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="links-section">
        <div className="quick-links">
          <Link to="/shop" className="quick-link">
            <span className="quick-link-icon">🛒</span>
            <span className="quick-link-text">Shop My Favorites</span>
            <span className="quick-link-arrow">→</span>
          </Link>
          <Link to="/about" className="quick-link">
            <span className="quick-link-icon">💜</span>
            <span className="quick-link-text">My Story</span>
            <span className="quick-link-arrow">→</span>
          </Link>
          <Link to="/contact" className="quick-link">
            <span className="quick-link-icon">✉️</span>
            <span className="quick-link-text">Work With Me</span>
            <span className="quick-link-arrow">→</span>
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="cta-section">
        <p className="cta-text">Ready to join the chaos?</p>
        <a href="https://facebook.com/jerri.winters" target="_blank" rel="noopener noreferrer" className="cta-button">
          Follow Along 💜
        </a>
      </section>
    </div>
  );
}

export default Home;
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        {/* Background decorations */}
        <div className="hero-bg-shape shape-1"></div>
        <div className="hero-bg-shape shape-2"></div>
        <div className="hero-grid-lines"></div>
        
        <div className="hero-container">
          {/* Left side - Text content */}
          <div className="hero-content">
            <p className="hero-greeting">Hey, I'm Jerri</p>
            <h1 className="hero-headline">
              Single Mom.<br />
              Four Kids.<br />
              <span className="headline-accent">Zero Filters.</span>
            </h1>
            <p className="hero-tagline">The chaos. The clutter. The real.</p>
            <p className="hero-bio">
              I share the stuff most people won't—the breakdowns, 
              the breakthroughs, and everything in between.
              <em> Just imagine...</em> someone finally gets it.
            </p>
            
            <div className="hero-buttons">
              <a href="https://facebook.com/jerri.winters" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Follow Me
              </a>
              <Link to="/contact" className="btn btn-outline">
                Work With Me
              </Link>
            </div>

            <div className="hero-social">
              <span className="social-label">Check Out My</span>
              <div className="social-line"></div>
              <div className="social-icons">
                <a href="https://facebook.com/jerri.winters" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://youtube.com/@jerris" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Photo */}
          <div className="hero-image-wrapper">
            <div className="image-blob"></div>
            <div className="image-frame">
              <img 
                src="/images/jerri-headshot.png" 
                alt="Jerri S." 
                className="hero-photo"
              />
            </div>
            
            {/* Floating elements around photo */}
            <div className="floating-icon floating-1">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </div>
            <div className="floating-icon floating-2">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </div>
            <div className="floating-stat floating-3">
              <span className="stat-num">4M+</span>
              <span className="stat-txt">views</span>
            </div>
            <div className="floating-badge floating-4">
              <span>💜</span>
            </div>
            
            {/* Decorative elements */}
            <div className="deco-dots"></div>
            <div className="deco-wave">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q25,0 50,10 T100,10" stroke="currentColor" fill="none" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Wave Section */}
      <section className="stats-section">
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,60 1200,60 L1200,120 L0,120 Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">4M+</span>
            <span className="stat-label">Views</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">16K+</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4</span>
            <span className="stat-label">Tiny Humans</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2</span>
            <span className="stat-label">Chaos Cats</span>
          </div>
        </div>
      </section>

      {/* Meet The Crew */}
      <section className="crew-section">
        <div className="section-header">
          <p className="section-eyebrow">The Real Stars</p>
          <h2 className="section-title">Meet the Crew</h2>
        </div>
        
        <div className="crew-grid">
          <div className="crew-card large">
            <div className="crew-card-inner">
              <img src="/images/jerri-baby.png" alt="Jerri with Jasper" />
              <div className="crew-info">
                <span className="crew-name">Jasper</span>
                <span className="crew-role">The Baby • 3</span>
              </div>
            </div>
          </div>
          <div className="crew-card">
            <div className="crew-card-inner">
              <img src="/images/crew-stack.png" alt="The kids" />
              <div className="crew-info">
                <span className="crew-name">The Squad</span>
                <span className="crew-role">Partners in Crime</span>
              </div>
            </div>
          </div>
          <div className="crew-card">
            <div className="crew-card-inner">
              <img src="/images/crew-bench.png" alt="Kids on bench" />
              <div className="crew-info">
                <span className="crew-name">Crew Goals</span>
                <span className="crew-role">Organized Chaos</span>
              </div>
            </div>
          </div>
        </div>

        <p className="crew-list">
          <span>Deegan, 16</span> • <span>Emmarose, 11</span> • <span>Lillyana, 7</span> • <span>Jasper, 3</span> • <span>Bonnie & Clyde 🐱🐱</span>
        </p>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="quote-bg-shape"></div>
        <div className="quote-container">
          <div className="quote-mark">"</div>
          <blockquote className="quote-text">
            I show the mess because I know you have one too. The dishes piled up. 
            The tears in the car after drop-off. The days where you didn't brush 
            your teeth until 4pm.
          </blockquote>
          <p className="quote-emphasis">
            You're not broken. You're not behind.<br />
            <span>You're not alone.</span>
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="links-section">
        <div className="links-container">
          <Link to="/shop" className="link-card">
            <div className="link-icon">🛒</div>
            <div className="link-content">
              <h3>Shop My Favorites</h3>
              <p>Products I actually use (and my kids destroy)</p>
            </div>
            <span className="link-arrow">→</span>
          </Link>
          <Link to="/about" className="link-card">
            <div className="link-icon">💜</div>
            <div className="link-content">
              <h3>My Story</h3>
              <p>How I got here and why I share it all</p>
            </div>
            <span className="link-arrow">→</span>
          </Link>
          <Link to="/contact" className="link-card">
            <div className="link-icon">✉️</div>
            <div className="link-content">
              <h3>Work With Me</h3>
              <p>Brand collabs, UGC, and partnerships</p>
            </div>
            <span className="link-arrow">→</span>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to join the chaos?</h2>
          <p>Follow along for the realest content on the internet.</p>
          <a href="https://facebook.com/jerri.winters" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">
            Follow Along 💜
          </a>
        </div>
        <div className="cta-decoration"></div>
      </section>

    {/* Hidden trap door */}
<div 
  onClick={() => window.location.href = '/dashboard'}
  style={{
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    width: '20px',
    height: '20px',
    backgroundColor: 'black',
    cursor: 'default',
    opacity: 0.1
  }}
></div>

{/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to join the chaos?</h2>
          <p>Follow along for the realest content on the internet.</p>
          <a href="https://facebook.com/jerri.winters" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">
            Follow Along 💜
          </a>
        </div>
        <div className="cta-decoration"></div>
      </section>

      {/* Secret door */}
      <Link to="/login" style={{ 
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        width: '20px',
        height: '20px',
        opacity: 0
      }}>.</Link>
    </div>
  );
}

export default Home;
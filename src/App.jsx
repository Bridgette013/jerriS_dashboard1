import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, NavLink, Link } from 'react-router-dom';

// Home is eager-loaded — it's the LCP landing page
import Home from './pages/Home';

// Secondary pages are code-split and loaded on demand
const Shop = lazy(() => import('./pages/Shop'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Links = lazy(() => import('./pages/Links'));

import './App.css';

const PublicLayout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="site">
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="brand">
          <picture>
            <source srcSet="/images/JerrisWorld_Logo_White.webp" type="image/webp" />
            <img
              src="/images/JerrisWorld_Logo_White.png"
              alt="Jerri's World"
              className="brand-logo"
            />
          </picture>
        </Link>
        <nav className="site-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Shop My Favorites
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Collabs
          </NavLink>
        </nav>
        <a className="header-cta" href="https://facebook.com/jerri.winters" target="_blank" rel="noopener noreferrer">
          Follow Along
        </a>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div>
          <p className="footer-title">Jerri S.</p>
          <p className="footer-subtitle">Single mom of 4. No filter. No shame.</p>
        </div>
        <p className="footer-meta">&copy; {new Date().getFullYear()} Jerri S. All rights reserved.</p>
      </footer>
    </div>
  );
};

/* ============================================
   404 PAGE
   ============================================ */
const NotFound = () => (
  <div style={{
    textAlign: 'center',
    padding: '6rem 2rem',
    maxWidth: '500px',
    margin: '0 auto'
  }}>
    <h1 style={{
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '4rem',
      background: 'linear-gradient(135deg, #ff3b3b, #ffffff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    }}>404</h1>
    <p style={{
      fontSize: '1.1rem',
      color: '#888',
      marginBottom: '2rem'
    }}>
      This page doesn't exist. Probably got lost in the chaos.
    </p>
    <Link to="/" style={{
      display: 'inline-block',
      background: 'linear-gradient(135deg, #ff3b3b, #cc0000)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: '600'
    }}>
      Back to Home
    </Link>
  </div>
);

/* ============================================
   ROUTES — PUBLIC ONLY
   ============================================ */
const RouteFallback = () => (
  <div style={{ minHeight: '60vh' }} />
);

const App = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/shop"
        element={
          <PublicLayout>
            <Shop />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />

      {/* Public links page (no header/footer — used as link-in-bio) */}
      <Route path="/links" element={<Links />} />

      {/* 404 catch-all */}
      <Route
        path="*"
        element={
          <PublicLayout>
            <NotFound />
          </PublicLayout>
        }
      />
    </Routes>
    </Suspense>
  );
};

export default App;

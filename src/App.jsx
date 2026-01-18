import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Podcast from './pages/Podcast';
import './App.css';

const Layout = ({ children }) => {
  return (
    <div className="site">
      <header className="site-header">
        <div className="brand">
          <span className="brand-title">Sierra Vox Studio</span>
          <span className="brand-subtitle">Voice &amp; Narrative Studio</span>
        </div>
        <nav className="site-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Services
          </NavLink>
          <NavLink to="/podcast" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Podcast
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>
        </nav>
        <a className="header-cta" href="mailto:studio@twistedtiffany.com">
          Book a Session
        </a>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div>
          <p className="footer-title">Sierra Vox Studio Voice &amp; Narrative Studio</p>
          <p className="footer-subtitle">Broadcast-ready voice work for story-driven brands.</p>
        </div>
        <p className="footer-meta">© {new Date().getFullYear()} Sierra Vox Studio. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/services"
        element={
          <Layout>
            <Services />
          </Layout>
        }
      />
      <Route
        path="/podcast"
        element={
          <Layout>
            <Podcast />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;

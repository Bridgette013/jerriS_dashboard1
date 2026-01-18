import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

// Public pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';

// Dashboard pages
import Dashboard from './pages/dashboard/Dashboard';
import ContentCalendar from './pages/dashboard/ContentCalendar';
import LinkTracker from './pages/dashboard/LinkTracker';
import Analytics from './pages/dashboard/Analytics';

import './App.css';

const PublicLayout = ({ children }) => {
  return (
    <div className="site">
      <header className="site-header">
        <div className="brand">
          <span className="brand-title">Jerri S.</span>
          <span className="brand-subtitle">The chaos. The clutter. The real.</span>
        </div>
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
        <p className="footer-meta">© {new Date().getFullYear()} Jerri S. All rights reserved.</p>
      </footer>
    </div>
  );
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout bg-brand-carbon text-brand-white">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-title">Jerri S.</span>
          <span className="sidebar-subtitle">Creator Dashboard</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            📊 Overview
          </NavLink>
          <NavLink to="/dashboard/calendar" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            📅 Content Calendar
          </NavLink>
          <NavLink to="/dashboard/links" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            🔗 Link Tracker
          </NavLink>
          <NavLink to="/dashboard/analytics" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            📈 Analytics
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <NavLink to="/" className="sidebar-link back-link">
            ← Back to Site
          </NavLink>
        </div>
      </aside>
      <main className="dashboard-main">{children}</main>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
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
      
      {/* Dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/calendar"
        element={
          <DashboardLayout>
            <ContentCalendar />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/links"
        element={
          <DashboardLayout>
            <LinkTracker />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/analytics"
        element={
          <DashboardLayout>
            <Analytics />
          </DashboardLayout>
        }
      />
      
      {/* Fallback */}
      <Route
        path="*"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
    </Routes>
  );
};

export default App;
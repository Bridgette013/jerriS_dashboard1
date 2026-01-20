import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import ContentCalendar from './pages/dashboard/ContentCalendar';
import LinkTracker from './pages/dashboard/LinkTracker';
import Hub from './pages/dashboard/Hub';
import './App.css';

function App() {
  return (
    <Router>
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand">
            <span className="sidebar-title">JerrisWorld</span>
            <span className="sidebar-subtitle">Creator Dashboard</span>
          </div>
          
          <nav className="sidebar-nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              end
            >
              📊 Dashboard
            </NavLink>
            <NavLink 
              to="/calendar" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              📅 Calendar
            </NavLink>
            <NavLink 
              to="/links" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              🔗 Links
            </NavLink>
            <NavLink 
              to="/hub" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              🔐 Hub
            </NavLink>
          </nav>

          <div className="sidebar-footer">
            <a 
              href="https://jerrisworld.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="sidebar-link back-link"
            >
              ← View Site
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<ContentCalendar />} />
            <Route path="/links" element={<LinkTracker />} />
            <Route path="/hub" element={<Hub />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
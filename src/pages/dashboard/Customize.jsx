import React, { useState, useEffect } from 'react';
import './Customize.css';

// Default settings
const defaultSettings = {
  profile: {
    name: 'Jerri S.',
    bio: 'Single mom of 4. No filter. No shame. Sharing the chaos, the clutter, and the real.',
    photo: '',
  },
  socials: {
    facebook: 'https://facebook.com/jerri.winters',
    instagram: '',
    tiktok: '',
    youtube: '',
    pinterest: '',
    twitter: '',
  },
  quickLinks: [
    { id: 1, title: 'Shop My Favorites', url: '/shop', enabled: true },
    { id: 2, title: 'About Me', url: '/about', enabled: true },
    { id: 3, title: 'Collabs & Contact', url: '/contact', enabled: true },
  ],
  theme: {
    primaryColor: '#5F00B8',
    accentColor: '#C485FF',
    backgroundColor: '#0A0A0A',
    cardColor: '#1F1F1F',
    textColor: '#FFFFFF',
  },
  showProducts: true,
  maxProducts: 6,
};

const STORAGE_KEY = 'jerri_site_settings';

const Customize = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState(defaultSettings);
  const [saveStatus, setSaveStatus] = useState('');
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  // Load settings on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (e) {
        console.error('Error loading settings:', e);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    setSaveStatus('Saved!');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  // Update profile
  const updateProfile = (field, value) => {
    const updated = {
      ...settings,
      profile: { ...settings.profile, [field]: value },
    };
    saveSettings(updated);
  };

  // Update socials
  const updateSocial = (platform, value) => {
    const updated = {
      ...settings,
      socials: { ...settings.socials, [platform]: value },
    };
    saveSettings(updated);
  };

  // Update quick links
  const updateQuickLink = (id, field, value) => {
    const updated = {
      ...settings,
      quickLinks: settings.quickLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    };
    saveSettings(updated);
  };

  // Add quick link
  const addQuickLink = () => {
    if (!newLink.title || !newLink.url) return;
    const updated = {
      ...settings,
      quickLinks: [
        ...settings.quickLinks,
        {
          id: Date.now(),
          title: newLink.title,
          url: newLink.url,
          enabled: true,
        },
      ],
    };
    saveSettings(updated);
    setNewLink({ title: '', url: '' });
  };

  // Remove quick link
  const removeQuickLink = (id) => {
    const updated = {
      ...settings,
      quickLinks: settings.quickLinks.filter(link => link.id !== id),
    };
    saveSettings(updated);
  };

  // Update theme
  const updateTheme = (field, value) => {
    const updated = {
      ...settings,
      theme: { ...settings.theme, [field]: value },
    };
    saveSettings(updated);
  };

  // Update products settings
  const updateProducts = (field, value) => {
    const updated = {
      ...settings,
      [field]: value,
    };
    saveSettings(updated);
  };

  // Open preview
  const openPreview = () => {
    window.open('/links', '_blank');
  };

  // Reset to defaults
  const resetToDefaults = () => {
    if (window.confirm('Reset all settings to defaults? This cannot be undone.')) {
      saveSettings(defaultSettings);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'socials', label: 'Socials', icon: '🔗' },
    { id: 'quicklinks', label: 'Quick Links', icon: '📌' },
    { id: 'products', label: 'Products', icon: '🛍️' },
    { id: 'theme', label: 'Theme', icon: '🎨' },
  ];

  return (
    <div className="customize-page">
      <div className="page-header">
        <div>
          <h1>Customize Links Page</h1>
          <p>Personalize your link-in-bio page</p>
        </div>
        <div className="header-actions">
          {saveStatus && <span className="save-status">{saveStatus}</span>}
          <button className="btn-primary" onClick={openPreview}>
            Preview
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="customize-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="customize-content">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="tab-panel">
            <h2>Profile Settings</h2>
            <p className="panel-description">Customize how you appear on your links page</p>

            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                value={settings.profile.name}
                onChange={(e) => updateProfile('name', e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={settings.profile.bio}
                onChange={(e) => updateProfile('bio', e.target.value)}
                placeholder="A short bio about yourself..."
                rows={3}
              />
              <span className="form-hint">{settings.profile.bio.length}/150 characters</span>
            </div>

            <div className="form-group">
              <label>Profile Photo URL</label>
              <input
                type="url"
                value={settings.profile.photo}
                onChange={(e) => updateProfile('photo', e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
              <span className="form-hint">Leave empty to show your initials</span>
            </div>

            {settings.profile.photo && (
              <div className="photo-preview">
                <img src={settings.profile.photo} alt="Preview" />
              </div>
            )}
          </div>
        )}

        {/* Socials Tab */}
        {activeTab === 'socials' && (
          <div className="tab-panel">
            <h2>Social Links</h2>
            <p className="panel-description">Add your social media profiles</p>

            <div className="social-inputs">
              <div className="form-group">
                <label>
                  <span className="social-label-icon">📘</span> Facebook
                </label>
                <input
                  type="url"
                  value={settings.socials.facebook}
                  onChange={(e) => updateSocial('facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div className="form-group">
                <label>
                  <span className="social-label-icon">📸</span> Instagram
                </label>
                <input
                  type="url"
                  value={settings.socials.instagram}
                  onChange={(e) => updateSocial('instagram', e.target.value)}
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>

              <div className="form-group">
                <label>
                  <span className="social-label-icon">🎵</span> TikTok
                </label>
                <input
                  type="url"
                  value={settings.socials.tiktok}
                  onChange={(e) => updateSocial('tiktok', e.target.value)}
                  placeholder="https://tiktok.com/@yourhandle"
                />
              </div>

              <div className="form-group">
                <label>
                  <span className="social-label-icon">▶️</span> YouTube
                </label>
                <input
                  type="url"
                  value={settings.socials.youtube}
                  onChange={(e) => updateSocial('youtube', e.target.value)}
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>

              <div className="form-group">
                <label>
                  <span className="social-label-icon">📍</span> Pinterest
                </label>
                <input
                  type="url"
                  value={settings.socials.pinterest}
                  onChange={(e) => updateSocial('pinterest', e.target.value)}
                  placeholder="https://pinterest.com/yourprofile"
                />
              </div>

              <div className="form-group">
                <label>
                  <span className="social-label-icon">🐦</span> X (Twitter)
                </label>
                <input
                  type="url"
                  value={settings.socials.twitter}
                  onChange={(e) => updateSocial('twitter', e.target.value)}
                  placeholder="https://x.com/yourhandle"
                />
              </div>
            </div>
          </div>
        )}

        {/* Quick Links Tab */}
        {activeTab === 'quicklinks' && (
          <div className="tab-panel">
            <h2>Quick Links</h2>
            <p className="panel-description">Add custom buttons to your links page</p>

            <div className="quick-links-list">
              {settings.quickLinks.map(link => (
                <div key={link.id} className="quick-link-item">
                  <div className="quick-link-toggle">
                    <input
                      type="checkbox"
                      checked={link.enabled}
                      onChange={(e) => updateQuickLink(link.id, 'enabled', e.target.checked)}
                    />
                  </div>
                  <div className="quick-link-fields">
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => updateQuickLink(link.id, 'title', e.target.value)}
                      placeholder="Button text"
                      className="quick-link-title"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateQuickLink(link.id, 'url', e.target.value)}
                      placeholder="https://..."
                      className="quick-link-url"
                    />
                  </div>
                  <button
                    className="quick-link-remove"
                    onClick={() => removeQuickLink(link.id)}
                    title="Remove link"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="add-link-form">
              <h3>Add New Link</h3>
              <div className="add-link-fields">
                <input
                  type="text"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  placeholder="Button text"
                />
                <input
                  type="url"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  placeholder="URL"
                />
                <button className="btn-primary" onClick={addQuickLink}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="tab-panel">
            <h2>Shop My Favorites</h2>
            <p className="panel-description">Control how products appear on your links page</p>

            <div className="form-group toggle-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={settings.showProducts}
                  onChange={(e) => updateProducts('showProducts', e.target.checked)}
                />
                <span>Show "Shop My Favorites" section</span>
              </label>
              <span className="form-hint">Products are pulled from your Link Tracker</span>
            </div>

            <div className="form-group">
              <label>Maximum products to show</label>
              <select
                value={settings.maxProducts}
                onChange={(e) => updateProducts('maxProducts', parseInt(e.target.value))}
              >
                <option value={3}>3 products</option>
                <option value={6}>6 products</option>
                <option value={9}>9 products</option>
                <option value={12}>12 products</option>
              </select>
              <span className="form-hint">Products are sorted by earnings (highest first)</span>
            </div>

            <div className="info-card">
              <h4>How it works</h4>
              <p>
                Your top-performing affiliate links from the Link Tracker are automatically
                displayed on your links page. To add or manage products, go to the{' '}
                <a href="/dashboard/links">Link Tracker</a>.
              </p>
            </div>
          </div>
        )}

        {/* Theme Tab */}
        {activeTab === 'theme' && (
          <div className="tab-panel">
            <h2>Theme Colors</h2>
            <p className="panel-description">Customize the look of your links page</p>

            <div className="color-inputs">
              <div className="form-group color-group">
                <label>Primary Color</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    value={settings.theme.primaryColor}
                    onChange={(e) => updateTheme('primaryColor', e.target.value)}
                  />
                  <input
                    type="text"
                    value={settings.theme.primaryColor}
                    onChange={(e) => updateTheme('primaryColor', e.target.value)}
                    className="color-text"
                  />
                </div>
              </div>

              <div className="form-group color-group">
                <label>Accent Color</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    value={settings.theme.accentColor}
                    onChange={(e) => updateTheme('accentColor', e.target.value)}
                  />
                  <input
                    type="text"
                    value={settings.theme.accentColor}
                    onChange={(e) => updateTheme('accentColor', e.target.value)}
                    className="color-text"
                  />
                </div>
              </div>

              <div className="form-group color-group">
                <label>Background Color</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    value={settings.theme.backgroundColor}
                    onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                  />
                  <input
                    type="text"
                    value={settings.theme.backgroundColor}
                    onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                    className="color-text"
                  />
                </div>
              </div>

              <div className="form-group color-group">
                <label>Card Color</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    value={settings.theme.cardColor}
                    onChange={(e) => updateTheme('cardColor', e.target.value)}
                  />
                  <input
                    type="text"
                    value={settings.theme.cardColor}
                    onChange={(e) => updateTheme('cardColor', e.target.value)}
                    className="color-text"
                  />
                </div>
              </div>

              <div className="form-group color-group">
                <label>Text Color</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    value={settings.theme.textColor}
                    onChange={(e) => updateTheme('textColor', e.target.value)}
                  />
                  <input
                    type="text"
                    value={settings.theme.textColor}
                    onChange={(e) => updateTheme('textColor', e.target.value)}
                    className="color-text"
                  />
                </div>
              </div>
            </div>

            <div className="theme-presets">
              <h3>Quick Presets</h3>
              <div className="preset-buttons">
                <button
                  className="preset-btn"
                  onClick={() => {
                    updateTheme('primaryColor', '#5F00B8');
                    updateTheme('accentColor', '#C485FF');
                    updateTheme('backgroundColor', '#0A0A0A');
                    updateTheme('cardColor', '#1F1F1F');
                    updateTheme('textColor', '#FFFFFF');
                  }}
                  style={{ background: 'linear-gradient(135deg, #5F00B8, #C485FF)' }}
                >
                  Purple (Default)
                </button>
                <button
                  className="preset-btn"
                  onClick={() => {
                    updateTheme('primaryColor', '#FF6B6B');
                    updateTheme('accentColor', '#FFE66D');
                    updateTheme('backgroundColor', '#1A1A2E');
                    updateTheme('cardColor', '#16213E');
                    updateTheme('textColor', '#FFFFFF');
                  }}
                  style={{ background: 'linear-gradient(135deg, #FF6B6B, #FFE66D)' }}
                >
                  Sunset
                </button>
                <button
                  className="preset-btn"
                  onClick={() => {
                    updateTheme('primaryColor', '#00D9FF');
                    updateTheme('accentColor', '#60E1E0');
                    updateTheme('backgroundColor', '#0D1117');
                    updateTheme('cardColor', '#161B22');
                    updateTheme('textColor', '#FFFFFF');
                  }}
                  style={{ background: 'linear-gradient(135deg, #00D9FF, #60E1E0)' }}
                >
                  Ocean
                </button>
                <button
                  className="preset-btn"
                  onClick={() => {
                    updateTheme('primaryColor', '#E91E63');
                    updateTheme('accentColor', '#FF80AB');
                    updateTheme('backgroundColor', '#121212');
                    updateTheme('cardColor', '#1E1E1E');
                    updateTheme('textColor', '#FFFFFF');
                  }}
                  style={{ background: 'linear-gradient(135deg, #E91E63, #FF80AB)' }}
                >
                  Pink
                </button>
              </div>
            </div>

            <button className="btn-secondary reset-btn" onClick={resetToDefaults}>
              Reset All Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customize;

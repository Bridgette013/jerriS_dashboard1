import React, { useState, useEffect } from 'react';
import './Customize.css';

// Default settings structure (template-ready)
const defaultSiteSettings = {
  profile: {
    name: 'Your Name',
    bio: 'Your bio goes here. Tell your audience who you are and what you do!',
    imageUrl: ''
  },
  socials: {
    facebook: { enabled: false, url: '' },
    youtube: { enabled: false, url: '' },
    instagram: { enabled: false, url: '' },
    tiktok: { enabled: false, url: '' },
    twitter: { enabled: false, url: '' },
    pinterest: { enabled: false, url: '' }
  },
  quickLinks: [
    { id: 1, label: 'My Website', url: '', enabled: true },
    { id: 2, label: 'Subscribe', url: '', enabled: true },
    { id: 3, label: 'Contact Me', url: '', enabled: true }
  ],
  products: {
    showSection: true,
    maxDisplay: 6,
    title: 'Shop My Favorites'
  },
  theme: {
    primaryColor: '#5F00B8',
    accentColor: '#60E1E0',
    style: 'modern'
  }
};

const socialPlatforms = [
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourpage' },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@yourchannel' },
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourhandle' },
  { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@yourhandle' },
  { key: 'twitter', label: 'X (Twitter)', placeholder: 'https://x.com/yourhandle' },
  { key: 'pinterest', label: 'Pinterest', placeholder: 'https://pinterest.com/yourprofile' }
];

const themePresets = [
  { key: 'modern', label: 'Modern', description: 'Clean and rounded corners' },
  { key: 'minimal', label: 'Minimal', description: 'Simple and understated' },
  { key: 'bold', label: 'Bold', description: 'Gradient buttons and effects' }
];

const colorPresets = [
  { primary: '#5F00B8', accent: '#60E1E0', label: 'Purple & Aqua' },
  { primary: '#E91E63', accent: '#FFC107', label: 'Pink & Gold' },
  { primary: '#2196F3', accent: '#4CAF50', label: 'Blue & Green' },
  { primary: '#FF5722', accent: '#795548', label: 'Orange & Brown' },
  { primary: '#9C27B0', accent: '#FF4081', label: 'Purple & Pink' },
  { primary: '#00BCD4', accent: '#FFEB3B', label: 'Cyan & Yellow' }
];

const Customize = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState(defaultSiteSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Load settings on mount
  useEffect(() => {
    const saved = localStorage.getItem('jerri_site_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSiteSettings, ...parsed });
      } catch (e) {
        console.error('Error loading settings:', e);
      }
    }
  }, []);

  // Update helper
  const updateSettings = (path, value) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current = newSettings;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
    setHasChanges(true);
    setSaveMessage('');
  };

  // Update social platform
  const updateSocial = (platform, field, value) => {
    setSettings(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: {
          ...prev.socials[platform],
          [field]: value
        }
      }
    }));
    setHasChanges(true);
    setSaveMessage('');
  };

  // Quick Links management
  const addQuickLink = () => {
    const newId = Math.max(0, ...settings.quickLinks.map(l => l.id)) + 1;
    setSettings(prev => ({
      ...prev,
      quickLinks: [...prev.quickLinks, { id: newId, label: 'New Link', url: '', enabled: true }]
    }));
    setHasChanges(true);
    setSaveMessage('');
  };

  const updateQuickLink = (id, field, value) => {
    setSettings(prev => ({
      ...prev,
      quickLinks: prev.quickLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
    setHasChanges(true);
    setSaveMessage('');
  };

  const removeQuickLink = (id) => {
    setSettings(prev => ({
      ...prev,
      quickLinks: prev.quickLinks.filter(link => link.id !== id)
    }));
    setHasChanges(true);
    setSaveMessage('');
  };

  const moveQuickLink = (id, direction) => {
    setSettings(prev => {
      const links = [...prev.quickLinks];
      const index = links.findIndex(l => l.id === id);
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === links.length - 1)
      ) {
        return prev;
      }
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [links[index], links[newIndex]] = [links[newIndex], links[index]];
      return { ...prev, quickLinks: links };
    });
    setHasChanges(true);
    setSaveMessage('');
  };

  // Save settings
  const handleSave = () => {
    localStorage.setItem('jerri_site_settings', JSON.stringify(settings));
    setHasChanges(false);
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // Preview
  const handlePreview = () => {
    // Save first to ensure preview is up to date
    localStorage.setItem('jerri_site_settings', JSON.stringify(settings));
    setHasChanges(false);
    window.open('/links', '_blank');
  };

  const tabs = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'socials', label: 'Socials', icon: '🔗' },
    { key: 'quicklinks', label: 'Quick Links', icon: '🔘' },
    { key: 'products', label: 'Products', icon: '🛍️' },
    { key: 'theme', label: 'Theme', icon: '🎨' }
  ];

  return (
    <div className="customize-page">
      <div className="page-header">
        <div>
          <h1>Customize Your Link Page</h1>
          <p>Design your public link-in-bio page</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handlePreview}>
            👁️ Preview
          </button>
          <button
            className={`btn-primary ${!hasChanges ? 'disabled' : ''}`}
            onClick={handleSave}
            disabled={!hasChanges}
          >
            💾 Save Changes
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="save-message">
          ✓ {saveMessage}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="customize-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
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
            <h2>Profile Information</h2>
            <p className="tab-description">This appears at the top of your link page</p>

            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                value={settings.profile.name}
                onChange={(e) => updateSettings('profile.name', e.target.value)}
                placeholder="Your Name"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={settings.profile.bio}
                onChange={(e) => updateSettings('profile.bio', e.target.value)}
                placeholder="Tell your audience about yourself..."
                rows={3}
              />
              <span className="form-hint">{settings.profile.bio.length}/150 characters recommended</span>
            </div>

            <div className="form-group">
              <label>Profile Image URL</label>
              <input
                type="url"
                value={settings.profile.imageUrl}
                onChange={(e) => updateSettings('profile.imageUrl', e.target.value)}
                placeholder="https://example.com/your-photo.jpg"
              />
              <span className="form-hint">Use a square image for best results (at least 200x200px)</span>
            </div>

            {settings.profile.imageUrl && (
              <div className="image-preview">
                <label>Preview</label>
                <img src={settings.profile.imageUrl} alt="Profile preview" />
              </div>
            )}
          </div>
        )}

        {/* Socials Tab */}
        {activeTab === 'socials' && (
          <div className="tab-panel">
            <h2>Social Links</h2>
            <p className="tab-description">Toggle and add URLs for your social profiles</p>

            <div className="social-list">
              {socialPlatforms.map(platform => (
                <div key={platform.key} className="social-item">
                  <div className="social-header">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.socials[platform.key]?.enabled || false}
                        onChange={(e) => updateSocial(platform.key, 'enabled', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                      <span className="social-name">{platform.label}</span>
                    </label>
                  </div>
                  {settings.socials[platform.key]?.enabled && (
                    <input
                      type="url"
                      value={settings.socials[platform.key]?.url || ''}
                      onChange={(e) => updateSocial(platform.key, 'url', e.target.value)}
                      placeholder={platform.placeholder}
                      className="social-url-input"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links Tab */}
        {activeTab === 'quicklinks' && (
          <div className="tab-panel">
            <h2>Quick Links</h2>
            <p className="tab-description">Add custom buttons to your link page</p>

            <div className="quick-links-list">
              {settings.quickLinks.map((link, index) => (
                <div key={link.id} className="quick-link-item">
                  <div className="link-order-controls">
                    <button
                      className="order-btn"
                      onClick={() => moveQuickLink(link.id, 'up')}
                      disabled={index === 0}
                    >
                      ↑
                    </button>
                    <button
                      className="order-btn"
                      onClick={() => moveQuickLink(link.id, 'down')}
                      disabled={index === settings.quickLinks.length - 1}
                    >
                      ↓
                    </button>
                  </div>
                  <div className="link-fields">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => updateQuickLink(link.id, 'label', e.target.value)}
                      placeholder="Button Label"
                      className="link-label-input"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateQuickLink(link.id, 'url', e.target.value)}
                      placeholder="https://..."
                      className="link-url-input"
                    />
                  </div>
                  <div className="link-controls">
                    <label className="toggle-label small">
                      <input
                        type="checkbox"
                        checked={link.enabled}
                        onChange={(e) => updateQuickLink(link.id, 'enabled', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                    <button
                      className="remove-btn"
                      onClick={() => removeQuickLink(link.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-secondary add-link-btn" onClick={addQuickLink}>
              + Add Link
            </button>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="tab-panel">
            <h2>Shop My Favorites Section</h2>
            <p className="tab-description">Display products from your Link Tracker</p>

            <div className="form-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={settings.products.showSection}
                  onChange={(e) => updateSettings('products.showSection', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                <span>Show products section on link page</span>
              </label>
            </div>

            {settings.products.showSection && (
              <>
                <div className="form-group">
                  <label>Section Title</label>
                  <input
                    type="text"
                    value={settings.products.title}
                    onChange={(e) => updateSettings('products.title', e.target.value)}
                    placeholder="Shop My Favorites"
                  />
                </div>

                <div className="form-group">
                  <label>Max Products to Display</label>
                  <select
                    value={settings.products.maxDisplay}
                    onChange={(e) => updateSettings('products.maxDisplay', parseInt(e.target.value))}
                  >
                    <option value={3}>3 products</option>
                    <option value={4}>4 products</option>
                    <option value={6}>6 products</option>
                    <option value={8}>8 products</option>
                    <option value={12}>12 products</option>
                  </select>
                  <span className="form-hint">Products are pulled from your Link Tracker, sorted by earnings</span>
                </div>
              </>
            )}

            <div className="info-box">
              <span className="info-icon">💡</span>
              <div>
                <strong>Add more products</strong>
                <p>Go to Link Tracker to add affiliate links that will appear here.</p>
              </div>
            </div>
          </div>
        )}

        {/* Theme Tab */}
        {activeTab === 'theme' && (
          <div className="tab-panel">
            <h2>Theme & Colors</h2>
            <p className="tab-description">Customize the look of your link page</p>

            <div className="form-group">
              <label>Style Preset</label>
              <div className="style-presets">
                {themePresets.map(preset => (
                  <button
                    key={preset.key}
                    className={`preset-btn ${settings.theme.style === preset.key ? 'active' : ''}`}
                    onClick={() => updateSettings('theme.style', preset.key)}
                  >
                    <span className="preset-label">{preset.label}</span>
                    <span className="preset-description">{preset.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Color Preset</label>
              <div className="color-presets">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    className={`color-preset-btn ${
                      settings.theme.primaryColor === preset.primary &&
                      settings.theme.accentColor === preset.accent
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => {
                      updateSettings('theme.primaryColor', preset.primary);
                      updateSettings('theme.accentColor', preset.accent);
                    }}
                    title={preset.label}
                  >
                    <span
                      className="color-swatch primary"
                      style={{ background: preset.primary }}
                    />
                    <span
                      className="color-swatch accent"
                      style={{ background: preset.accent }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Primary Color</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    value={settings.theme.primaryColor}
                    onChange={(e) => updateSettings('theme.primaryColor', e.target.value)}
                    className="color-picker"
                  />
                  <input
                    type="text"
                    value={settings.theme.primaryColor}
                    onChange={(e) => updateSettings('theme.primaryColor', e.target.value)}
                    className="color-text"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Accent Color</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    value={settings.theme.accentColor}
                    onChange={(e) => updateSettings('theme.accentColor', e.target.value)}
                    className="color-picker"
                  />
                  <input
                    type="text"
                    value={settings.theme.accentColor}
                    onChange={(e) => updateSettings('theme.accentColor', e.target.value)}
                    className="color-text"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customize;

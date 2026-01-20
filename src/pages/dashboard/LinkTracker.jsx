import React, { useState } from 'react';
import { useCloudSync, useSyncedState } from '../../hooks/useCloudSync';
import './LinkTracker.css';

// Default data for new users
const defaultLinks = [
  {
    id: 1,
    product: 'Kitchen organizer bins (set of 6)',
    category: 'Home & Kitchen',
    amazonUrl: 'https://amzn.to/abc123',
    clicks: 342,
    conversions: 18,
    conversionRate: 5.3,
    earnings: 43.20,
    lastUsed: '2026-01-15',
    timesUsed: 8,
    avgEarningsPerUse: 5.40,
    notes: 'Best performer - use in morning routine content'
  },
  {
    id: 2,
    product: 'Kids lunch containers (4-pack)',
    category: 'Kitchen',
    amazonUrl: 'https://amzn.to/def456',
    clicks: 287,
    conversions: 12,
    conversionRate: 4.2,
    earnings: 28.80,
    lastUsed: '2026-01-12',
    timesUsed: 5,
    avgEarningsPerUse: 5.76,
    notes: 'Good for back-to-school content'
  },
  {
    id: 3,
    product: 'Cable management kit',
    category: 'Electronics',
    amazonUrl: 'https://amzn.to/ghi789',
    clicks: 198,
    conversions: 8,
    conversionRate: 4.0,
    earnings: 19.20,
    lastUsed: '2026-01-10',
    timesUsed: 3,
    avgEarningsPerUse: 6.40,
    notes: 'Surprisingly good - try in office setup content'
  },
  {
    id: 4,
    product: 'Bathroom caddy organizer',
    category: 'Home & Kitchen',
    amazonUrl: 'https://amzn.to/jkl012',
    clicks: 156,
    conversions: 5,
    conversionRate: 3.2,
    earnings: 12.00,
    lastUsed: '2026-01-08',
    timesUsed: 4,
    avgEarningsPerUse: 3.00,
    notes: ''
  },
  {
    id: 5,
    product: 'Reusable storage bags',
    category: 'Kitchen',
    amazonUrl: 'https://amzn.to/mno345',
    clicks: 134,
    conversions: 7,
    conversionRate: 5.2,
    earnings: 16.80,
    lastUsed: '2026-01-05',
    timesUsed: 6,
    avgEarningsPerUse: 2.80,
    notes: 'Eco-angle works well'
  },
  {
    id: 6,
    product: 'LED night light (motion sensor)',
    category: 'Home',
    amazonUrl: 'https://amzn.to/pqr678',
    clicks: 89,
    conversions: 4,
    conversionRate: 4.5,
    earnings: 9.60,
    lastUsed: '2026-01-03',
    timesUsed: 2,
    avgEarningsPerUse: 4.80,
    notes: 'Good for bedtime routine'
  },
];

const categories = ['All', 'Home & Kitchen', 'Kitchen', 'Electronics', 'Home', 'Kids', 'Organization'];

const LinkTracker = () => {
  // Cloud sync
  const cloudSync = useCloudSync();

  // Synced links data
  const [links, setLinks] = useSyncedState('links', defaultLinks, cloudSync);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('earnings');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  // Calculate totals
  const totals = links.reduce((acc, link) => ({
    clicks: acc.clicks + link.clicks,
    conversions: acc.conversions + link.conversions,
    earnings: acc.earnings + link.earnings
  }), { clicks: 0, conversions: 0, earnings: 0 });

  // Filter and sort links
  const filteredLinks = links
    .filter(link => selectedCategory === 'All' || link.category === selectedCategory)
    .sort((a, b) => {
      switch(sortBy) {
        case 'earnings': return b.earnings - a.earnings;
        case 'clicks': return b.clicks - a.clicks;
        case 'conversions': return b.conversions - a.conversions;
        case 'conversionRate': return b.conversionRate - a.conversionRate;
        case 'recent': return new Date(b.lastUsed) - new Date(a.lastUsed);
        default: return 0;
      }
    });

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    // Would show a toast notification in production
  };

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="link-tracker-page">
      <div className="page-header">
        <div>
          <h1>Affiliate Link Tracker</h1>
          <p>Manage and track your Amazon affiliate links</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          + Add New Link
        </button>
      </div>

      {/* Stats Summary */}
      <div className="link-stats">
        <div className="link-stat-card">
          <span className="stat-number">{links.length}</span>
          <span className="stat-label">Active Links</span>
        </div>
        <div className="link-stat-card">
          <span className="stat-number">{totals.clicks.toLocaleString()}</span>
          <span className="stat-label">Total Clicks</span>
        </div>
        <div className="link-stat-card">
          <span className="stat-number">{totals.conversions}</span>
          <span className="stat-label">Conversions</span>
        </div>
        <div className="link-stat-card highlight">
          <span className="stat-number">{formatCurrency(totals.earnings)}</span>
          <span className="stat-label">Total Earnings</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="category-filters">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="sort-control">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="earnings">Highest Earnings</option>
            <option value="clicks">Most Clicks</option>
            <option value="conversions">Most Conversions</option>
            <option value="conversionRate">Best Conversion Rate</option>
            <option value="recent">Recently Used</option>
          </select>
        </div>
      </div>

      {/* Links Table */}
      <div className="links-table-container">
        <table className="links-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Clicks</th>
              <th>Conv.</th>
              <th>Rate</th>
              <th>Earnings</th>
              <th>Last Used</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLinks.map(link => (
              <tr key={link.id} onClick={() => setSelectedLink(link)}>
                <td className="product-cell">
                  <span className="product-name">{link.product}</span>
                  {link.notes && <span className="product-note">📝</span>}
                </td>
                <td>
                  <span className="category-tag">{link.category}</span>
                </td>
                <td>{link.clicks.toLocaleString()}</td>
                <td>{link.conversions}</td>
                <td>{link.conversionRate}%</td>
                <td className="earnings-cell">{formatCurrency(link.earnings)}</td>
                <td>{formatDate(link.lastUsed)}</td>
                <td className="actions-cell" onClick={e => e.stopPropagation()}>
                  <button 
                    className="action-btn copy"
                    onClick={() => copyLink(link.amazonUrl)}
                    title="Copy link"
                  >
                    📋
                  </button>
                  <a 
                    href={link.amazonUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn external"
                    title="Open on Amazon"
                  >
                    ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tips Section */}
      <div className="tips-section">
        <h3>💡 Quick Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">🎯</span>
            <div>
              <strong>Top Performer</strong>
              <p>Your kitchen organizer bins have the best ROI. Feature them more!</p>
            </div>
          </div>
          <div className="tip-card">
            <span className="tip-icon">📈</span>
            <div>
              <strong>Conversion Opportunity</strong>
              <p>Reusable storage bags have high conversion rate but low usage. Try featuring them.</p>
            </div>
          </div>
          <div className="tip-card">
            <span className="tip-icon">⏰</span>
            <div>
              <strong>Unused Links</strong>
              <p>3 links haven't been used in 2+ weeks. Consider featuring or archiving.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Link Detail Modal */}
      {selectedLink && (
        <div className="modal-overlay" onClick={() => setSelectedLink(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedLink.product}</h2>
              <button className="modal-close" onClick={() => setSelectedLink(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="link-detail-stats">
                <div className="detail-stat">
                  <span className="detail-value">{selectedLink.clicks}</span>
                  <span className="detail-label">Clicks</span>
                </div>
                <div className="detail-stat">
                  <span className="detail-value">{selectedLink.conversions}</span>
                  <span className="detail-label">Conversions</span>
                </div>
                <div className="detail-stat">
                  <span className="detail-value">{selectedLink.conversionRate}%</span>
                  <span className="detail-label">Conv. Rate</span>
                </div>
                <div className="detail-stat highlight">
                  <span className="detail-value">{formatCurrency(selectedLink.earnings)}</span>
                  <span className="detail-label">Total Earned</span>
                </div>
              </div>

              <div className="form-group">
                <label>Amazon Link</label>
                <div className="link-input-group">
                  <input type="text" value={selectedLink.amazonUrl} readOnly />
                  <button className="copy-btn" onClick={() => copyLink(selectedLink.amazonUrl)}>Copy</button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select value={selectedLink.category}>
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Times Used</label>
                  <input type="text" value={selectedLink.timesUsed} readOnly />
                </div>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea 
                  value={selectedLink.notes} 
                  placeholder="Add notes about when/how to use this link..."
                  rows={3}
                />
              </div>

              <div className="usage-history">
                <h4>Performance Insights</h4>
                <p>Average earnings per use: <strong>{formatCurrency(selectedLink.avgEarningsPerUse)}</strong></p>
                <p>Last used: <strong>{formatDate(selectedLink.lastUsed)}</strong></p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-danger">Archive Link</button>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Link Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Affiliate Link</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" placeholder="e.g., Kitchen organizer bins (set of 6)" />
              </div>
              <div className="form-group">
                <label>Amazon Affiliate Link</label>
                <input type="url" placeholder="https://amzn.to/..." />
                <span className="form-hint">Use your Amazon Associates shortened link</span>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select>
                  <option value="">Select category...</option>
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Notes (optional)</label>
                <textarea placeholder="Best for morning routine content, etc." rows={2} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn-primary">Add Link</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkTracker;

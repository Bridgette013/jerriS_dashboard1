import React, { useState, useEffect } from 'react';
import './Hub.css';

const defaultCategories = [
  {
    id: 'money',
    name: '💰 Money Stuff',
    items: [
      { id: 1, platform: 'Amazon Associates', description: 'Check earnings, get affiliate links', url: 'https://affiliate-program.amazon.com/', email: '', password: '', notes: '' },
      { id: 2, platform: 'Facebook Creator Studio', description: 'Reels bonus, insights, payouts', url: 'https://business.facebook.com/creatorstudio', email: '', password: '', notes: '' },
      { id: 3, platform: 'Beacons', description: 'Link in bio page', url: 'https://beacons.ai/login', email: '', password: '', notes: '' },
    ]
  },
  {
    id: 'social',
    name: '📱 Social Accounts',
    items: [
      { id: 4, platform: 'Facebook Page', description: 'JerrisWorld page', url: 'https://www.facebook.com/', email: '', password: '', notes: '' },
      { id: 5, platform: 'Instagram', description: '', url: 'https://www.instagram.com/', email: '', password: '', notes: '' },
      { id: 6, platform: 'TikTok', description: '', url: 'https://www.tiktok.com/', email: '', password: '', notes: '' },
    ]
  },
  {
    id: 'website',
    name: '🔧 Website & Email',
    items: [
      { id: 7, platform: 'Neo Email', description: 'admin@jerrisworld.com', url: 'https://mail.neo.space/', email: '', password: '', notes: '' },
      { id: 8, platform: 'Domain', description: 'jerrisworld.com', url: '', email: '', password: '', notes: 'Where is your domain registered?' },
    ]
  },
  {
    id: 'other',
    name: '📁 Other',
    items: []
  }
];

const Hub = () => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('jerri_hub');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('jerri_hub', JSON.stringify(categories));
  }, [categories]);

  // CRUD operations
  const addItem = (categoryId, newItem) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: [...cat.items, { ...newItem, id: Date.now() }]
        };
      }
      return cat;
    }));
  };

  const updateItem = (categoryId, itemId, updates) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: cat.items.map(item => 
            item.id === itemId ? { ...item, ...updates } : item
          )
        };
      }
      return cat;
    }));
  };

  const deleteItem = (categoryId, itemId) => {
    if (window.confirm('Delete this login?')) {
      setCategories(categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: cat.items.filter(item => item.id !== itemId)
          };
        }
        return cat;
      }));
      setEditingItem(null);
    }
  };

  const moveItem = (fromCategoryId, toCategoryId, itemId) => {
    let movedItem = null;
    
    const newCategories = categories.map(cat => {
      if (cat.id === fromCategoryId) {
        movedItem = cat.items.find(item => item.id === itemId);
        return {
          ...cat,
          items: cat.items.filter(item => item.id !== itemId)
        };
      }
      return cat;
    });

    if (movedItem) {
      setCategories(newCategories.map(cat => {
        if (cat.id === toCategoryId) {
          return {
            ...cat,
            items: [...cat.items, movedItem]
          };
        }
        return cat;
      }));
    }
  };

  const togglePassword = (itemId) => {
    setShowPasswords(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const copyToClipboard = (text, itemId, field) => {
    navigator.clipboard.writeText(text);
    setCopiedId(`${itemId}-${field}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="hub-page">
      <div className="page-header">
        <div>
          <h1>Hub</h1>
          <p>All your logins and quick links in one place</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Login
        </button>
      </div>

      <div className="hub-grid">
        {categories.map(category => (
          <div key={category.id} className="hub-category">
            <h2>{category.name}</h2>
            
            {category.items.length === 0 ? (
              <p className="empty-hint">No items yet</p>
            ) : (
              <div className="hub-items">
                {category.items.map(item => (
                  <div key={item.id} className="hub-item">
                    <div className="hub-item-main">
                      <div className="hub-item-info">
                        <span className="hub-item-platform">{item.platform}</span>
                        {item.description && (
                          <span className="hub-item-description">{item.description}</span>
                        )}
                      </div>
                      <div className="hub-item-actions">
                        {item.url && (
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hub-link-btn"
                            title="Open site"
                          >
                            →
                          </a>
                        )}
                        <button 
                          className="hub-edit-btn"
                          onClick={() => setEditingItem({ ...item, categoryId: category.id })}
                          title="Edit"
                        >
                          ✏️
                        </button>
                      </div>
                    </div>
                    
                    {(item.email || item.password) && (
                      <div className="hub-item-credentials">
                        {item.email && (
                          <div className="credential-row">
                            <span className="credential-label">Login:</span>
                            <span className="credential-value">{item.email}</span>
                            <button 
                              className={`copy-btn-small ${copiedId === `${item.id}-email` ? 'copied' : ''}`}
                              onClick={() => copyToClipboard(item.email, item.id, 'email')}
                            >
                              {copiedId === `${item.id}-email` ? '✓' : '📋'}
                            </button>
                          </div>
                        )}
                        {item.password && (
                          <div className="credential-row">
                            <span className="credential-label">Pass:</span>
                            <span className="credential-value">
                              {showPasswords[item.id] ? item.password : '••••••••'}
                            </span>
                            <button 
                              className="show-btn-small"
                              onClick={() => togglePassword(item.id)}
                            >
                              {showPasswords[item.id] ? '🙈' : '👁️'}
                            </button>
                            <button 
                              className={`copy-btn-small ${copiedId === `${item.id}-password` ? 'copied' : ''}`}
                              onClick={() => copyToClipboard(item.password, item.id, 'password')}
                            >
                              {copiedId === `${item.id}-password` ? '✓' : '📋'}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {item.notes && (
                      <div className="hub-item-notes">
                        📝 {item.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="hub-footer">
        <p>🔒 All logins are stored locally in your browser only. No one else can see them.</p>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <EditItemModal
          item={editingItem}
          categories={categories}
          onSave={(updates) => {
            if (updates.newCategoryId && updates.newCategoryId !== editingItem.categoryId) {
              moveItem(editingItem.categoryId, updates.newCategoryId, editingItem.id);
              delete updates.newCategoryId;
            }
            updateItem(editingItem.categoryId, editingItem.id, updates);
            setEditingItem(null);
          }}
          onDelete={() => deleteItem(editingItem.categoryId, editingItem.id)}
          onClose={() => setEditingItem(null)}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddItemModal
          categories={categories}
          onSave={(categoryId, newItem) => {
            addItem(categoryId, newItem);
            setShowAddModal(false);
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

// Edit Modal
const EditItemModal = ({ item, categories, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState({
    platform: item.platform || '',
    description: item.description || '',
    url: item.url || '',
    email: item.email || '',
    password: item.password || '',
    notes: item.notes || '',
    newCategoryId: item.categoryId,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Login</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Platform / Site Name *</label>
              <input 
                type="text"
                value={form.platform}
                onChange={(e) => setForm({...form, platform: e.target.value})}
                placeholder="e.g., Amazon Associates"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input 
                type="text"
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
                placeholder="What is this for?"
              />
            </div>

            <div className="form-group">
              <label>URL</label>
              <input 
                type="url"
                value={form.url}
                onChange={(e) => setForm({...form, url: e.target.value})}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select 
                value={form.newCategoryId}
                onChange={(e) => setForm({...form, newCategoryId: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <h4 className="form-section-title">🔐 Login Credentials</h4>

            <div className="form-group">
              <label>Email / Username</label>
              <input 
                type="text"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-group">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea 
                value={form.notes}
                onChange={(e) => setForm({...form, notes: e.target.value})}
                placeholder="Any other info..."
                rows={2}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-danger" onClick={onDelete}>Delete</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add Modal
const AddItemModal = ({ categories, onSave, onClose }) => {
  const [form, setForm] = useState({
    platform: '',
    description: '',
    url: '',
    email: '',
    password: '',
    notes: '',
    categoryId: 'other',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.platform.trim()) return;
    const { categoryId, ...itemData } = form;
    onSave(categoryId, itemData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Login</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Platform / Site Name *</label>
              <input 
                type="text"
                value={form.platform}
                onChange={(e) => setForm({...form, platform: e.target.value})}
                placeholder="e.g., Amazon Associates"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select 
                value={form.categoryId}
                onChange={(e) => setForm({...form, categoryId: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <input 
                type="text"
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
                placeholder="What is this for?"
              />
            </div>

            <div className="form-group">
              <label>URL</label>
              <input 
                type="url"
                value={form.url}
                onChange={(e) => setForm({...form, url: e.target.value})}
                placeholder="https://..."
              />
            </div>

            <h4 className="form-section-title">🔐 Login Credentials</h4>

            <div className="form-group">
              <label>Email / Username</label>
              <input 
                type="text"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-group">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea 
                value={form.notes}
                onChange={(e) => setForm({...form, notes: e.target.value})}
                placeholder="Any other info..."
                rows={2}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hub;
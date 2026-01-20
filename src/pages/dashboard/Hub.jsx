import React, { useState, useEffect } from 'react';
import './Hub.css';

const defaultCategories = [
  {
    id: 'money',
    title: '💰 Money Stuff',
    items: []
  },
  {
    id: 'social',
    title: '📱 Social Accounts',
    items: []
  },
  {
    id: 'website',
    title: '🔧 Website & Email',
    items: []
  },
  {
    id: 'other',
    title: '📁 Other',
    items: []
  }
];

const Hub = () => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('jerri_hub');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    localStorage.setItem('jerri_hub', JSON.stringify(categories));
  }, [categories]);

  const togglePassword = (itemId) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const copyToClipboard = (text, fieldId) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

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

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);

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

      {totalItems === 0 ? (
        <div className="empty-state-box">
          <h3>🔐 No logins saved yet</h3>
          <p>Add your important accounts so you always know where to go and how to get in.</p>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            + Add Your First Login
          </button>
        </div>
      ) : (
        <div className="hub-grid">
          {categories.map(category => (
            category.items.length > 0 && (
              <div key={category.id} className="hub-category">
                <h2>{category.title}</h2>
                <div className="hub-items">
                  {category.items.map(item => (
                    <div key={item.id} className="hub-item">
                      <div className="item-row">
                        <div className="item-info">
                          <span className="item-name">{item.name}</span>
                          {item.description && (
                            <span className="item-desc">{item.description}</span>
                          )}
                        </div>
                        <div className="item-actions">
                          {item.url && (
                            <a
                              href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="go-btn"
                            >
                              Go →
                            </a>
                          )}
                          <button
                            className="edit-btn"
                            onClick={() => setEditingItem({ ...item, categoryId: category.id })}
                          >
                            ✏️
                          </button>
                        </div>
                      </div>

                      {(item.login || item.password) && (
                        <div className="credentials">
                          {item.login && (
                            <div className="cred-row">
                              <span className="cred-label">Login:</span>
                              <span className="cred-value">{item.login}</span>
                              <button
                                className={`copy-btn ${copiedField === `${item.id}-login` ? 'copied' : ''}`}
                                onClick={() => copyToClipboard(item.login, `${item.id}-login`)}
                              >
                                {copiedField === `${item.id}-login` ? '✓' : '📋'}
                              </button>
                            </div>
                          )}
                          {item.password && (
                            <div className="cred-row">
                              <span className="cred-label">Password:</span>
                              <span className="cred-value">
                                {visiblePasswords[item.id] ? item.password : '••••••••'}
                              </span>
                              <button
                                className="show-btn"
                                onClick={() => togglePassword(item.id)}
                              >
                                {visiblePasswords[item.id] ? '🙈' : '👁️'}
                              </button>
                              <button
                                className={`copy-btn ${copiedField === `${item.id}-pass` ? 'copied' : ''}`}
                                onClick={() => copyToClipboard(item.password, `${item.id}-pass`)}
                              >
                                {copiedField === `${item.id}-pass` ? '✓' : '📋'}
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {item.notes && (
                        <div className="item-notes">📝 {item.notes}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      <div className="hub-footer">
        <p>🔒 Stored locally in your browser only — no one else can see this.</p>
      </div>

      {showAddModal && (
        <AddModal
          categories={categories}
          onSave={(categoryId, item) => {
            addItem(categoryId, item);
            setShowAddModal(false);
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {editingItem && (
        <EditModal
          item={editingItem}
          categories={categories}
          onSave={(updates) => {
            updateItem(editingItem.categoryId, editingItem.id, updates);
            setEditingItem(null);
          }}
          onDelete={() => deleteItem(editingItem.categoryId, editingItem.id)}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
};

const AddModal = ({ categories, onSave, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    url: '',
    login: '',
    password: '',
    notes: '',
    categoryId: 'money'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const { categoryId, ...itemData } = form;
    onSave(categoryId, itemData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Login</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Amazon Associates"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>What's it for?</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="e.g., Check earnings, get links"
              />
            </div>

            <div className="form-group">
              <label>Website URL</label>
              <input
                type="text"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="e.g., affiliate-program.amazon.com"
              />
            </div>

            <div className="form-divider"><span>Login Info</span></div>

            <div className="form-group">
              <label>Email or Username</label>
              <input
                type="text"
                value={form.login}
                onChange={(e) => setForm({ ...form, login: e.target.value })}
                placeholder="e.g., jerri@email.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Your password"
              />
              <span className="form-hint">Stored locally in your browser only</span>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Any helpful notes..."
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

const EditModal = ({ item, categories, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState({
    name: item.name || '',
    description: item.description || '',
    url: item.url || '',
    login: item.login || '',
    password: item.password || '',
    notes: item.notes || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
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
              <label>Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>What's it for?</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Website URL</label>
              <input
                type="text"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
              />
            </div>

            <div className="form-divider"><span>Login Info</span></div>

            <div className="form-group">
              <label>Email or Username</label>
              <input
                type="text"
                value={form.login}
                onChange={(e) => setForm({ ...form, login: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={2}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-danger" onClick={onDelete}>Delete</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hub;
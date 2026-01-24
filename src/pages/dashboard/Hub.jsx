import React, { useState, useEffect } from 'react';
import './Hub.css';

const defaultCategories = [
  { id: 'money', name: '💰 Money Stuff', items: [] },
  { id: 'social', name: '📱 Social Accounts', items: [] },
  { id: 'website', name: '🌐 Website & Email', items: [] },
  { id: 'other', name: '📁 Other', items: [] }
];

const Hub = () => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('jerri_hub');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    localStorage.setItem('jerri_hub', JSON.stringify(categories));
  }, [categories]);

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
          <p>Quick links to all your accounts — your browser's password manager handles the rest</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Account
        </button>
      </div>

      {totalItems === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔗</span>
          <h3>No accounts saved yet</h3>
          <p>Add your first account to get quick access to all your platforms</p>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            + Add Your First Account
          </button>
        </div>
      ) : (
        <div className="hub-categories">
          {categories.map(category => (
            category.items.length > 0 && (
              <div key={category.id} className="hub-category">
                <h2 className="category-title">{category.name}</h2>
                <div className="hub-items">
                  {category.items.map(item => (
                    <div key={item.id} className="hub-card">
                      <div className="hub-card-header">
                        <div className="hub-card-title">
                          <h3>{item.name}</h3>
                          {item.description && <p>{item.description}</p>}
                        </div>
                        <button 
                          className="btn-edit"
                          onClick={() => setEditingItem({ ...item, categoryId: category.id })}
                        >
                          ✏️
                        </button>
                      </div>
                      
                      <div className="hub-card-body">
                        {item.username && (
                          <div className="hub-field">
                            <span className="field-label">Username/Email</span>
                            <div className="field-value-row">
                              <span className="field-value">{item.username}</span>
                              <button 
                                className={`btn-copy ${copiedField === `user-${item.id}` ? 'copied' : ''}`}
                                onClick={() => copyToClipboard(item.username, `user-${item.id}`)}
                              >
                                {copiedField === `user-${item.id}` ? '✓' : '📋'}
                              </button>
                            </div>
                          </div>
                        )}
                        
                        {item.notes && (
                          <div className="hub-field">
                            <span className="field-label">Notes</span>
                            <span className="field-value notes">{item.notes}</span>
                          </div>
                        )}
                      </div>

                      {item.url && (
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-launch"
                        >
                          Launch →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {showAddModal && (
        <AddModal 
          categories={categories}
          onClose={() => setShowAddModal(false)}
          onAdd={addItem}
        />
      )}

      {editingItem && (
        <EditModal 
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={(updates) => {
            updateItem(editingItem.categoryId, editingItem.id, updates);
            setEditingItem(null);
          }}
          onDelete={() => deleteItem(editingItem.categoryId, editingItem.id)}
        />
      )}
    </div>
  );
};

const AddModal = ({ categories, onClose, onAdd }) => {
  const [form, setForm] = useState({
    categoryId: 'money',
    name: '',
    description: '',
    url: '',
    username: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    
    const { categoryId, ...itemData } = form;
    onAdd(categoryId, itemData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Account</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
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
              <label>Account Name *</label>
              <input 
                type="text"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
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
                placeholder="e.g., Affiliate earnings"
              />
            </div>

            <div className="form-group">
              <label>Login URL</label>
              <input 
                type="url"
                value={form.url}
                onChange={(e) => setForm({...form, url: e.target.value})}
                placeholder="https://affiliate-program.amazon.com"
              />
            </div>

            <div className="form-group">
              <label>Username / Email</label>
              <input 
                type="text"
                value={form.username}
                onChange={(e) => setForm({...form, username: e.target.value})}
                placeholder="For your reference only"
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea 
                value={form.notes}
                onChange={(e) => setForm({...form, notes: e.target.value})}
                rows={2}
                placeholder="Any extra info..."
              />
            </div>

            <div className="security-note">
              <span>🔒</span>
              <p>Passwords are handled by your browser's password manager — we don't store them here for your security.</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditModal = ({ item, onClose, onSave, onDelete }) => {
  const [form, setForm] = useState({
    name: item.name || '',
    description: item.description || '',
    url: item.url || '',
    username: item.username || '',
    notes: item.notes || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Account</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Account Name *</label>
              <input 
                type="text"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input 
                type="text"
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Login URL</label>
              <input 
                type="url"
                value={form.url}
                onChange={(e) => setForm({...form, url: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Username / Email</label>
              <input 
                type="text"
                value={form.username}
                onChange={(e) => setForm({...form, username: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea 
                value={form.notes}
                onChange={(e) => setForm({...form, notes: e.target.value})}
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

export default Hub;

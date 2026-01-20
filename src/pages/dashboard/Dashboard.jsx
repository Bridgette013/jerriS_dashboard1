import React, { useState, useEffect } from 'react';
import { useCloudSync, useSyncedState } from '../../hooks/useCloudSync';
import './Dashboard.css';

const Dashboard = () => {
  // Cloud sync
  const cloudSync = useCloudSync();
  const { syncStatus, lastSynced } = cloudSync;

  // Today's Focus (synced)
  const [focus, setFocus, focusLoading] = useSyncedState('focus', '', cloudSync);

  // To-Do List (synced)
  const [todos, setTodos, todosLoading] = useSyncedState('todos', [], cloudSync);
  const [newTodo, setNewTodo] = useState('');

  // Quick Notes (synced)
  const [notes, setNotes, notesLoading] = useSyncedState('notes', '', cloudSync);

  // Quick Stats (synced)
  const [stats, setStats, statsLoading] = useSyncedState('stats', {
    followers: '',
    monthlyEarnings: '',
    pendingPayout: ''
  }, cloudSync);
  const [editingStats, setEditingStats] = useState(false);

  // Calendar data (synced - read from cloud)
  const [upcoming, setUpcoming] = useState([]);

  // Load upcoming content from calendar (from cloud data)
  useEffect(() => {
    const calendarData = cloudSync.cloudData?.calendar || [];
    // Also check localStorage as fallback
    if (calendarData.length === 0) {
      const localData = localStorage.getItem('jerri_calendar');
      if (localData) {
        try {
          const items = JSON.parse(localData);
          processUpcoming(items);
          return;
        } catch (e) {}
      }
    }
    processUpcoming(calendarData);
  }, [cloudSync.cloudData]);

  const processUpcoming = (items) => {
    if (!Array.isArray(items)) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const upcomingItems = items
      .filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= today && itemDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);

    setUpcoming(upcomingItems);
  };

  // To-Do functions
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.done));
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const typeIcons = {
    reel: '🎬',
    story: '📱',
    post: '📷',
    live: '🔴'
  };

  const completedCount = todos.filter(t => t.done).length;

  const isLoading = focusLoading || todosLoading || notesLoading || statsLoading;

  return (
    <div className="dashboard-today">
      <div className="today-header">
        <div>
          <h1>Today</h1>
          <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="sync-indicator">
          {syncStatus === 'syncing' && <span className="sync-status syncing">Syncing...</span>}
          {syncStatus === 'success' && lastSynced && (
            <span className="sync-status success">
              Synced {lastSynced.toLocaleTimeString()}
            </span>
          )}
          {syncStatus === 'error' && <span className="sync-status error">Sync error</span>}
        </div>
      </div>

      <div className="today-grid">
        {/* Today's Focus */}
        <div className="today-card focus-card">
          <h2>🎯 Today's Focus</h2>
          <input
            type="text"
            className="focus-input"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="What's the ONE thing you need to do today?"
          />
        </div>

        {/* Quick Stats */}
        <div className="today-card stats-card">
          <div className="card-header">
            <h2>📊 Quick Stats</h2>
            <button 
              className="edit-btn-small"
              onClick={() => setEditingStats(!editingStats)}
            >
              {editingStats ? '✓ Done' : '✏️ Edit'}
            </button>
          </div>
          
          {editingStats ? (
            <div className="stats-edit">
              <div className="stat-input-group">
                <label>Followers</label>
                <input
                  type="text"
                  value={stats.followers}
                  onChange={(e) => setStats({ ...stats, followers: e.target.value })}
                  placeholder="e.g., 125K"
                />
              </div>
              <div className="stat-input-group">
                <label>This Month</label>
                <input
                  type="text"
                  value={stats.monthlyEarnings}
                  onChange={(e) => setStats({ ...stats, monthlyEarnings: e.target.value })}
                  placeholder="e.g., $847"
                />
              </div>
              <div className="stat-input-group">
                <label>Pending</label>
                <input
                  type="text"
                  value={stats.pendingPayout}
                  onChange={(e) => setStats({ ...stats, pendingPayout: e.target.value })}
                  placeholder="e.g., $234"
                />
              </div>
            </div>
          ) : (
            <div className="stats-display">
              <div className="stat-item">
                <span className="stat-value">{stats.followers || '—'}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.monthlyEarnings || '—'}</span>
                <span className="stat-label">This Month</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.pendingPayout || '—'}</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>
          )}
        </div>

        {/* To-Do List */}
        <div className="today-card todo-card">
          <div className="card-header">
            <h2>✅ To-Do</h2>
            {completedCount > 0 && (
              <button className="clear-btn" onClick={clearCompleted}>
                Clear done ({completedCount})
              </button>
            )}
          </div>

          <form onSubmit={addTodo} className="todo-form">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a task..."
              className="todo-input"
            />
            <button type="submit" className="add-btn">+</button>
          </form>

          <ul className="todo-list">
            {todos.length === 0 ? (
              <li className="todo-empty">No tasks yet. Add one above!</li>
            ) : (
              todos.map(todo => (
                <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
                  <button 
                    className="todo-check"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.done ? '✓' : '○'}
                  </button>
                  <span className="todo-text">{todo.text}</span>
                  <button 
                    className="todo-delete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    ×
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Up Next */}
        <div className="today-card upcoming-card">
          <h2>📅 Up Next</h2>
          {upcoming.length === 0 ? (
            <p className="empty-message">Nothing scheduled. Check the Calendar to plan content!</p>
          ) : (
            <ul className="upcoming-list">
              {upcoming.map(item => (
                <li key={item.id} className="upcoming-item">
                  <span className="upcoming-icon">{typeIcons[item.type] || '📷'}</span>
                  <div className="upcoming-info">
                    <span className="upcoming-title">{item.title}</span>
                    <span className="upcoming-date">{formatDate(item.date)}</span>
                  </div>
                  {item.hasAffiliate && <span className="affiliate-badge">💰</span>}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick Notes */}
        <div className="today-card notes-card">
          <h2>📝 Quick Notes</h2>
          <textarea
            className="notes-textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Jot down ideas, reminders, anything..."
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
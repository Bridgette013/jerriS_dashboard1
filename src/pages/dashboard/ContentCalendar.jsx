import React, { useState } from 'react';
import './ContentCalendar.css';

// Mock data - wire up to real data source later
const initialContent = [
  { id: 1, date: '2026-01-19', type: 'reel', status: 'scheduled', title: 'Morning routine hack', description: 'Show the 3-item morning basket system', hasAffiliate: true, affiliateProduct: 'Bathroom organizer bins', platform: 'facebook' },
  { id: 2, date: '2026-01-20', type: 'reel', status: 'idea', title: 'Kids lunch prep', description: 'Batch prep lunches for the week', hasAffiliate: true, affiliateProduct: 'Lunch containers set', platform: 'facebook' },
  { id: 3, date: '2026-01-21', type: 'reel', status: 'idea', title: 'Amazon haul - kitchen', description: 'Unbox and review kitchen organization finds', hasAffiliate: true, affiliateProduct: 'Multiple products', platform: 'facebook' },
  { id: 4, date: '2026-01-22', type: 'story', status: 'scheduled', title: 'Day in my life', description: 'Casual day following me around', hasAffiliate: false, platform: 'facebook' },
  { id: 5, date: '2026-01-23', type: 'reel', status: 'idea', title: 'Bedtime routine', description: 'How we wind down with 3 kids', hasAffiliate: false, platform: 'facebook' },
  { id: 6, date: '2026-01-24', type: 'reel', status: 'idea', title: 'Weekend reset routine', description: 'Sunday prep for the week', hasAffiliate: true, affiliateProduct: 'Cleaning supplies bundle', platform: 'facebook' },
  { id: 7, date: '2026-01-25', type: 'live', status: 'scheduled', title: 'Q&A with followers', description: 'Monthly live answering questions', hasAffiliate: false, platform: 'facebook' },
];

const ideasBacklog = [
  { id: 101, title: 'Car organization tips', description: 'How I keep the van clean with kids', hasAffiliate: true },
  { id: 102, title: 'Budget grocery haul', description: 'Feeding the family for $150/week', hasAffiliate: false },
  { id: 103, title: 'School morning chaos', description: 'Real unfiltered morning getting kids out', hasAffiliate: false },
  { id: 104, title: 'Amazon favorites under $25', description: 'Roundup of best finds this month', hasAffiliate: true },
  { id: 105, title: 'Meal prep Sunday', description: 'Full week meal prep in 2 hours', hasAffiliate: true },
];

const ContentCalendar = () => {
  const [content, setContent] = useState(initialContent);
  const [ideas, setIdeas] = useState(ideasBacklog);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date('2026-01-19'));

  const typeOptions = [
    { value: 'reel', label: '🎬 Reel', color: '#E91E63' },
    { value: 'story', label: '📱 Story', color: '#9C27B0' },
    { value: 'post', label: '📷 Post', color: '#2196F3' },
    { value: 'live', label: '🔴 Live', color: '#F44336' },
  ];

  const statusOptions = [
    { value: 'idea', label: 'Idea', color: '#FFF3CD' },
    { value: 'draft', label: 'Draft', color: '#E2E8F0' },
    { value: 'scheduled', label: 'Scheduled', color: '#D4EDDA' },
    { value: 'posted', label: 'Posted', color: '#D1ECF1' },
  ];

  // Get days of current week
  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeekStart);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getContentForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return content.filter(item => item.date === dateStr);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentWeekStart(newDate);
  };

  const moveIdeaToCalendar = (idea, date) => {
    const newContent = {
      ...idea,
      id: Date.now(),
      date: date.toISOString().split('T')[0],
      type: 'reel',
      status: 'idea',
      platform: 'facebook'
    };
    setContent([...content, newContent]);
    setIdeas(ideas.filter(i => i.id !== idea.id));
  };

  const updateContentStatus = (itemId, newStatus) => {
    setContent(content.map(item => 
      item.id === itemId ? { ...item, status: newStatus } : item
    ));
  };

  return (
    <div className="content-calendar-page">
      <div className="page-header">
        <div>
          <h1>Content Calendar</h1>
          <p>Plan, schedule, and track your content</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          + New Content
        </button>
      </div>

      <div className="calendar-layout">
        {/* Week View */}
        <div className="week-view">
          <div className="week-nav">
            <button onClick={() => navigateWeek(-1)}>← Previous</button>
            <span className="week-label">
              {formatDate(currentWeekStart)} - {formatDate(getWeekDays()[6])}
            </span>
            <button onClick={() => navigateWeek(1)}>Next →</button>
          </div>

          <div className="week-grid">
            {getWeekDays().map((day, index) => {
              const dayContent = getContentForDate(day);
              const isToday = day.toDateString() === new Date().toDateString();
              
              return (
                <div key={index} className={`day-column ${isToday ? 'today' : ''}`}>
                  <div className="day-header">
                    <span className="day-name">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className="day-number">{day.getDate()}</span>
                  </div>
                  <div className="day-content">
                    {dayContent.map(item => (
                      <div 
                        key={item.id} 
                        className={`content-card status-${item.status}`}
                        onClick={() => setSelectedItem(item)}
                      >
                        <span className="content-type">
                          {typeOptions.find(t => t.value === item.type)?.label.split(' ')[0]}
                        </span>
                        <span className="content-title">{item.title}</span>
                        {item.hasAffiliate && <span className="affiliate-tag">$</span>}
                      </div>
                    ))}
                    <button 
                      className="add-to-day"
                      onClick={() => {
                        // Quick add functionality
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ideas Backlog */}
        <div className="ideas-backlog">
          <h3>💡 Ideas Backlog</h3>
          <p className="backlog-hint">Drag ideas to calendar or click to schedule</p>
          <div className="ideas-list">
            {ideas.map(idea => (
              <div 
                key={idea.id} 
                className="idea-card"
                draggable
              >
                <span className="idea-title">{idea.title}</span>
                <span className="idea-description">{idea.description}</span>
                {idea.hasAffiliate && <span className="affiliate-tag">$ Affiliate</span>}
              </div>
            ))}
          </div>
          <button className="btn-secondary add-idea">+ Add Idea</button>
        </div>
      </div>

      {/* Content Detail Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedItem.title}</h2>
              <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Type</label>
                <select value={selectedItem.type}>
                  {typeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <div className="status-buttons">
                  {statusOptions.map(opt => (
                    <button 
                      key={opt.value}
                      className={`status-btn ${selectedItem.status === opt.value ? 'active' : ''}`}
                      style={{ backgroundColor: selectedItem.status === opt.value ? opt.color : 'transparent' }}
                      onClick={() => updateContentStatus(selectedItem.id, opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={selectedItem.date} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={selectedItem.description || ''} rows={3} />
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" checked={selectedItem.hasAffiliate} /> 
                  Has Affiliate Link
                </label>
                {selectedItem.hasAffiliate && (
                  <input 
                    type="text" 
                    placeholder="Product name" 
                    value={selectedItem.affiliateProduct || ''} 
                    className="affiliate-input"
                  />
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-danger">Delete</button>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentCalendar;

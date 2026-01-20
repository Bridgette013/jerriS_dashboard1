import React, { useState } from 'react';
import './Dashboard.css';

// Mock data - replace with real data source later (Airtable, Supabase, JSON, etc.)
const mockData = {
  earnings: {
    facebook: {
      thisMonth: 847.32,
      lastMonth: 612.50,
      pending: 234.00
    },
    amazon: {
      thisMonth: 156.78,
      lastMonth: 98.45,
      clicks: 1247,
      conversions: 43
    }
  },
  contentCalendar: [
    { id: 1, date: '2026-01-19', type: 'reel', status: 'scheduled', title: 'Morning routine hack', hasAffiliate: true },
    { id: 2, date: '2026-01-20', type: 'reel', status: 'idea', title: 'Kids lunch prep', hasAffiliate: true },
    { id: 3, date: '2026-01-21', type: 'reel', status: 'idea', title: 'Amazon haul - kitchen', hasAffiliate: true },
    { id: 4, date: '2026-01-22', type: 'story', status: 'scheduled', title: 'Day in my life', hasAffiliate: false },
    { id: 5, date: '2026-01-23', type: 'reel', status: 'idea', title: 'Bedtime routine', hasAffiliate: false },
  ],
  topContent: [
    { id: 1, title: 'The $12 organizer that changed everything', views: 45200, engagement: 8.2, earnings: 67.50 },
    { id: 2, title: 'Morning chaos but make it aesthetic', views: 38100, engagement: 7.8, earnings: 0 },
    { id: 3, title: '5 Amazon finds under $20', views: 31400, engagement: 9.1, earnings: 89.20 },
  ],
  affiliateLinks: [
    { id: 1, product: 'Kitchen organizer bins', clicks: 342, conversions: 18, earnings: 43.20, lastUsed: '2026-01-15' },
    { id: 2, product: 'Kids lunch containers', clicks: 287, conversions: 12, earnings: 28.80, lastUsed: '2026-01-12' },
    { id: 3, product: 'Cable management kit', clicks: 198, conversions: 8, earnings: 19.20, lastUsed: '2026-01-10' },
    { id: 4, product: 'Bathroom caddy', clicks: 156, conversions: 5, earnings: 12.00, lastUsed: '2026-01-08' },
  ],
  stats: {
    followers: 12847,
    followersGrowth: 847,
    avgViews: 28400,
    engagementRate: 6.8,
    postsThisWeek: 4,
    postsGoal: 5
  }
};

// Helper functions
const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
const formatNumber = (num) => num.toLocaleString();
const getPercentChange = (current, previous) => {
  const change = ((current - previous) / previous) * 100;
  return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
};

// Stat Card Component
const StatCard = ({ label, value, subtext, trend, icon }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {subtext && <span className={`stat-trend ${trend}`}>{subtext}</span>}
    </div>
  </div>
);

// Earnings Card Component
const EarningsCard = ({ title, amount, comparison, breakdown }) => (
  <div className="earnings-card">
    <h3>{title}</h3>
    <div className="earnings-amount">{formatCurrency(amount)}</div>
    {comparison && <div className={`earnings-comparison ${comparison.startsWith('+') ? 'positive' : 'negative'}`}>{comparison} vs last month</div>}
    {breakdown && (
      <div className="earnings-breakdown">
        {breakdown.map((item, i) => (
          <div key={i} className="breakdown-item">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Content Calendar Preview
const CalendarPreview = ({ items }) => {
  const statusColors = {
    scheduled: 'status-scheduled',
    idea: 'status-idea',
    posted: 'status-posted',
    draft: 'status-draft'
  };

  const typeIcons = {
    reel: '🎬',
    story: '📱',
    post: '📷',
    live: '🔴'
  };

  return (
    <div className="calendar-preview">
      <div className="section-header">
        <h3>Upcoming Content</h3>
        <a href="/calendar" className="view-all">View Calendar →</a>
      </div>
      <div className="calendar-list">
        {items.map(item => (
          <div key={item.id} className="calendar-item">
            <div className="calendar-date">
              {new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
            <div className="calendar-content">
              <span className="calendar-type">{typeIcons[item.type]}</span>
              <span className="calendar-title">{item.title}</span>
              {item.hasAffiliate && <span className="affiliate-badge">$</span>}
            </div>
            <span className={`calendar-status ${statusColors[item.status]}`}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Top Performing Content
const TopContent = ({ items }) => (
  <div className="top-content">
    <div className="section-header">
      <h3>Top Performing (This Month)</h3>
      <a href="/hub" className="view-all">See All →</a>
    </div>
    <div className="content-list">
      {items.map((item, index) => (
        <div key={item.id} className="content-item">
          <span className="content-rank">#{index + 1}</span>
          <div className="content-info">
            <span className="content-title">{item.title}</span>
            <div className="content-metrics">
              <span>{formatNumber(item.views)} views</span>
              <span>{item.engagement}% engagement</span>
              {item.earnings > 0 && <span className="content-earnings">{formatCurrency(item.earnings)}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Affiliate Links Performance
const AffiliatePerformance = ({ links }) => (
  <div className="affiliate-performance">
    <div className="section-header">
      <h3>Affiliate Link Performance</h3>
      <a href="/links" className="view-all">Manage Links →</a>
    </div>
    <div className="affiliate-table">
      <div className="table-header">
        <span>Product</span>
        <span>Clicks</span>
        <span>Conv.</span>
        <span>Earned</span>
      </div>
      {links.map(link => (
        <div key={link.id} className="table-row">
          <span className="product-name">{link.product}</span>
          <span>{formatNumber(link.clicks)}</span>
          <span>{link.conversions}</span>
          <span className="link-earnings">{formatCurrency(link.earnings)}</span>
        </div>
      ))}
    </div>
  </div>
);

// Quick Actions
const QuickActions = () => (
  <div className="quick-actions">
    <h3>Quick Actions</h3>
    <div className="action-buttons">
      <button className="action-btn primary">+ New Content Idea</button>
      <button className="action-btn">+ Add Affiliate Link</button>
      <button className="action-btn">Log Earnings</button>
      <button className="action-btn">Export Report</button>
    </div>
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  const { earnings, contentCalendar, topContent, affiliateLinks, stats } = mockData;
  const totalEarnings = earnings.facebook.thisMonth + earnings.amazon.thisMonth;
  const lastMonthTotal = earnings.facebook.lastMonth + earnings.amazon.lastMonth;

  return (
    <div className="dashboard-overview">
      <div className="dashboard-header">
        <div>
          <h1>Hey, Jerri 💜</h1>
          <p className="dashboard-subtitle">Here's how your content is performing</p>
        </div>
        <div className="header-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <StatCard 
          label="Followers" 
          value={formatNumber(stats.followers)} 
          subtext={`+${formatNumber(stats.followersGrowth)} this month`}
          trend="positive"
          icon="👥"
        />
        <StatCard 
          label="Avg Views" 
          value={formatNumber(stats.avgViews)} 
          subtext="per reel"
          icon="👁️"
        />
        <StatCard 
          label="Engagement" 
          value={`${stats.engagementRate}%`} 
          subtext="above average!"
          trend="positive"
          icon="💬"
        />
        <StatCard 
          label="Posts This Week" 
          value={`${stats.postsThisWeek}/${stats.postsGoal}`} 
          subtext={stats.postsThisWeek >= stats.postsGoal ? "Goal hit! 🎉" : `${stats.postsGoal - stats.postsThisWeek} more to go`}
          trend={stats.postsThisWeek >= stats.postsGoal ? "positive" : "neutral"}
          icon="📅"
        />
      </div>

      {/* Earnings Section */}
      <div className="earnings-section">
        <h2>💰 Earnings This Month</h2>
        <div className="earnings-grid">
          <EarningsCard 
            title="Total Earnings"
            amount={totalEarnings}
            comparison={getPercentChange(totalEarnings, lastMonthTotal)}
            breakdown={[
              { label: 'Facebook Reels', value: formatCurrency(earnings.facebook.thisMonth) },
              { label: 'Amazon Affiliates', value: formatCurrency(earnings.amazon.thisMonth) },
            ]}
          />
          <EarningsCard 
            title="Facebook Bonus"
            amount={earnings.facebook.thisMonth}
            comparison={getPercentChange(earnings.facebook.thisMonth, earnings.facebook.lastMonth)}
            breakdown={[
              { label: 'Pending payout', value: formatCurrency(earnings.facebook.pending) },
            ]}
          />
          <EarningsCard 
            title="Amazon Commissions"
            amount={earnings.amazon.thisMonth}
            comparison={getPercentChange(earnings.amazon.thisMonth, earnings.amazon.lastMonth)}
            breakdown={[
              { label: 'Clicks', value: formatNumber(earnings.amazon.clicks) },
              { label: 'Conversions', value: earnings.amazon.conversions },
            ]}
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        <div className="grid-left">
          <CalendarPreview items={contentCalendar} />
          <QuickActions />
        </div>
        <div className="grid-right">
          <TopContent items={topContent} />
          <AffiliatePerformance links={affiliateLinks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

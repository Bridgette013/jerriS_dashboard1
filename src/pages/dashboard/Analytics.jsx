import React, { useState } from 'react';
import './Analytics.css';

// Mock data - wire up to real data source later
const mockAnalytics = {
  overview: {
    followers: 12847,
    followersLastMonth: 12000,
    totalViews: 847000,
    viewsLastMonth: 712000,
    engagementRate: 6.8,
    engagementLastMonth: 5.9,
    totalEarnings: 1004.10,
    earningsLastMonth: 710.95
  },
  weeklyViews: [
    { week: 'Dec 22', views: 45000 },
    { week: 'Dec 29', views: 62000 },
    { week: 'Jan 5', views: 58000 },
    { week: 'Jan 12', views: 71000 },
  ],
  contentPerformance: [
    { id: 1, title: 'The $12 organizer that changed everything', date: '2026-01-10', type: 'reel', views: 45200, likes: 2800, comments: 234, shares: 156, saves: 890, engagementRate: 8.2, earnings: 67.50 },
    { id: 2, title: 'Morning chaos but make it aesthetic', date: '2026-01-08', type: 'reel', views: 38100, likes: 2100, comments: 189, shares: 98, saves: 567, engagementRate: 7.8, earnings: 0 },
    { id: 3, title: '5 Amazon finds under $20', date: '2026-01-05', type: 'reel', views: 31400, likes: 1900, comments: 312, shares: 245, saves: 1120, engagementRate: 9.1, earnings: 89.20 },
    { id: 4, title: 'Why I stopped meal prepping (sort of)', date: '2026-01-03', type: 'reel', views: 28900, likes: 1650, comments: 278, shares: 67, saves: 234, engagementRate: 7.2, earnings: 0 },
    { id: 5, title: 'Realistic day in my life with 3 kids', date: '2026-01-01', type: 'reel', views: 25600, likes: 1400, comments: 156, shares: 89, saves: 345, engagementRate: 6.9, earnings: 0 },
    { id: 6, title: 'Bedtime routine that actually works', date: '2025-12-28', type: 'reel', views: 22100, likes: 1200, comments: 198, shares: 78, saves: 456, engagementRate: 7.4, earnings: 34.50 },
  ],
  audienceInsights: {
    topLocations: [
      { location: 'United States', percentage: 78 },
      { location: 'Canada', percentage: 8 },
      { location: 'United Kingdom', percentage: 5 },
      { location: 'Australia', percentage: 4 },
      { location: 'Other', percentage: 5 },
    ],
    ageRanges: [
      { range: '18-24', percentage: 12 },
      { range: '25-34', percentage: 38 },
      { range: '35-44', percentage: 32 },
      { range: '45-54', percentage: 14 },
      { range: '55+', percentage: 4 },
    ],
    gender: { female: 89, male: 11 },
    peakTimes: [
      { day: 'Monday', time: '8:00 PM', engagement: 'High' },
      { day: 'Wednesday', time: '7:00 PM', engagement: 'Very High' },
      { day: 'Friday', time: '6:00 PM', engagement: 'High' },
      { day: 'Sunday', time: '9:00 AM', engagement: 'Very High' },
    ]
  },
  topContentTypes: [
    { type: 'Product Reviews', avgViews: 35000, avgEngagement: 8.1 },
    { type: 'Day in My Life', avgViews: 28000, avgEngagement: 7.2 },
    { type: 'Routines', avgViews: 26000, avgEngagement: 7.8 },
    { type: 'Tips & Hacks', avgViews: 31000, avgEngagement: 6.9 },
  ]
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const { overview, contentPerformance, audienceInsights, topContentTypes } = mockAnalytics;

  const formatNumber = (num) => num.toLocaleString();
  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  const getChange = (current, previous) => {
    const change = ((current - previous) / previous) * 100;
    return { value: change.toFixed(1), positive: change >= 0 };
  };

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Track your content performance and audience growth</p>
        </div>
        <div className="time-range-selector">
          <button 
            className={timeRange === '7days' ? 'active' : ''} 
            onClick={() => setTimeRange('7days')}
          >
            7 Days
          </button>
          <button 
            className={timeRange === '30days' ? 'active' : ''} 
            onClick={() => setTimeRange('30days')}
          >
            30 Days
          </button>
          <button 
            className={timeRange === '90days' ? 'active' : ''} 
            onClick={() => setTimeRange('90days')}
          >
            90 Days
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="overview-stats">
        <div className="overview-card">
          <div className="overview-icon">👥</div>
          <div className="overview-content">
            <span className="overview-label">Followers</span>
            <span className="overview-value">{formatNumber(overview.followers)}</span>
            <span className={`overview-change ${getChange(overview.followers, overview.followersLastMonth).positive ? 'positive' : 'negative'}`}>
              {getChange(overview.followers, overview.followersLastMonth).positive ? '↑' : '↓'} 
              {Math.abs(getChange(overview.followers, overview.followersLastMonth).value)}% vs last month
            </span>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon">👁️</div>
          <div className="overview-content">
            <span className="overview-label">Total Views</span>
            <span className="overview-value">{formatNumber(overview.totalViews)}</span>
            <span className={`overview-change ${getChange(overview.totalViews, overview.viewsLastMonth).positive ? 'positive' : 'negative'}`}>
              {getChange(overview.totalViews, overview.viewsLastMonth).positive ? '↑' : '↓'} 
              {Math.abs(getChange(overview.totalViews, overview.viewsLastMonth).value)}% vs last month
            </span>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon">💬</div>
          <div className="overview-content">
            <span className="overview-label">Engagement Rate</span>
            <span className="overview-value">{overview.engagementRate}%</span>
            <span className={`overview-change ${getChange(overview.engagementRate, overview.engagementLastMonth).positive ? 'positive' : 'negative'}`}>
              {getChange(overview.engagementRate, overview.engagementLastMonth).positive ? '↑' : '↓'} 
              {Math.abs(getChange(overview.engagementRate, overview.engagementLastMonth).value)}% vs last month
            </span>
          </div>
        </div>
        <div className="overview-card highlight">
          <div className="overview-icon">💰</div>
          <div className="overview-content">
            <span className="overview-label">Total Earnings</span>
            <span className="overview-value">{formatCurrency(overview.totalEarnings)}</span>
            <span className={`overview-change ${getChange(overview.totalEarnings, overview.earningsLastMonth).positive ? 'positive' : 'negative'}`}>
              {getChange(overview.totalEarnings, overview.earningsLastMonth).positive ? '↑' : '↓'} 
              {Math.abs(getChange(overview.totalEarnings, overview.earningsLastMonth).value)}% vs last month
            </span>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Content Performance */}
        <div className="analytics-section content-performance">
          <div className="section-header">
            <h2>Content Performance</h2>
            <select className="sort-select">
              <option value="views">Sort by Views</option>
              <option value="engagement">Sort by Engagement</option>
              <option value="earnings">Sort by Earnings</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
          <div className="performance-list">
            {contentPerformance.map((content, index) => (
              <div key={content.id} className="performance-item">
                <span className="performance-rank">#{index + 1}</span>
                <div className="performance-info">
                  <span className="performance-title">{content.title}</span>
                  <span className="performance-date">{new Date(content.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="performance-metrics">
                  <div className="metric">
                    <span className="metric-value">{formatNumber(content.views)}</span>
                    <span className="metric-label">views</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{content.engagementRate}%</span>
                    <span className="metric-label">engagement</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{formatNumber(content.saves)}</span>
                    <span className="metric-label">saves</span>
                  </div>
                  {content.earnings > 0 && (
                    <div className="metric earnings">
                      <span className="metric-value">{formatCurrency(content.earnings)}</span>
                      <span className="metric-label">earned</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="analytics-sidebar">
          {/* Audience Demographics */}
          <div className="analytics-section demographics">
            <h2>Audience</h2>
            
            <div className="demo-group">
              <h4>Gender</h4>
              <div className="gender-bar">
                <div className="gender-female" style={{width: `${audienceInsights.gender.female}%`}}>
                  {audienceInsights.gender.female}% Women
                </div>
                <div className="gender-male" style={{width: `${audienceInsights.gender.male}%`}}>
                  {audienceInsights.gender.male}%
                </div>
              </div>
            </div>

            <div className="demo-group">
              <h4>Age Range</h4>
              <div className="age-bars">
                {audienceInsights.ageRanges.map(age => (
                  <div key={age.range} className="age-bar-item">
                    <span className="age-label">{age.range}</span>
                    <div className="age-bar-track">
                      <div className="age-bar-fill" style={{width: `${age.percentage}%`}}></div>
                    </div>
                    <span className="age-percent">{age.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="demo-group">
              <h4>Top Locations</h4>
              <div className="locations-list">
                {audienceInsights.topLocations.map(loc => (
                  <div key={loc.location} className="location-item">
                    <span>{loc.location}</span>
                    <span>{loc.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Best Times to Post */}
          <div className="analytics-section best-times">
            <h2>Best Times to Post</h2>
            <div className="times-list">
              {audienceInsights.peakTimes.map((time, index) => (
                <div key={index} className="time-item">
                  <div className="time-day">{time.day}</div>
                  <div className="time-hour">{time.time}</div>
                  <div className={`time-engagement ${time.engagement === 'Very High' ? 'very-high' : 'high'}`}>
                    {time.engagement}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Type Performance */}
          <div className="analytics-section content-types">
            <h2>Content Type Performance</h2>
            <div className="types-list">
              {topContentTypes.map(type => (
                <div key={type.type} className="type-item">
                  <span className="type-name">{type.type}</span>
                  <div className="type-stats">
                    <span>{formatNumber(type.avgViews)} avg views</span>
                    <span>{type.avgEngagement}% engagement</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="insights-section">
        <h2>🎯 Key Insights</h2>
        <div className="insights-grid">
          <div className="insight-card success">
            <span className="insight-icon">📈</span>
            <div>
              <strong>Growth is strong!</strong>
              <p>Your follower growth rate of 7.1% is above the 5% average for your niche.</p>
            </div>
          </div>
          <div className="insight-card tip">
            <span className="insight-icon">💡</span>
            <div>
              <strong>Product content converts best</strong>
              <p>Your Amazon finds and organizer content has 2x the save rate. Double down on this.</p>
            </div>
          </div>
          <div className="insight-card action">
            <span className="insight-icon">⚡</span>
            <div>
              <strong>Post on Wednesday at 7 PM</strong>
              <p>This is your highest engagement window. Schedule your best content here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

import React from 'react';

const Podcast = () => {
  const episodes = [
    {
      id: '1',
      title: 'One Fish, Two Fish, Red Fish, Blue Pills',
      url: 'https://audio.sierravoxstudio.com/episode-1-blue-pills.mp3',
      date: '2026-01-05',
      description:
        'The premiere. We examine the illusion of choice through a fractured lens. Which pill are you swallowing today?',
      duration: '27:32',
      status: 'published'
    },
    {
      id: '2',
      title: '3 little hairs',
      url: 'https://audio.sierravoxstudio.com/episode-2-three-hairs.mp3',
      date: '2026-01-17',
      description:
        "From military barracks to luxury hotel rooms. Bridgette explores 'The Monitor'—the survival instinct that sees the micro-shift before the explosion.",
      duration: '24:52',
      status: 'published'
    },
    {
      id: '3',
      title: 'Coming Soon',
      url: '',
      date: 'TBA',
      description: '',
      duration: 'TBA',
      status: 'coming-soon'
    },
    {
      id: '4',
      title: 'Coming Soon',
      url: '',
      date: 'TBA',
      description: '',
      duration: 'TBA',
      status: 'coming-soon'
    },
    {
      id: '5',
      title: 'Coming Soon',
      url: '',
      date: 'TBA',
      description: '',
      duration: 'TBA',
      status: 'coming-soon'
    },
    {
      id: '6',
      title: 'Coming Soon',
      url: '',
      date: 'TBA',
      description: '',
      duration: 'TBA',
      status: 'coming-soon'
    },
    {
      id: '7',
      title: 'Coming Soon',
      url: '',
      date: 'TBA',
      description: '',
      duration: 'TBA',
      status: 'coming-soon'
    },
    {
      id: '8',
      title: 'Coming Soon',
      url: '',
      date: 'TBA',
      description: '',
      duration: 'TBA',
      status: 'coming-soon'
    }
  ];

  return (
    <div className="page">
      {/* Podcast Banner */}
      <section className="podcast-banner">
        <img src="/podcast-banner.png" alt="Shattered Perceptions Podcast Banner" className="banner-image" />
      </section>

      <section className="section">
        {/* Episodes List - Horizontal Layout */}
        <div className="episodes-list">
          {episodes.map((episode) => (
            <div key={episode.id} className={`episode-row ${episode.status === 'coming-soon' ? 'is-coming-soon' : ''}`}>
              {episode.status === 'published' ? (
                <>
                  <div className="episode-cover-box">
                    <img src="/podcast-cover.png" alt="Shattered Perceptions Podcast Cover" className="episode-cover-image" />
                  </div>
                  <div className="episode-content-area">
                    <div className="episode-details">
                      <span className="episode-number">Episode {episode.id}</span>
                      <h4 lang="en">{episode.title}</h4>
                      <p className="episode-meta">
                        <span>Date: {episode.date}</span>
                        <span>Duration: {episode.duration}</span>
                      </p>
                      <p className="episode-description">{episode.description}</p>
                      <div className="episode-player" aria-label={`Episode ${episode.id} audio player`}>
                        <audio controls preload="none">
                          <source src={episode.url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="episode-label">Episode {episode.id}</div>
                  <div className="episode-content-area">
                    <div className="coming-soon-placeholder">
                      <span className="status-badge coming-soon">Coming Soon</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Podcast;

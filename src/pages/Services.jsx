import React from 'react';

const Services = () => {
  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <h3>Services</h3>
          <p>Studio-ready voice and narrative support for modern productions.</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <h4>Voice Services</h4>
            <ul>
              <li>Explainer &amp; Brand Voiceover</li>
              <li>Narrative &amp; Long‑Form Reads</li>
              <li>Educational &amp; E‑Learning Content</li>
              <li>Podcast Intros &amp; Segments</li>
            </ul>
          </div>
          <div className="service-card">
            <h4>Other Services</h4>
            <ul>
              <li>Script polishing</li>
              <li>Audio cleanup/editing</li>
              <li>Narrative development</li>
              <li>Content consulting</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

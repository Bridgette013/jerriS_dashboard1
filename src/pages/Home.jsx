import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
<div className="page">
  <section className="hero">
    <div className="hero-content">
      <p className="eyebrow">Sierra Vox Studio</p>
      <h1>Sierra Vox Studio</h1>
      <h2>Voice &amp; Narrative Studio</h2>
      <p className="hero-copy">
        Clear, conversational voice work for explainers, brands, and story‑driven projects.
        U.S.-based. Broadcast quality. Fast turnaround.
      </p>
      <div className="hero-actions">
        <a className="button primary" href="#demos">
          Listen to Samples
        </a>
        <Link className="button ghost" to="/contact">
          Request a Custom Read
        </Link>
      </div>
    </div>
    <div className="hero-image">
      <img src="/hero_bg.png" alt="Illustration of Tiffany with microphone and headphones" />
    </div>
  </section>

      <section id="demos" className="section">
        <div className="section-header">
          <h3>Demos</h3>
          <p>Quick listens across signature voice styles and storytelling tones.</p>
        </div>
        <div className="demo-grid">
          <div className="demo-card">
            <h4>Explainer / Commercial Demo</h4>
            <audio controls src="/samples/explainer-demo.mp3">
              Your browser does not support the audio element.
            </audio>
            <p className="demo-note">Recorded in a treated home studio. Broadcast-ready audio.</p>
          </div>
          <div className="demo-card">
            <h4>Narrative / Storytelling Demo</h4>
            <audio controls src="/samples/narrative-demo.mp3">
              Your browser does not support the audio element.
            </audio>
            <p className="demo-note">Recorded in a treated home studio. Broadcast-ready audio.</p>
          </div>
          <div className="demo-card">
            <h4>Conversational / Podcast Demo</h4>
            <audio controls src="/samples/conversational-demo.mp3">
              Your browser does not support the audio element.
            </audio>
            <p className="demo-note">Recorded in a treated home studio. Broadcast-ready audio.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

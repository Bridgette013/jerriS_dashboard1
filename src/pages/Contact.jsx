import React from 'react';

const Contact = () => {
  return (
    <div className="page">
      <section className="section contact-section">
        <div className="section-header">
          <h3>Get in Touch</h3>
          <p>
            Ready to start? I’m currently accepting explainer, narrative, and voice‑led creative
            projects.
          </p>
        </div>
        <div className="contact-card">
          <p className="contact-line">
            Email: <a href="mailto:studio@twistedtiffany.com">studio@twistedtiffany.com</a>
          </p>
          <p className="contact-note">
            Files delivered in WAV or 320kbps MP3; typical turnaround 24–48 hours.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;

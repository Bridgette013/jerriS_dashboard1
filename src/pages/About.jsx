import React from 'react';

const About = () => {
  return (
    <div className="page about-page" style={{ padding: '3rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '2rem',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #C485FF 0%, #60E1E0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          About Me
        </h1>

        <div style={{
          background: '#1F1F1F',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid #2A2A2A'
        }}>
          <p style={{ color: '#E0E0E0', marginBottom: '1rem', lineHeight: '1.8' }}>
            Hi, I'm [Your Name]—add your introduction here.
          </p>
          <p style={{ color: '#E0E0E0', marginBottom: '1rem', lineHeight: '1.8' }}>
            Tell your audience about yourself. What makes you unique? What's your story?
          </p>
          <p style={{ color: '#E0E0E0', marginBottom: '1rem', lineHeight: '1.8' }}>
            Share why you started creating content. What inspired you to share your journey with others?
          </p>
          <p style={{ color: '#E0E0E0', marginBottom: '1rem', lineHeight: '1.8' }}>
            Add more paragraphs as needed. Be authentic and connect with your audience.
          </p>
          <p style={{ color: '#E0E0E0', lineHeight: '1.8' }}>
            End with something memorable that represents your brand.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

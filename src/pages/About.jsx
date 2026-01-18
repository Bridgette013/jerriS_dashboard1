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
            Hey! I'm Jerri—mom of 3, professional chaos manager, and firm believer that 
            "good enough" is actually pretty great.
          </p>
          <p style={{ color: '#E0E0E0', marginBottom: '1rem', lineHeight: '1.8' }}>
            I share the real stuff: the messy mornings, the kitchen hacks that actually work, 
            the Amazon finds that made my life easier, and everything in between.
          </p>
          <p style={{ color: '#E0E0E0', lineHeight: '1.8' }}>
            No perfect Pinterest life here—just real family moments and the products 
            that help us survive (and sometimes thrive).
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

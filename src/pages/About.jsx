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
            I'm Jerri S.—a single mom of four from Phoenix, Arizona.
          </p>
          <p style={{ color: '#E0E0E0', marginBottom: '1rem', lineHeight: '1.8' }}>
            My kids are Deegan (16), Emmarose (11), Lillyana (7), and Jasper (3). Plus two cats, Bonnie and Clyde, who run this house more than I do.
          </p>
          <p style={{ color: '#E0E0E0', marginBottom: '1rem', lineHeight: '1.8' }}>
            I started sharing my life online because I was tired of the highlight reels. The perfect kitchens. The calm mornings. The moms who "have it all together." That's not real—and it made me feel like I was failing.
          </p>
          <p style={{ color: '#E0E0E0', marginBottom: '1rem', lineHeight: '1.8' }}>
            So I showed the mess. The mental health days. The days I cry in the car before pickup. The clutter I'll probably never conquer. And something wild happened—people said "me too."
          </p>
          <p style={{ color: '#E0E0E0', marginBottom: '1rem', lineHeight: '1.8' }}>
            That's what this is about. Not advice from someone who figured it out. Just real life from someone still in it.
          </p>
          <p style={{ color: '#E0E0E0', lineHeight: '1.8' }}>
            You're not broken. You're not behind. You're not alone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

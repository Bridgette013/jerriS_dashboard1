import React from 'react';

const Contact = () => {
  return (
    <div className="page contact-page" style={{ padding: '3rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '2rem',
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #ff3b3b 0%, #ffffff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Let's Work Together
        </h1>
        <p style={{ color: '#888', marginBottom: '2rem' }}>
          I partner with brands that get it—real products for real life. No perfect setups, no scripted lines.
        </p>

        <div style={{
          background: '#1F1F1F',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid #2A2A2A'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#ff3b3b', fontSize: '1rem', marginBottom: '0.5rem' }}>
              What I'm open to:
            </h3>
            <ul style={{ color: '#E0E0E0', paddingLeft: '1.25rem', lineHeight: '1.8' }}>
              <li>Sponsored content & brand partnerships</li>
              <li>Product reviews (stuff I'd actually use)</li>
              <li>UGC creation</li>
              <li>Mental health and mom-focused campaigns</li>
            </ul>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#ff3b3b', fontSize: '1rem', marginBottom: '0.5rem' }}>
              My audience:
            </h3>
            <p style={{ color: '#E0E0E0', lineHeight: '1.8' }}>
              <strong style={{ color: '#ff3b3b' }}>11M+ views on one video.</strong> Moms (and some dads) who are tired of the polished influencer thing. They're here for validation, not perfection. Ages 25–45, mostly US-based, dealing with real life and looking for someone who says what they're thinking.
            </p>
          </div>

          <div>
            <h3 style={{ color: '#ff3b3b', fontSize: '1rem', marginBottom: '0.5rem' }}>
              Get in touch:
            </h3>
            <a
              href="mailto:collab@vvvdigitals.com"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #ff3b3b 0%, #cc0000 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                marginTop: '0.5rem'
              }}
            >
              collab@vvvdigitals.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

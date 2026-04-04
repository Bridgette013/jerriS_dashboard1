import { useState } from 'react';

const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        console.error('Subscribe failed:', response.status, response.statusText);
        setStatus('error');
      }
    } catch (err) {
      console.error('Subscribe error:', err);
      setStatus('error');
    }
  };

  return (
    <div style={{
      background: '#0A0A0A',
      padding: '3rem 2rem',
      borderRadius: '0',
      textAlign: 'center',
      marginTop: '2rem',
      border: '4px solid #ffffff',
      boxShadow: '8px 8px 0px #ff3b3b',
      position: 'relative',
      overflow: 'visible',
    }}>
      <div style={{
        position: 'absolute',
        top: '-18px',
        right: '20px',
        background: '#ff3b3b',
        color: '#ffffff',
        padding: '0.35rem 0.9rem',
        borderRadius: '0',
        border: '2px solid #fff',
        fontSize: '0.75rem',
        fontWeight: '700',
        fontFamily: '"Permanent Marker", cursive',
        transform: 'rotate(3deg)',
      }}>
        8.5M VIEWERS THIS MONTH
      </div>
      <h3 style={{
        fontFamily: '"Playfair Display", serif',
        fontStyle: 'italic',
        fontWeight: 900,
        fontSize: '2rem',
        marginBottom: '0.5rem',
        color: '#fff',
        textTransform: 'uppercase',
      }}>
        Grab the Free Survival Checklist
      </h3>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
        Get "The Single Mom Survival Checklist: 25 Things Nobody Tells You" — free, straight to your inbox.
      </p>

      {status === 'success' ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#ff3b3b', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
            ✓ You're in!
          </p>
          <a href="/checklist" style={{
            color: '#000',
            background: '#fff',
            padding: '0.75rem 2rem',
            borderRadius: '0',
            fontWeight: '800',
            textDecoration: 'none',
            display: 'inline-block',
            border: '3px solid #000',
            boxShadow: '4px 4px 0px #ff3b3b',
            textTransform: 'uppercase',
          }}>
            Open Your Survival Checklist →
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          gap: '1rem',
          maxWidth: '500px',
          margin: '0 auto',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            style={{
              flex: '1 1 250px',
              padding: '0.75rem 1rem',
              borderRadius: '0',
              border: '3px solid #000',
              fontSize: '1rem',
              outline: 'none',
              color: '#0A0A0A',
              background: '#fff',
              fontFamily: 'inherit',
            }}
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{
              background: '#ff3b3b',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: '0',
              border: '3px solid #fff',
              fontWeight: '800',
              textTransform: 'uppercase',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              boxShadow: '4px 4px 0px rgba(255, 255, 255, 0.2)',
            }}
          >
            {status === 'submitting' ? 'Sending...' : 'Send My Checklist'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p style={{ color: '#ff6b6b', marginTop: '1rem', fontSize: '0.875rem' }}>
          Oops! Try again or email collab@vvvdigitals.com
        </p>
      )}
    </div>
  );
};

export default EmailCapture;

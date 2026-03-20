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
      background: 'linear-gradient(135deg, #5F00B8 0%, #7B2FD4 100%)',
      padding: '3rem 2rem',
      borderRadius: '12px',
      textAlign: 'center',
      marginTop: '2rem',
      border: '2px solid #C485FF',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '20px',
        background: '#60E1E0',
        color: '#0A0A0A',
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '700',
      }}>
        8.5M VIEWERS THIS MONTH
      </div>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>
        Grab the Free Survival Checklist
      </h3>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
        Get "The Single Mom Survival Checklist: 25 Things Nobody Tells You" — free, straight to your inbox.
      </p>

      {status === 'success' ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#60E1E0', fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
            ✓ You're in!
          </p>
          <a href="/checklist" style={{ color: '#fff', background: '#0A0A0A', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}>
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
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem',
              outline: 'none',
              color: '#0A0A0A',
              background: '#fff',
            }}
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{
              background: '#0A0A0A',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
            }}
          >
            {status === 'submitting' ? 'Sending...' : 'Send My Checklist'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p style={{ color: '#ff6b6b', marginTop: '1rem', fontSize: '0.875rem' }}>
          Oops! Try again or email collab@jerrisworld.com
        </p>
      )}
    </div>
  );
};

export default EmailCapture;

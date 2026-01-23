import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(password);

    if (!result.success) {
      setError(result.error);
      setPassword('');
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-brand">
          <span className="login-title">Your Name</span>
          <span className="login-subtitle">Creator Dashboard</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-icon">🔐</div>
          <h2>Enter Password</h2>
          <p>This dashboard is private. Enter the password to continue.</p>

          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Dashboard password"
              autoFocus
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="btn-primary login-btn"
            disabled={isLoading || !password}
          >
            {isLoading ? 'Checking...' : 'Enter Dashboard'}
          </button>
        </form>

        <a href="/" className="back-to-site">← Back to site</a>
      </div>
    </div>
  );
};

export default Login;

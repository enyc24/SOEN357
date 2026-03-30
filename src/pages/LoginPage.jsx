import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Prototype: accept any input and go to feed
    navigate('/feed');
  };

  return (
    <div className="auth-page">
      {/* ── Navbar ── */}
      <nav className="auth-navbar">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          Big Backs Assemble
        </div>
        <div className="auth-navbar-right">
          <span>No account yet?</span>
          <button onClick={() => navigate('/signup')}>Sign up free</button>
        </div>
      </nav>

      {/* ── Card ── */}
      <div className="auth-body">
        <div className="auth-card">
          <div className="auth-logo">Big Backs Assemble</div>
          <div className="auth-tagline">Restaurant picks from people you actually trust</div>
          <div className="auth-title">Welcome back</div>

          <form onSubmit={handleLogin}>
            <label className="field-label">Email</label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <label className="field-label">Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <span className="forgot-link">Forgot password?</span>

            <button type="submit" className="auth-btn">Log in</button>
          </form>

          <div className="auth-switch">
            Don't have an account?{' '}
            <a onClick={() => navigate('/signup')}>Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

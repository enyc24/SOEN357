import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const strength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2
    : form.password.length < 14 ? 3
    : 4;

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];

  const handleChange = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <span>Already have an account?</span>
          <button onClick={() => navigate('/login')}>Log in</button>
        </div>
      </nav>

      {/* ── Card ── */}
      <div className="auth-body">
        <div className="auth-card">
          <div className="auth-logo">Big Backs Assemble</div>
          <div className="auth-tagline">Join your friends. Discover great food.</div>
          <div className="auth-title">Create your account</div>

          <form onSubmit={handleSubmit}>
            <div className="name-row">
              <div>
                <label className="field-label">First name</label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Jamie"
                  value={form.firstName}
                  onChange={handleChange('firstName')}
                />
              </div>
              <div>
                <label className="field-label">Last name</label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Dupont"
                  value={form.lastName}
                  onChange={handleChange('lastName')}
                />
              </div>
            </div>

            <label className="field-label">Email</label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange('email')}
            />

            <label className="field-label">Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange('password')}
            />

            {form.password.length > 0 && (
              <>
                <div className="strength-bar">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`sb${i <= strength ? ' filled' : ''}`} />
                  ))}
                </div>
                <div className="strength-label">{strengthLabel} password</div>
              </>
            )}

            <button type="submit" className="auth-btn">Create account</button>
          </form>

          <div className="auth-switch">
            Already have an account?{' '}
            <a onClick={() => navigate('/login')}>Log in</a>
          </div>
          <div className="auth-terms">
            By signing up you agree to our{' '}
            <a>Terms of Service</a> and <a>Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

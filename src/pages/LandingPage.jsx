import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* ── Navbar ── */}
      <nav className="landing-navbar">
        <div className="logo">Big Backs Assemble</div>
        <div className="landing-navbar-right">
          <button onClick={() => navigate('/login')}>Log in</button>
          <button onClick={() => navigate('/signup')}>Sign up free</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-h1">
            Restaurant reviews<br />
            from people you<br />
            <span>actually trust</span>
          </h1>
          <p className="hero-sub">
            Stop guessing with strangers. Big Backs Assemble shows you
            restaurants your friends love.
          </p>
          <button className="hero-btn" onClick={() => navigate('/signup')}>
            Get started for free
          </button>
        </div>

        <div className="hero-right">
          <div className="preview-card">
            <div className="preview-card-header">
              <div className="avatar av-blue" style={{ width: 36, height: 36, fontSize: 13 }}>AL</div>
              <div className="preview-card-title">Friends' picks near you</div>
            </div>
            <div className="preview-entry">
              <div className="preview-entry-icon">🍜</div>
              <div>
                <div className="preview-entry-name">Pho Nguyen</div>
                <div className="preview-entry-quote">"Best broth in the city, get the rare beef"</div>
                <div className="preview-entry-who">Reviewed by Alex L.</div>
              </div>
            </div>
            <div className="preview-entry">
              <div className="preview-entry-icon">🍕</div>
              <div>
                <div className="preview-entry-name">Regina Pizzeria</div>
                <div className="preview-entry-quote">"Wood-fire perfection, go early"</div>
                <div className="preview-entry-who">Reviewed by Sophie M.</div>
              </div>
            </div>
            <div className="preview-entry">
              <div className="preview-entry-icon">🍣</div>
              <div>
                <div className="preview-entry-name">Sushi Momo</div>
                <div className="preview-entry-quote">"Book 2 weeks ahead — worth it"</div>
                <div className="preview-entry-who">Reviewed by Jordan K.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <div className="feature-title">Friend-only reviews</div>
          <div className="feature-desc">See ratings from people in your circle.</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📸</div>
          <div className="feature-title">Real meal photos</div>
          <div className="feature-desc">
            Friends can upload what they ordered so you know what to expect.
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <div className="feature-title">Reserve a table</div>
          <div className="feature-desc">
            Book directly through the app after reading reviews. All in one place.
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <div className="feature-title">Plan together</div>
          <div className="feature-desc">
            Chat with friends and coordinate your next outing without leaving the app.
          </div>
        </div>
      </section>
    </div>
  );
}

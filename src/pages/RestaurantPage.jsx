import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { latestReviews } from '../data/restaurantData';

function StarRating({ rating, max = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1.5l1.545 3.13 3.455.502-2.5 2.436.59 3.44L8 9.35l-3.09 1.658.59-3.44L3 5.132l3.455-.502L8 1.5z"
            fill={i < rating ? '#F5A623' : 'none'}
            stroke={i < rating ? '#F5A623' : '#D4C9BB'}
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

function Tag({ label, color = '#4A4742', bg = '#F5F2EA' }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color,
      background: bg,
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 600,
      padding: '3px 8px',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function RestaurantPage() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const stateReview = location.state?.review;
  const urlReview = latestReviews.find(r => String(r.id) === String(params.id));
  const review = stateReview || urlReview;

  if (!review) {
    return (
      <Layout>
        <div style={{ padding: '40px 60px' }}>
          <h1>Restaurant not found</h1>
          <button onClick={() => navigate('/feed')}>Back to feed</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: '36px 48px', maxWidth: 760, margin: '0 auto' }}>
        <button
          onClick={() => navigate('/feed')}
          style={{ border: 'none', background: 'transparent', color: '#2C2C2A', cursor: 'pointer', marginBottom: 20 }}
        >
          ← Back to feed
        </button>

        <div style={{ background: '#fff', border: '1px solid #E8E4DC', borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>{review.emoji}</div>
          <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 4 }}>{review.name}</div>
          <div style={{ fontSize: 13, color: '#888780', marginBottom: 10 }}>
            {review.category} • {review.neighborhood}
          </div>
          <StarRating rating={review.stars} />
          <p style={{ fontStyle: 'italic', fontSize: 13, color: '#4A4742', margin: '10px 0' }}>
            "{review.quote}"
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            {review.tag.map(t => <Tag key={t.label} {...t} />)}
          </div>

          <div style={{ marginBottom: 16 }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: 16, color: '#2C2C2A' }}>Friend rating</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <StarRating rating={review.stars} />
              <span style={{ fontWeight: 700, color: '#BA7517' }}>{review.stars}.0</span>
              <span style={{ fontSize: 12, color: '#888780' }}>Based on {review.friends?.length || 0} friends</span>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 16, marginBottom: 8, color: '#2C2C2A' }}>Make a reservation</h3>
            <label style={{ fontSize: 11, color: '#6B6B6A', marginBottom: 4, display: 'block' }}>DATE</label>
            <input type="date" style={{ width: '100%', padding: '8px 10px', border: '1px solid #D4C9BB', borderRadius: 8, marginBottom: 8 }} />
            <label style={{ fontSize: 11, color: '#6B6B6A', marginBottom: 4, display: 'block' }}>PARTY SIZE</label>
            <input type="number" min="1" defaultValue="2" style={{ width: '100%', padding: '8px 10px', border: '1px solid #D4C9BB', borderRadius: 8, marginBottom: 8 }} />
            <label style={{ fontSize: 11, color: '#6B6B6A', marginBottom: 4, display: 'block' }}>TIME</label>
            <input type="time" style={{ width: '100%', padding: '8px 10px', border: '1px solid #D4C9BB', borderRadius: 8, marginBottom: 10 }} />
            <button style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', background: '#2C2C2A', color: '#fff', fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}>
              Reserve a table
            </button>
            <button style={{ width: '100%', padding: '8px', borderRadius: 8, border: '1px solid #D4C9BB', background: '#fff', color: '#2C2C2A', cursor: 'pointer' }}>
              + Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RestaurantPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { latestReviews, wishlists } from '../data/restaurantData';

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

function FriendAvatar({ initials, color }) {
  return (
    <div style={{
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      border: '2px solid #fff',
      marginRight: -6,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function ReviewCard({ review, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: '1 1 300px',
        minWidth: 280,
        background: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #EDE8E0',
        boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.08)';
      }}
    >
      <div style={{
        background: review.emojiBg,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
      }}>
        {review.emoji}
      </div>
      <div style={{ padding: '12px 14px' }}>
        {review.friends && review.friends.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {review.friends.map((f, idx) => (
                <FriendAvatar key={`${f.initials}-${idx}`} {...f} />
              ))}
            </div>
            <div style={{ fontSize: 12, color: '#6B6B6A', whiteSpace: 'nowrap' }}>
              {review.friendsText}
              {review.time ? ` • ${review.time}` : ''}
            </div>
          </div>
        )}
        <div style={{ fontWeight: 700, fontSize: 15, color: '#2C2C2A', marginBottom: 2 }}>
          {review.name}
        </div>
        <div style={{ fontSize: 12, color: '#888780', marginBottom: 6 }}>
          {review.category} • {review.neighborhood}
        </div>
        <StarRating rating={review.stars} />
        <p style={{
          fontStyle: 'italic',
          fontSize: 13,
          color: '#4A4742',
          margin: '8px 0',
          lineHeight: 1.5,
        }}>
          "{review.quote}"
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
          {review.tag.map(t => <Tag key={t.label} {...t} />)}
        </div>
      </div>
    </div>
  );
}

function WishlistCard({ item }) {
  return (
    <div style={{
      flex: '1 1 220px',
      minWidth: 180,
      border: '1px solid #E5E5DC',
      borderRadius: 12,
      padding: 12,
      background: '#FFFFFF',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      marginBottom: 14,
    }}>
      <div style={{ fontSize: 26 }}>{item.icon}</div>
      <h4 style={{ margin: '8px 0 4px', fontSize: 16 }}>{item.name}</h4>
      <p style={{ margin: 0, color: '#666', fontSize: 13 }}>{item.details}</p>
      <span style={{
        marginTop: 8,
        display: 'inline-block',
        fontSize: 11,
        fontWeight: 600,
        color: '#B0385A',
        background: '#FDE8EC',
        borderRadius: 8,
        padding: '2px 8px',
      }}>
        {item.badge}
      </span>
    </div>
  );
}

export default function FeedPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={{ padding: '24px 30px', maxWidth: 1350, margin: '0 auto' }}>
        <h1 style={{ fontSize: 24, color: '#2C2C2A', marginBottom: 8 }}>Your friends' recent eats</h1>
        <p style={{ fontSize: 14, color: '#888780', marginBottom: 24 }}>
          Explore the latest reviews and wishlists from your network.
        </p>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, color: '#2C2C2A', marginBottom: 16 }}>Latest reviews</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {latestReviews.map(review => (
              <ReviewCard
                key={review.id}
                review={review}
                onClick={() => navigate(`/restaurant/${review.id}`, { state: { review } })}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: 20, color: '#2C2C2A', marginBottom: 16 }}>Friends' wishlists</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {wishlists.map(item => (
              <WishlistCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
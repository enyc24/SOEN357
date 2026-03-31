import React from 'react';
import Layout from '../components/Layout';

const USER = {
    initials: 'JD',
    name: 'Jamie Dupont',
    city: 'Montreal',
    since: 2023,
    reviews: 34,
    friends: 3,
    saved: 12,
  };
  
  const RECENT_REVIEWS = [
    {
      id: 1,
      emoji: '🍣',
      emojiBg: '#DDEAF5',
      name: 'Biru Biru',
      category: 'Japanese',
      neighborhood: 'Downtown',
      stars: 4,
      quote: 'Book 2 weeks ahead, worth every minute.',
      tag: 'Must try',
      tagColor: '#F5A623',
    },
  ];
  
  const WISHLIST = [
    {
      id: 1,
      emoji: '🍔',
      name: 'Notre-Boeuf-De-Grace',
      category: 'Burgers',
      neighborhood: 'Downtown',
    },
  ];
  
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
  
  function ReviewCard({ review }) {
    return (
      <div style={{
        background: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #EDE8E0',
      }}>
        {/* Image area */}
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
        {/* Content */}
        <div style={{ padding: '12px 14px' }}>
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
          <span style={{
            display: 'inline-block',
            background: '#FEF0D8',
            color: '#BA7517',
            fontSize: 11,
            fontWeight: 600,
            borderRadius: 20,
            padding: '3px 10px',
          }}>
            {review.tag}
          </span>
        </div>
      </div>
    );
  }
  
  function WishlistItem({ item }) {
    return (
      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #EDE8E0',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 40, height: 40,
          background: '#FEF0D8',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
          flexShrink: 0,
        }}>
          {item.emoji}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#2C2C2A' }}>{item.name}</div>
          <div style={{ fontSize: 12, color: '#888780' }}>{item.category} • {item.neighborhood}</div>
        </div>
        <span style={{
          background: '#EDE8E0',
          color: '#6B6661',
          fontSize: 11,
          fontWeight: 600,
          borderRadius: 20,
          padding: '4px 12px',
          flexShrink: 0,
        }}>
          Saved
        </span>
      </div>
    );}

export default function ProfilePage() {
  return (
    <Layout>
       <div style={{ flex: 1, padding: '36px 48px', display: 'flex', gap: 32 }}>
        <div style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Profile Card */}
          <div style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #EDE8E0',
            padding: '32px 24px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 0,
          }}>
            {/* Avatar */}
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: '#C8C0E0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 26,
              letterSpacing: 1, marginBottom: 16,
            }}>
              {USER.initials}
            </div>

            {/* Name */}
            <div style={{ fontWeight: 700, fontSize: 20, color: '#2C2C2A', marginBottom: 4 }}>
              {USER.name}
            </div>
            <div style={{ fontSize: 13, color: '#888780', marginBottom: 20 }}>
              {USER.city} • Since {USER.since}
            </div>

            {/* Divider */}
            <div style={{ width: '100%', height: 1, background: '#EDE8E0', marginBottom: 20 }} />

            {/* Stats */}
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginBottom: 24 }}>
              {[
                { value: USER.reviews, label: 'Reviews' },
                { value: USER.friends, label: 'Friends' },
                { value: USER.saved,   label: 'Saved' },
              ].map(({ value, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: '#2C2C2A' }}>{value}</div>
                  <div style={{ fontSize: 12, color: '#888780', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Edit Profile Button */}
            <button style={{
              width: '100%', padding: '10px 0',
              border: '1.5px solid #2C2C2A',
              borderRadius: 8, background: 'transparent',
              fontFamily: 'Georgia, serif', fontSize: 14,
              fontWeight: 600, color: '#2C2C2A',
              cursor: 'pointer', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#F0EBE3'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Edit profile
            </button>
          </div>

          {/* My Reservations */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#2C2C2A', marginBottom: 12 }}>
              My reservations
            </div>
            <div style={{
              background: '#fff', borderRadius: 12,
              border: '1px solid #EDE8E0',
              padding: '20px 16px',
              color: '#BBBBBB', fontSize: 13, textAlign: 'center',
            }}>
              No upcoming reservations
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* My Recent Reviews */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontWeight: 700, fontSize: 16, color: '#2C2C2A' }}>My recent reviews</span>
              <span style={{ fontSize: 13, color: '#BA7517', cursor: 'pointer' }}>See all</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {RECENT_REVIEWS.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </div>

          {/* My Wishlist */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontWeight: 700, fontSize: 16, color: '#2C2C2A' }}>My wishlist</span>
              <span style={{ fontSize: 13, color: '#BA7517', cursor: 'pointer' }}>See all</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {WISHLIST.map(item => <WishlistItem key={item.id} item={item} />)}
            </div>
          </div>
        </div>

        </div>
        </Layout>
  );
}
import React, { useState } from 'react'
import Layout from '../components/Layout';

const STATS = [
  { value: 34, label: 'Reviews' },
  { value: 4,  label: 'Also saved by friends' },
  { value: 2,  label: 'Visited this month' },
];

const FILTERS = ['All saved', 'Shared with friends', 'Fine dining', 'Casual', 'Near me'];

const RESTAURANTS = [
  {
    id: 1,
    emoji: '🍝',
    bgColor: '#FAE8E0',
    name: 'Bottega',
    category: 'Italian',
    neighborhood: 'Little Italy',
    price: '$$',
    tags: [{ label: 'Casual', color: '#4CAF50', bg: '#E8F5E9' }],
    note: 'Added from Explore • 3 days ago',
    noteStyle: 'italic',
    friends: [
      { initials: 'AL', color: '#7B9EE0' },
      { initials: 'SM', color: '#E07B9E' },
    ],
    friendsText: '2 friends saved this',
  },
  {
    id: 2,
    emoji: '🍱',
    bgColor: '#E0F0E8',
    name: 'Izakaya Kinoya',
    category: 'Japanese',
    neighborhood: 'Plateau',
    price: '$$',
    tags: [
      { label: 'Must try', color: '#BA7517', bg: '#FEF0D8' },
      { label: 'Late night', color: '#7B5EA7', bg: '#EDE8F5' },
    ],
    note: "Jordan's top pick for late nights",
    noteStyle: 'italic',
    friends: [
      { initials: 'JK', color: '#7BB87B' },
    ],
    friendsText: '1 friend saved this',
  },
  {
    id: 3,
    emoji: '🍜',
    bgColor: '#FAE8E0',
    name: 'Bottega',
    category: 'Desserts',
    neighborhood: 'Mile End',
    price: '$',
    tags: [
      { label: 'Casual', color: '#4CAF50', bg: '#E8F5E9' },
      { label: 'Hidden gem', color: '#BA7517', bg: '#FEF0D8' },
    ],
    note: "Saved from Sophie's profile",
    noteStyle: 'italic',
    friends: [],
    friendsText: 'No friends saved this yet',
  },
];


function StatCard({ value, label }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #EDE8E0',
      borderRadius: 12,
      padding: '18px 24px',
      flex: 1,
      minWidth: 120,
    }}>
      <div style={{ fontWeight: 700, fontSize: 26, color: '#2C2C2A', marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 13, color: '#888780' }}>{label}</div>
    </div>
  );
}

function Tag({ label, color, bg }) {
  return (
    <span style={{
      display: 'inline-block',
      background: bg,
      color: color,
      fontSize: 11,
      fontWeight: 600,
      borderRadius: 20,
      padding: '3px 10px',
    }}>
      {label}
    </span>
  );
}

function FriendAvatar({ initials, color }) {
  return (
    <div style={{
      width: 26, height: 26, borderRadius: '50%',
      background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: 10, fontWeight: 700,
      border: '2px solid #fff',
      marginRight: -6,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function RestaurantCard({ restaurant: r }) {
  const [saved, setSaved] = useState(true);

  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      border: '1px solid #EDE8E0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
    }}>
      {/* Image area */}
      <div style={{
        background: r.bgColor,
        height: 110,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 44,
        position: 'relative',
      }}>
        {/* Decorative dots */}
        <span style={{ position: 'absolute', top: 10, left: 12, color: '#C8B4E0', fontSize: 16, letterSpacing: 2, opacity: 0.7 }}>✦ · ·</span>
        {r.emoji}
        {/* Bookmark button */}
        <button
          onClick={() => setSaved(s => !s)}
          style={{
            position: 'absolute', top: 10, right: 12,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 0, fontSize: 20, color: saved ? '#D94F2B' : '#ccc',
            transition: 'color 0.2s',
          }}
          title={saved ? 'Remove from wishlist' : 'Save'}
        >
          🔖
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {/* Name */}
        <div style={{ fontWeight: 700, fontSize: 16, color: '#2C2C2A' }}>{r.name}</div>

        {/* Meta */}
        <div style={{ fontSize: 12, color: '#888780' }}>
          {r.category} • {r.neighborhood} • {r.price}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {r.tags.map(t => <Tag key={t.label} {...t} />)}
        </div>

        {/* Note */}
        <div style={{
          fontSize: 13,
          color: '#5A5550',
          fontStyle: r.noteStyle === 'italic' ? 'italic' : 'normal',
        }}>
          {r.note}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#EDE8E0', marginTop: 4 }} />

        {/* Friends footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {r.friends.length > 0 && (
            <div style={{ display: 'flex', paddingRight: 6 }}>
              {r.friends.map(f => <FriendAvatar key={f.initials} {...f} />)}
            </div>
          )}
          <span style={{ fontSize: 12, color: '#888780' }}>{r.friendsText}</span>
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const [activeFilter, setActiveFilter] = useState('All saved');
  const [search, setSearch] = useState('');

  return (
    <Layout>
      <div style={{ flex: 1, padding: '36px 48px', overflowY: 'auto' }}>

        <h1 style={{ fontWeight: 700, fontSize: 28, color: '#2C2C2A', margin: '0 0 28px 0' }}>
          My wishlist
        </h1>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Search + Add */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search your wishlist..."
            style={{
              flex: 1, padding: '12px 18px',
              border: '1px solid #EDE8E0', borderRadius: 10,
              background: '#fff', fontFamily: 'Georgia, serif',
              fontSize: 14, color: '#2C2C2A', outline: 'none',
            }}
          />
          <button style={{
            padding: '12px 20px', border: '1.5px solid #2C2C2A',
            borderRadius: 10, background: '#fff',
            fontFamily: 'Georgia, serif', fontSize: 14,
            fontWeight: 600, color: '#2C2C2A', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            + Add restaurant
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '7px 16px', borderRadius: 20,
                border: activeFilter === f ? 'none' : '1.5px solid #D4C9BB',
                background: activeFilter === f ? '#BA7517' : '#fff',
                color: activeFilter === f ? '#fff' : '#4A4742',
                fontFamily: 'Georgia, serif', fontSize: 13,
                fontWeight: activeFilter === f ? 600 : 400, cursor: 'pointer',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ fontWeight: 700, fontSize: 15, color: '#2C2C2A', marginBottom: 16 }}>
          Saved restaurants
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {RESTAURANTS.filter(r =>
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.category.toLowerCase().includes(search.toLowerCase())
          ).map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>

      </div>
    </Layout>
  );
}
import React, { useState } from 'react';
import Layout from '../components/Layout';

const FILTERS = ['All', 'Visited by friends', 'On wishlists', 'Highly rated', 'Near me'];

const restaurants = [
  {
    id: 1,
    emoji: '🍜',
    emojiBg: '#FEF4D7',
    name: 'Pho Nguyen',
    category: 'Vietnamese',
    neighborhood: 'Downtown',
    price: '$$',
    stars: 5,
    details: 'Alex L. +2 more',
  },
  {
    id: 2,
    emoji: '🍕',
    emojiBg: '#EBF8EA',
    name: 'Regina Pizzeria',
    category: 'Italian',
    neighborhood: 'Brossard',
    price: '$$',
    stars: 5,
    details: 'Sophie M.',
  },
  {
    id: 3,
    emoji: '🍣',
    emojiBg: '#E7F1FF',
    name: 'Manga Bistro',
    category: 'Japanese',
    neighborhood: 'Downtown',
    price: '$$',
    stars: 4,
    details: 'Jordan K. +1 more',
  },
  {
    id: 4,
    emoji: '🍔',
    emojiBg: '#F9EAD9',
    name: 'Patty Slaps',
    category: 'Burgers',
    neighborhood: 'Downtown',
    price: '$',
    stars: 4,
    details: 'On 3 wishlists',
  },
  {
    id: 5,
    emoji: '☕',
    emojiBg: '#EBF4FF',
    name: 'Cafe Myriade',
    category: 'Cafe',
    neighborhood: 'Downtown',
    price: '$',
    stars: 5,
    details: 'Sophie M.',
  },
  {
    id: 6,
    emoji: '🍨',
    emojiBg: '#F5F3FF',
    name: 'Icono Glace',
    category: 'Ice Cream',
    neighborhood: 'Downtown',
    price: '$$',
    stars: 5,
    details: 'Alex L.',
  },
];

function StarRating({ rating, max = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="none">
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

function RestaurantCard({ restaurant }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #E8E4DC',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      minWidth: 0,
    }}>
      <div style={{
        background: restaurant.emojiBg,
        height: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        position: 'relative',
      }}>
        <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 18, color: '#D4C9BB' }}>🔖</span>
        {restaurant.emoji}
      </div>
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2C2C2A' }}>{restaurant.name}</h3>
        <div style={{ fontSize: 12, color: '#888780' }}>
          {restaurant.category} • {restaurant.neighborhood} • {restaurant.price}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <StarRating rating={restaurant.stars} />
          <span style={{ fontSize: 12, color: '#BA7517' }}>{restaurant.stars}.0</span>
        </div>
        <div style={{ fontSize: 12, color: '#BA7517', fontWeight: 700 }}>{restaurant.details}</div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = restaurants.filter(r => {
    const query = search.toLowerCase();
    const inText =
      r.name.toLowerCase().includes(query) ||
      r.category.toLowerCase().includes(query) ||
      r.neighborhood.toLowerCase().includes(query);

    if (!inText) return false;
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Visited by friends') return r.details.toLowerCase().includes('friend') || r.details.toLowerCase().includes('wishlists');
    if (activeFilter === 'On wishlists') return r.details.toLowerCase().includes('wishlist');
    if (activeFilter === 'Highly rated') return r.stars >= 4.5;
    if (activeFilter === 'Near me') return r.neighborhood.toLowerCase().includes('downtown');
    return true;
  });

  return (
    <Layout>
      <div style={{ padding: '36px 48px', maxWidth: 1300, margin: '0 auto' }}>
        <h1 style={{ margin: '0 0 14px 0', fontSize: 28, fontWeight: 700, color: '#2C2C2A' }}>Explore restaurants</h1>

        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, cuisine, or neighbourhood..."
            style={{
              flex: 1,
              border: '1px solid #D4C9BB',
              borderRadius: 10,
              padding: '10px 14px',
              fontSize: 14,
              outline: 'none',
            }}
          />
          <button
            style={{
              background: '#fff',
              border: '1px solid #2C2C2A',
              borderRadius: 10,
              color: '#2C2C2A',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '10px 16px',
            }}
            onClick={() => setSearch(search)}
          >
            Search
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                cursor: 'pointer',
                borderRadius: 18,
                border: activeFilter === filter ? 'none' : '1px solid #D4C9BB',
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 700,
                color: activeFilter === filter ? '#fff' : '#4A4742',
                background: activeFilter === filter ? '#BA7517' : '#F8F4ED',
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {filtered.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
        </div>
      </div>
    </Layout>
  );
}

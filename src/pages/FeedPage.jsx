import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeedPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#F0EBE3', fontFamily: 'Georgia, serif' }}>
      
      {/* Navbar */}
      <nav style={{
        background: '#fff',
        borderBottom: '0.5px solid rgba(0,0,0,0.12)',
        height: 56,
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ color: '#BA7517', fontStyle: 'italic', fontSize: 20 }}>
          Big Backs Assemble
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: '40px 60px' }}>
        <h1 style={{ fontSize: 24, color: '#2C2C2A', marginBottom: 8 }}>
          Your friends' recent eats
        </h1>
        <p style={{ fontSize: 14, color: '#888780', marginBottom: 32 }}>
          Feed page — coming soon
        </p>
      </div>
    </div>
  );
}
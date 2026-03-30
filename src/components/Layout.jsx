import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import homeIcon from "../icons/home.png";
import searchIcon from "../icons/search.png";
import addReviewIcon from "../icons/add.png";
import messagesIcon from "../icons/message.png";
import wishlistIcon from "../icons/save.png";
import profileIcon from "../icons/profile.png";

const USER = {
  initials: 'JD',
  name: 'Jamie Dupont',
  city: 'Montreal',
  since: 2023,
  reviews: 34,
  friends: 3,
  saved: 12,
};

const NAV_ITEMS = [
  { icon: homeIcon,      label: 'Home Feed',   path: '/feed' },
  { icon: searchIcon,    label: 'Explore',     path: '/explore' },
  { icon: addReviewIcon, label: 'Add Review',  path: '/add-review' },
  { icon: messagesIcon,  label: 'Messages',    path: '/messages' },
  { icon: wishlistIcon,  label: 'My Wishlist', path: '/wishlist' },
  { icon: profileIcon,   label: 'My Profile',  path: '/profile' },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;

  return (
    <div style={{ minHeight: '100vh', background: '#F0EBE3', fontFamily: 'Georgia, serif' }}>

      {/* Top Navbar */}
      <nav style={{
        background: '#fff',
        borderBottom: '0.5px solid rgba(0,0,0,0.12)',
        height: 56,
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 100 }}>
          <div style={{ color: '#BA7517', fontStyle: 'italic', fontSize: 20 }}>
            Big Backs Assemble
          </div>
          {[
            { label: 'Feed',     path: '/feed' },
            { label: 'Explore',  path: '/explore' },
            { label: 'Messages', path: '/messages' },
          ].map(({ label, path }) => {
            const isActive = current === path || current.startsWith(path + '/');
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'Georgia, serif',
                  fontSize: 15,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? '#2C2C2A' : '#888780',
                  cursor: 'pointer',
                  padding: '0 4px 4px 40px',
                }}
              >
                <span style={{
                  borderBottom: isActive ? '2px solid #BA7517' : '2px solid transparent',
                  paddingBottom: 4,
                }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
        <div style={{
          width: 36, height: 36,
          borderRadius: '50%',
          background: '#C8C0E0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 13,
          letterSpacing: 0.5,
        }}>
          {USER.initials}
        </div>
      </nav>

      {/* Sidebar + Page Content */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 56px)' }}>

        {/* Sidebar */}
        <aside style={{
          width: 300,
          minWidth: 300,
          background: '#fff',
          borderRight: '0.5px solid rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 10px',
          gap: 4,
        }}>
          {NAV_ITEMS.map(({ icon, label, path }) => {
            const isActive = current === path || current.startsWith(path + '/');
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: isActive ? '#FAEEDA' : 'transparent',
                  color: isActive ? '#BA7517' : '#888780',
                  fontFamily: 'Georgia, serif',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#FAEEDA';
                    e.currentTarget.style.color = '#2C2C2A';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#888780';
                  }
                }}
              >
                <span style={{ width: 24, display: 'flex', justifyContent: 'center' }}>
                  <img src={icon} alt={label} style={{ width: 18, height: 18 }} />
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </aside>

        {/* Page-specific content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </div>

      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header({ toggleDarkMode, isDarkMode }) {
  const buttonStyle = {
    backgroundColor: 'transparent',
    color: isDarkMode ? '#fff' : '#8B0000',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isDarkMode ? '#222' : '#fdf9f9ff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.5s ease',
        flexWrap: 'wrap',
        minHeight: '64px',
      }}
    >
      {/* Logo on the Left */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={logo}
          alt="Bharakath Mutton Curry Shop Logo"
          style={{
            height: '50px',
            objectFit: 'contain',
            filter: isDarkMode ? 'brightness(0.85)' : 'none',
          }}
        />
        <div
          className="shop-name-animated"
          style={{
            marginLeft: '12px',
            fontWeight: 'bold',
            fontSize: 'clamp(1.05rem, 3vw, 1.7rem)',
            color: '#B22222',
            letterSpacing: '0.04em',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            minWidth: '120px',
            maxWidth: '100vw',
            overflow: 'visible',
            padding: '2px 8px',
            borderRadius: '6px',
            boxSizing: 'border-box',
            lineHeight: '1.1',
            transition: 'font-size 0.3s',
            boxShadow: '0 2px 8px rgba(178,34,34,0.08)',
            borderBottom: '3px solid #FFD700',
            background: '#fff',
            wordBreak: 'break-word',
            flexDirection: 'row',
            flexBasis: '100%',
          }}
        >
          {/* Render 'BHARAKATH MUTTON' on top, 'SHOP' below */}
          <span style={{ width: '100%', display: 'block' }}>
            {Array.from('BHARAKATH MUTTON').map((char, i) => (
              <span
                key={i}
                style={{
                  opacity: 0,
                  animation: `fadeInLetter 0.04s linear forwards`,
                  animationDelay: `${i * 0.08}s`,
                  marginRight: char === ' ' ? '0.1em' : '0',
                  display: 'inline-block',
                  fontFamily: 'Segoe UI, Arial, sans-serif',
                  fontWeight: 'bold',
                  color: '#B22222',
                  textShadow: '0 1px 4px rgba(178,34,34,0.10)',
                  borderRadius: '3px',
                  padding: '0 2px',
                }}
              >
                {char}
              </span>
            ))}
          </span>
          <span style={{ width: '100%', display: 'block', marginTop: '2px', fontSize: '1.1em', letterSpacing: '0.12em', color: '#B22222', fontWeight: 'bold' }}>
            {Array.from('SHOP').map((char, i) => (
              <span
                key={i + 100}
                style={{
                  opacity: 0,
                  animation: `fadeInLetter 0.04s linear forwards`,
                  animationDelay: `${(i + 16) * 0.08}s`,
                  marginRight: '0',
                  display: 'inline-block',
                  fontFamily: 'Segoe UI, Arial, sans-serif',
                  fontWeight: 'bold',
                  color: '#B22222',
                  textShadow: '0 1px 4px rgba(178,34,34,0.10)',
                  borderRadius: '3px',
                  padding: '0 2px',
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Hamburger menu for mobile - absolutely positioned top right */}
      <div className="header-hamburger" style={{ display: 'block' }}>
        <div style={{ position: 'relative', top: 0, right: 0 }}>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: menuOpen ? '#fff' : 'rgba(178,34,34,0.08)',
              border: menuOpen ? '2px solid #B22222' : 'none',
              cursor: 'pointer',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: '48px',
              minHeight: '48px',
              borderRadius: '50%',
              boxShadow: menuOpen ? '0 2px 12px rgba(178,34,34,0.18)' : '0 1px 4px rgba(178,34,34,0.10)',
              transition: 'all 0.2s',
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`hamburger-bar top-bar${menuOpen ? ' open' : ''}`} />
            <span className={`hamburger-bar middle-bar${menuOpen ? ' open' : ''}`} />
            <span className={`hamburger-bar bottom-bar${menuOpen ? ' open' : ''}`} />
          </button>
          {menuOpen && (
            <nav
              style={{
                position: 'absolute',
                top: '56px',
                right: 0,
                background: '#fff',
                boxShadow: '0 8px 32px rgba(178,34,34,0.22)',
                borderRadius: '18px',
                padding: '22px 0 10px 0',
                zIndex: 9999,
                minWidth: '220px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                border: '2px solid #B22222',
                animation: 'fadeInMenu 0.22s cubic-bezier(.4,2,.3,1)',
                gap: '8px',
              }}
            >
              <Link to="/productlist">
                <button style={{
                  ...buttonStyle,
                  width: '100%',
                  textAlign: 'left',
                  padding: '18px 26px',
                  fontSize: '19px',
                  borderBottom: '1px solid #eee',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#FFF8E1',
                  color: '#B22222',
                  boxShadow: '0 1px 6px #FFD70022',
                }}>
                  <span style={{ display: 'inline-block', width: 22, height: 22, marginRight: 2 }}>
                    {/* Meat icon */}
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <ellipse cx="11" cy="11" rx="9" ry="7" fill="#FFB347" stroke="#B22222" strokeWidth="2"/>
                      <circle cx="11" cy="11" r="3.5" fill="#FFD700" stroke="#B22222" strokeWidth="1.2"/>
                    </svg>
                  </span>
                  Varieties
                </button>
              </Link>
              <Link to="/order-history">
                <button style={{
                  ...buttonStyle,
                  width: '100%',
                  textAlign: 'left',
                  padding: '18px 26px',
                  fontSize: '19px',
                  borderBottom: '1px solid #eee',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#E3F2FD',
                  color: '#1565C0',
                  boxShadow: '0 1px 6px #90CAF9',
                }}>
                  <span style={{ display: 'inline-block', width: 22, height: 22, marginRight: 2 }}>
                    {/* History/clock icon */}
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="10" stroke="#1565C0" strokeWidth="2" fill="#BBDEFB"/>
                      <path d="M11 6v5l4 2" stroke="#1565C0" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  Order History
                </button>
              </Link>
              <Link to="/admin-login">
                <button style={{
                  ...buttonStyle,
                  width: '100%',
                  textAlign: 'left',
                  padding: '18px 26px',
                  fontSize: '19px',
                  borderBottom: 'none',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#F3E5F5',
                  color: '#6A1B9A',
                  boxShadow: '0 1px 6px #CE93D8',
                }}>
                  <span style={{ display: 'inline-block', width: 22, height: 22, marginRight: 2 }}>
                    {/* Admin shield icon */}
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M11 2l7 3v5c0 5.25-3.5 9.25-7 10-3.5-0.75-7-4.75-7-10V5l7-3z" fill="#CE93D8" stroke="#6A1B9A" strokeWidth="2"/>
                      <path d="M11 8v3" stroke="#6A1B9A" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="11" cy="14" r="1" fill="#6A1B9A"/>
                    </svg>
                  </span>
                  Admin Login
                </button>
              </Link>
            </nav>
          )}
        </div>
      </div>

      {/* Right Top Corner Buttons (desktop) */}
      <nav className="header-nav" style={{ display: 'flex', gap: '0px', alignItems: 'center' }}>
        <Link to="/productlist"><button style={buttonStyle}>Varieties</button></Link>
        <Link to="/order-history"><button style={buttonStyle}>Order History</button></Link>
        <Link to="/admin-login"><button style={buttonStyle}>Admin Login</button></Link>
      </nav>
    </header>
  );
}

// Add animation and responsive CSS safely for React
if (typeof document !== 'undefined' && !document.getElementById('shop-name-animated-style')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'shop-name-animated-style';
  styleSheet.textContent = `
    @keyframes fadeInLetter { to { opacity: 1; } }
    @keyframes fadeInMenu { from { opacity: 0; transform: translateY(-10px) scale(0.95); } to { opacity: 1; transform: none; } }
    @keyframes hamburgerTopOpen { 0% { transform: none; } 80% { transform: translateY(8px) rotate(45deg) scale(1.1); } 100% { transform: translateY(8px) rotate(45deg) scale(1); } }
    @keyframes hamburgerMiddleOpen { 0% { opacity: 1; } 100% { opacity: 0; } }
    @keyframes hamburgerBottomOpen { 0% { transform: none; } 80% { transform: translateY(-8px) rotate(-45deg) scale(1.1); } 100% { transform: translateY(-8px) rotate(-45deg) scale(1); } }
    @keyframes hamburgerBounce { 0% { transform: scale(1); } 40% { transform: scale(1.15); } 100% { transform: scale(1); } }
    .shop-name-animated span {
      opacity: 0;
      animation: fadeInLetter 0.04s linear forwards;
    }
    .hamburger-bar {
      width: 28px;
      height: 4px;
      background: #B22222;
      margin: 3px 0;
      border-radius: 2px;
      display: block;
      transition: all 0.25s cubic-bezier(.4,2,.3,1);
      position: relative;
      animation: hamburgerBounce 0.3s;
    }
    .hamburger-bar.top-bar.open {
      animation: hamburgerTopOpen 0.3s forwards;
    }
    .hamburger-bar.middle-bar.open {
      animation: hamburgerMiddleOpen 0.3s forwards;
    }
    .hamburger-bar.bottom-bar.open {
      animation: hamburgerBottomOpen 0.3s forwards;
    }
    .header-hamburger button:active {
      box-shadow: 0 0 0 4px #FFD70044;
      transform: scale(0.97);
    }
    .header-hamburger nav {
      box-shadow: 0 8px 32px rgba(178,34,34,0.22) !important;
      animation: fadeInMenu 0.22s cubic-bezier(.4,2,.3,1);
    }
    .header-hamburger nav button {
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    }
    .header-hamburger nav button:hover {
      background: #FFD70022;
      color: #B22222;
      box-shadow: 0 2px 8px #FFD70033;
    }
    .header-hamburger nav button:active {
      background: #FFD70044;
      color: #B22222;
      box-shadow: 0 2px 12px #FFD70055;
    }
    @media (max-width: 600px) {
      .header-nav {
        display: none !important;
      }
      .header-hamburger {
        display: block !important;
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        z-index: 1001 !important;
      }
      header {
        flex-direction: column !important;
        align-items: flex-start !important;
        padding: 10px 8px !important;
      }
      .shop-name-animated {
        font-size: 1.1rem !important;
        padding: 2px 4px !important;
      }
      .header-hamburger button {
        min-width: 44px !important;
        min-height: 44px !important;
      }
      .header-hamburger nav {
        top: 54px !important;
        right: 0 !important;
      }
      .shop-name-animated img {
        margin-bottom: 6px !important;
      }
    }
    @media (min-width: 601px) {
      .header-hamburger {
        display: none !important;
      }
      .header-nav {
        display: flex !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Header;

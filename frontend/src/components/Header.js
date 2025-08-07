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
            fontSize: 'clamp(1.1rem, 4vw, 2rem)',
            color: '#B22222',
            letterSpacing: '0.09em',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            minWidth: '120px',
            maxWidth: '100vw',
            overflow: 'hidden',
            padding: '2px 8px',
            borderRadius: '6px',
            boxSizing: 'border-box',
            lineHeight: '1.1',
            transition: 'font-size 0.3s',
            boxShadow: '0 2px 8px rgba(178,34,34,0.08)',
            borderBottom: '3px solid #FFD700',
            background: '#fff',
          }}
        >
          {Array.from('BHARAKATH MUTTON SHOP').map((char, i) => (
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
        </div>
      </div>

      {/* Hamburger menu for mobile - absolutely positioned top right */}
      <div className="header-hamburger" style={{ display: 'none' }}>
        <div style={{ position: 'absolute', top: 16, right: 0
          
         }}>
          <button
            aria-label="Open menu"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span style={{ width: '28px', height: '4px', background: '#B22222', margin: '3px 0', borderRadius: '2px', display: 'block' }}></span>
            <span style={{ width: '28px', height: '4px', background: '#B22222', margin: '3px 0', borderRadius: '2px', display: 'block' }}></span>
            <span style={{ width: '28px', height: '4px', background: '#B22222', margin: '3px 0', borderRadius: '2px', display: 'block' }}></span>
          </button>
          {menuOpen && (
            <nav
              style={{
                position: 'absolute',
                top: '44px',
                right: 0,
                background: '#fff',
                boxShadow: '0 2px 8px rgba(178,34,34,0.12)',
                borderRadius: '8px',
                padding: '10px 0',
                zIndex: 9999,
                minWidth: '160px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
              }}
            >
              <Link to="/productlist"><button style={{ ...buttonStyle, width: '100%', textAlign: 'left', padding: '12px 18px' }}>Varieties</button></Link>
              <Link to="/order-history"><button style={{ ...buttonStyle, width: '100%', textAlign: 'left', padding: '12px 18px' }}>Order History</button></Link>
              <Link to="/admin-login"><button style={{ ...buttonStyle, width: '100%', textAlign: 'left', padding: '12px 18px' }}>Admin Login</button></Link>
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
    .shop-name-animated span {
      opacity: 0;
      animation: fadeInLetter 0.04s linear forwards;
    }
    @media (max-width: 600px) {
      .header-nav {
        display: none !important;
      }
      .header-hamburger {
        display: block !important;
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

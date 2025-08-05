import React from 'react';

const Banner = () => (
  <div style={{
    width: '100%',
    minHeight: '180px',
    background: 'linear-gradient(90deg, #B22222 60%, #fff0f0 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: '0 0 32px 32px',
    marginBottom: '20px',
    overflow: 'hidden',
  }}>
    <img src="/images/normal.jpeg" alt="Mutton Curry Banner" style={{
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover',
      boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
      marginRight: '32px',
      border: '4px solid #fff',
      animation: 'float 2.5s ease-in-out infinite',
    }} />
    <div>
      <h2 style={{ color: '#fff', fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '8px', textShadow: '1px 2px 8px #B22222' }}>
        Taste the Tradition
      </h2>
      <p style={{ color: '#fff', fontSize: '1.1rem', maxWidth: '350px', textShadow: '1px 1px 6px #B22222' }}>
        Premium mutton curries, delivered fresh. Order now and enjoy exclusive offers!
      </p>
    </div>
    <style>{`
      @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
        100% { transform: translateY(0); }
      }
    `}</style>
  </div>
);

export default Banner;

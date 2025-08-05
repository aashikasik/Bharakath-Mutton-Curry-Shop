import React from 'react';

const stats = [
  { label: 'Orders Delivered', value: '10K+', icon: '📦' },
  { label: 'Customer Rating', value: '4.5★', icon: '' },
  { label: 'Satisfaction & Halal', value: '100%', icon: '😊' },
];

const InfoBar = () => (
  <div style={{
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    marginTop: '-12px',
    marginBottom: '24px',
    background: 'linear-gradient(90deg, #B22222 60%, #FFD700 100%)',
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(178,34,34,0.09)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '18px 0',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    letterSpacing: '1px',
    animation: 'fadeIn 1.5s',
  }}>
    {stats.map((stat, idx) => (
      <div key={idx} style={{ textAlign: 'center', animation: `countUp 2s` }}>
        <span style={{ fontSize: '2rem', display: 'block' }}>{stat.icon} {stat.value}</span>
        {stat.label}
      </div>
    ))}
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes countUp {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
    `}</style>
  </div>
);

export default InfoBar;

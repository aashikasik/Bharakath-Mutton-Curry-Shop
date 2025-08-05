import React from 'react';

const SocialProofBadges = () => (
  <section style={{
    background: 'linear-gradient(90deg, #fff0f0 60%, #FFD700 100%)',
    borderRadius: '16px',
    boxShadow: '0 2px 12px #FFD70044',
    maxWidth: '900px',
    margin: '30px auto',
    padding: '24px',
    textAlign: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 1px 6px #FFD70044',
      padding: '16px 24px',
      fontWeight: 'bold',
      color: '#B22222',
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <span role="img" aria-label="users">👥</span> Trusted by 10,000+ Customers
    </div>
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 1px 6px #FFD70044',
      padding: '16px 24px',
      fontWeight: 'bold',
      color: '#B22222',
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <span role="img" aria-label="certificate">🛡️</span> FSSAI Certified
    </div>
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 1px 6px #FFD70044',
      padding: '16px 24px',
      fontWeight: 'bold',
      color: '#B22222',
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <span role="img" aria-label="star">⭐</span> Top Rated on Google
    </div>
  </section>
);

export default SocialProofBadges;

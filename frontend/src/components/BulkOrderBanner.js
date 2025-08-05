import React from 'react';

const BulkOrderBanner = () => (
  <section style={{
    background: 'linear-gradient(90deg, #FFD700 60%, #B22222 100%)',
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(178,34,34,0.09)',
    maxWidth: '900px',
    margin: '30px auto',
    padding: '24px',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  }}>
    <h2>Bulk Orders & Party Bookings</h2>
    <p style={{ fontWeight: 'normal', color: '#fff', marginBottom: '12px' }}>
      Planning a party or event? Get special pricing and custom menu options for bulk orders!
    </p>
    <a href="https://wa.me/9688452311" target="_blank" rel="noopener noreferrer" style={{
      background: '#fff',
      color: '#B22222',
      padding: '10px 24px',
      borderRadius: '24px',
      fontWeight: 'bold',
      textDecoration: 'none',
      boxShadow: '0 2px 8px #FFD70044',
      transition: 'background 0.3s',
      display: 'inline-block',
    }}>Contact for Bulk Order</a>
  </section>
);

export default BulkOrderBanner;

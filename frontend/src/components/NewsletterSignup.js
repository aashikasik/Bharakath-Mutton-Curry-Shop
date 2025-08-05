import React from 'react';

const NewsletterSignup = () => (
  <section style={{
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    maxWidth: '900px',
    margin: '30px auto',
    padding: '24px',
    textAlign: 'center',
  }}>
    <h2 style={{ color: '#B22222', marginBottom: '18px' }}>Subscribe for Offers & Updates</h2>
    <form onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing!'); }} style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <input type="email" required placeholder="Enter your email" style={{
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #FFD700',
        fontSize: '1rem',
        width: '220px',
      }} />
      <button type="submit" style={{
        background: '#B22222',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 18px',
        fontWeight: 'bold',
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 1px 4px #FFD70044',
      }}>Subscribe</button>
    </form>
  </section>
);

export default NewsletterSignup;

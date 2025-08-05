import React from 'react';

const offers = [
  {
    title: 'Bulk Order Discount',
    description: 'Get 10% off on orders above ₹2000!'
  },
  {
    title: 'Weekend Special',
    description: 'Free delivery on all orders every Sunday.'
  },
  {
    title: 'Refer & Earn',
    description: 'Refer a friend and get ₹100 cashback on your next order.'
  }
];

const SpecialOffers = () => (
  <section style={{
    background: 'linear-gradient(90deg, #fff0f0 60%, #B22222 100%)',
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    maxWidth: '900px',
    margin: '30px auto',
    padding: '24px',
    textAlign: 'center',
    color: '#B22222',
  }}>
    <h2 style={{ marginBottom: '18px' }}>Special Offers & Promotions</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '18px' }}>
      {offers.map((offer, idx) => (
        <div key={idx} style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '18px',
          minWidth: '220px',
          maxWidth: '280px',
          boxShadow: '0 1px 6px rgba(178,34,34,0.07)',
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '6px' }}>{offer.title}</div>
          <div style={{ fontSize: '1rem' }}>{offer.description}</div>
        </div>
      ))}
    </div>
  </section>
);

export default SpecialOffers;

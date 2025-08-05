import React from 'react';

const featuredDish = {
  name: 'BoneLess Mutton Curry',
  image: '/images/boneless.jpeg',
  description: 'Tender boneless mutton cooked in homemade spices. Perfect for family feasts!',
  price: '₹1000',
};

const FeaturedDish = () => (
  <section style={{
    background: 'linear-gradient(90deg, #fff0f0 60%, #FFD700 100%)',
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(178,34,34,0.09)',
    maxWidth: '900px',
    margin: '30px auto',
    padding: '24px',
    textAlign: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '24px',
  }}>
    <img src={featuredDish.image} alt={featuredDish.name} style={{ width: '120px', height: '120px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 2px 12px #FFD70044' }} />
    <div style={{ flex: 1 }}>
      <h2 style={{ color: '#B22222', fontWeight: 'bold', marginBottom: '8px' }}>Featured Dish of the Day</h2>
      <h3 style={{ margin: '0 0 8px 0' }}>{featuredDish.name}</h3>
      <p style={{ marginBottom: '8px', color: '#444' }}>{featuredDish.description}</p>
      <div style={{ fontWeight: 'bold', color: '#FFD700', fontSize: '1.2rem', marginBottom: '8px' }}>{featuredDish.price}</div>
      <a href="/order/2" style={{
        background: '#B22222',
        color: '#fff',
        padding: '10px 24px',
        borderRadius: '24px',
        fontWeight: 'bold',
        textDecoration: 'none',
        boxShadow: '0 2px 8px #B2222244',
        transition: 'background 0.3s',
        display: 'inline-block',
      }}>Order Now</a>
    </div>
  </section>
);

export default FeaturedDish;

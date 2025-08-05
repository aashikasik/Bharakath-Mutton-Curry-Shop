import React from 'react';

const reviews = [
  {
    name: 'Aarav S.',
    text: 'Best mutton curry I have ever tasted! Super fresh and delivered on time.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'Aug 2025'
  },
  {
    name: 'Priya R.',
    text: 'Loved the hygiene and quality. My family enjoyed every bite!',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'Jul 2025'
  },
  {
    name: 'Vikram T.',
    text: 'Good packaging and great taste. Highly recommended!',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    date: 'Jun 2025'
  }
];

const CustomerReviews = () => (
  <section style={{
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    maxWidth: '900px',
    margin: '30px auto',
    padding: '24px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  }}>
    <h2 style={{ color: '#B22222', marginBottom: '18px' }}>Customer Reviews</h2>
    <div style={{
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      gap: '18px',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      paddingBottom: '10px',
    }}>
      {reviews.map((review, idx) => (
        <div key={idx} style={{
          background: '#f9f9ff',
          borderRadius: '12px',
          padding: '18px',
          minWidth: '220px',
          maxWidth: '280px',
          boxShadow: '0 1px 6px rgba(178,34,34,0.07)',
          textAlign: 'center',
          scrollSnapAlign: 'center',
          animation: `fadeIn 0.8s ${0.2 * idx}s both`,
        }}>
          <img src={review.avatar} alt={review.name} style={{ width: '48px', height: '48px', borderRadius: '50%', marginBottom: '8px', boxShadow: '0 2px 8px #FFD70044' }} />
          <div style={{ fontWeight: 'bold', color: '#B22222', marginBottom: '2px' }}>{review.name}</div>
          <div style={{ fontSize: '0.95rem', marginBottom: '8px', color: '#444' }}><em>“{review.text}”</em></div>
          <div style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: '4px' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
          <div style={{ fontSize: '0.85rem', color: '#888' }}>{review.date}</div>
        </div>
      ))}
    </div>
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </section>
);

export default CustomerReviews;

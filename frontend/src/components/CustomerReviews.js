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
  },
  {
    name: 'Meera D.',
    text: 'The spices were perfect and the meat was so tender. Will order again!',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    date: 'May 2025'
  },
  {
    name: 'Rohan K.',
    text: 'Quick delivery and the curry was still hot. Great service!',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    date: 'Apr 2025'
  },
  {
    name: 'Sahana M.',
    text: 'My kids loved the boneless mutton. Very tasty!',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    date: 'Mar 2025'
  },
  {
    name: 'Imran P.',
    text: 'Authentic taste and generous portions. Highly satisfied.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    date: 'Feb 2025'
  },
  {
    name: 'Divya S.',
    text: 'The thala curry was a hit at our family gathering!',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    date: 'Jan 2025'
  },
  {
    name: 'Arjun N.',
    text: 'Good value for money. Will recommend to friends.',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
    date: 'Dec 2024'
  },
  {
    name: 'Lakshmi V.',
    text: 'Loved the customer support and easy ordering process.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    date: 'Nov 2024'
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
    overflow: 'visible',
  }}>
    <h2 style={{ color: '#B22222', marginBottom: '18px' }}>Customer Reviews</h2>
    <div style={{
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      gap: '18px',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      paddingBottom: '18px',
      paddingLeft: '12px',
      scrollbarWidth: 'thin',
      scrollbarColor: '#FFD700 #f9f9ff',
      msOverflowStyle: 'auto',
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
          scrollSnapAlign: idx === 0 ? 'start' : 'center',
          animation: `fadeIn 0.8s ${0.2 * idx}s both`,
        }} className="review-card">
          <img src={review.avatar} alt={review.name} style={{ width: '48px', height: '48px', borderRadius: '50%', marginBottom: '8px', boxShadow: '0 2px 8px #FFD70044', objectFit: 'cover' }} />
          <div style={{ fontWeight: 'bold', color: '#B22222', marginBottom: '2px', fontSize: '1.05rem' }}>{review.name}</div>
          <div style={{ fontSize: '0.98rem', marginBottom: '8px', color: '#444', lineHeight: '1.4', wordBreak: 'break-word' }}><em>“{review.text}”</em></div>
          <div style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: '4px', letterSpacing: '1px' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
          <div style={{ fontSize: '0.85rem', color: '#888' }}>{review.date}</div>
        </div>
      ))}
    </div>
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      /* Mobile review tweaks */
      @media (max-width: 600px) {
        section {
          padding: 12px !important;
        }
        .review-card {
          min-width: 85vw !important;
          max-width: 95vw !important;
          padding: 14px !important;
          font-size: 0.98rem !important;
        }
        .review-card img {
          width: 40px !important;
          height: 40px !important;
        }
        .review-card div {
          font-size: 0.97rem !important;
        }
        .review-card em {
          font-size: 0.97rem !important;
        }
        .review-card {
          margin-right: 8px !important;
        }
        .review-card:last-child {
          margin-right: 0 !important;
        }
        /* Show horizontal scroll indicator */
        div[style*='overflow-x: auto'] {
          scrollbar-width: thin;
          scrollbar-color: #FFD700 #f9f9ff;
        }
      }
      /* Custom scrollbar for desktop */
      @media (min-width: 601px) {
        div[style*='overflow-x: auto']::-webkit-scrollbar {
          height: 8px;
        }
        div[style*='overflow-x: auto']::-webkit-scrollbar-thumb {
          background: #FFD700;
          border-radius: 4px;
        }
        div[style*='overflow-x: auto']::-webkit-scrollbar-track {
          background: #f9f9ff;
        }
      }
    `}</style>
  </section>
);

export default CustomerReviews;

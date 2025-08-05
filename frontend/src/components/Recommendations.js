import React, { useState, useEffect } from 'react';

const Recommendations = ({ phone }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!phone) return;
    setLoading(true);
    setError('');
    fetch(`http://localhost:5000/api/recommendations?phone=${phone}`)
      .then(res => res.json())
      .then(data => {
        if (data.recommendations) setRecommendations(data.recommendations);
        else setError(data.error || 'No recommendations found');
        setLoading(false);
      })
      .catch(() => {
        setError('Network error');
        setLoading(false);
      });
  }, [phone]);

  if (!phone) return null;

  return (
    <div style={{
      background: 'linear-gradient(90deg, #fffbe6 0%, #FFD700 100%)',
      borderRadius: 16,
      boxShadow: '0 2px 12px #FFD70022',
      padding: '18px',
      margin: '24px auto',
      maxWidth: 400,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      color: '#B22222',
      textAlign: 'center',
    }}>
      <h3 style={{ marginBottom: 12, fontWeight: 'bold', fontSize: '1.2rem' }}>🍽️ Recommended For You</h3>
      {loading && <div style={{ color: '#888' }}>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {recommendations.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {recommendations.map((item, idx) => (
            <li key={idx} style={{
              background: '#fff',
              borderRadius: 10,
              margin: '8px 0',
              padding: '10px 0',
              fontWeight: 'bold',
              fontSize: '1.05rem',
              boxShadow: '0 1px 4px #FFD70022',
            }}>
              {item}
            </li>
          ))}
        </ul>
      )}
      {(!loading && !error && recommendations.length === 0) && (
        <div style={{ color: '#888' }}>No recommendations yet.</div>
      )}
    </div>
  );
};

export default Recommendations;

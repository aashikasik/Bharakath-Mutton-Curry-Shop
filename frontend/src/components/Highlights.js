import React from 'react';
import './Highlights.css';

const Highlights = () => {
  return (
    <>
      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          padding: '32px 10px',
          background: 'linear-gradient(90deg, #fff0f0 60%, #f9f9ff 100%)',
          borderRadius: '24px',
          boxShadow: '0 4px 24px rgba(178,34,34,0.07)',
          margin: '24px auto',
          maxWidth: '900px',
        }}
      >
        {/* Hygiene Highlight with Icon */}
        <div style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 2px 12px rgba(178,34,34,0.09)',
          padding: '24px',
          minWidth: '220px',
          textAlign: 'center',
          animation: 'fadeIn 1s',
        }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>🧼</div>
          <h2 style={{
            color: '#B22222',
            fontWeight: 'bold',
            fontSize: '1.3rem',
            marginBottom: '10px',
            letterSpacing: '1px',
            animation: 'blinker 1.5s linear infinite',
          }}>Best Hygiene & Health Standards</h2>
          <span style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #FFD700 60%, #fff0f0 100%)',
            color: '#B22222',
            borderRadius: '12px',
            padding: '8px 18px',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 2px 8px rgba(178,34,34,0.12)',
            marginBottom: '8px',
            animation: 'pulse 1.5s infinite',
          }}>Next Day Fresh Delivery</span>
        </div>
        {/* Halal Highlight with Icon */}
        <div style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 2px 12px rgba(178,34,34,0.09)',
          padding: '24px',
          minWidth: '220px',
          textAlign: 'center',
          animation: 'fadeIn 1.2s',
        }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>🕌</div>
          <h2 style={{
            color: '#B22222',
            fontWeight: 'bold',
            fontSize: '1.3rem',
            marginBottom: '10px',
            letterSpacing: '1px',
            animation: 'blinker 1.5s linear infinite',
          }}>Halal Certified Quality</h2>
          <span style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #FFD700 60%, #fff0f0 100%)',
            color: '#B22222',
            borderRadius: '12px',
            padding: '8px 18px',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 2px 8px rgba(178,34,34,0.12)',
            marginBottom: '8px',
            animation: 'pulse 1.5s infinite',
          }}>100% Refund Guarantee</span>
        </div>
        {/* Refund Highlight with Icon */}
        <div style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 2px 12px rgba(178,34,34,0.09)',
          padding: '24px',
          minWidth: '220px',
          textAlign: 'center',
          animation: 'fadeIn 1.4s',
        }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>💸</div>
          <h2 style={{
            color: '#B22222',
            fontWeight: 'bold',
            fontSize: '1.3rem',
            marginBottom: '10px',
            letterSpacing: '1px',
            animation: 'blinker 1.5s linear infinite',
          }}>100% Refund Guarantee</h2>
          <span style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #FFD700 60%, #fff0f0 100%)',
            color: '#B22222',
            borderRadius: '12px',
            padding: '8px 18px',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 2px 8px rgba(178,34,34,0.12)',
            marginBottom: '8px',
            animation: 'pulse 1.5s infinite',
          }}>Order with Confidence</span>
        </div>
      </section>


      {/* Call-to-Action Button */}
      <div style={{ textAlign: 'center', margin: '24px 0' }}>
        <a href="#products" style={{
          background: '#B22222',
          color: '#fff',
          padding: '14px 36px',
          borderRadius: '30px',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          textDecoration: 'none',
          boxShadow: '0 2px 8px #B2222244',
          transition: 'background 0.3s',
          display: 'inline-block',
        }}>Order Now</a>
      </div>

      {/* Contact Button */}
      <div style={{ textAlign: 'center', margin: '12px 0' }}>
        <a href="https://wa.me/9688452311" target="_blank" rel="noopener noreferrer" style={{
          background: '#25D366',
          color: '#fff',
          borderRadius: '30px',
          padding: '12px 28px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          textDecoration: 'none',
          boxShadow: '0 2px 8px #25D36644',
          transition: 'background 0.3s',
          display: 'inline-block',
        }}>Contact on WhatsApp</a>
      </div>

      {/* Share Button */}
      <div style={{ textAlign: 'center', margin: '12px 0' }}>
        <button
          style={{
            background: '#eec50bff',
            color: '#B22222',
            border: 'none',
            borderRadius: '30px',
            padding: '12px 28px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px #FFD70044',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Bharakath Mutton Curry Shop',
                text: 'Order delicious mutton curries online!',
                url: window.location.href,
              });
            } else {
              alert('Share feature is not supported on your device.');
            }
          }}
        >
          Share This Page
        </button>
      </div>

      <style>{`
        @keyframes blinker {
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0% { text-shadow: 0 0 8px #B22222; }
          100% { text-shadow: 0 0 24px #FFD700; }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 #FFD70044; }
          70% { box-shadow: 0 0 0 12px #FFD70022; }
          100% { box-shadow: 0 0 0 0 #FFD70044; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default Highlights;

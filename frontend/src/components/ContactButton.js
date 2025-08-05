import React from 'react';
import whatsappLogo from '../assets/whatsapp.png';

const whatsappNumber = '9688452311'; 

const ContactButton = () => (
  <div style={{
    position: 'fixed',
    bottom: '120px', // moved higher above live chat button
    right: '24px',
    zIndex: 9999,
  }}>
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        background: '#25D366',
        color: '#fff',
        borderRadius: '50%',
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(37,211,102,0.15)',
        textDecoration: 'none',
        transition: 'background 0.3s',
        animation: 'pulse 1.5s infinite',
      }}
      title="Chat on WhatsApp"
    >
      <img src={whatsappLogo} alt="WhatsApp" style={{ width: '22px', height: '22px' }} />
    </a>
    <style>{`
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 #25D36644; }
        70% { box-shadow: 0 0 0 12px #25D36622; }
        100% { box-shadow: 0 0 0 0 #25D36644; }
      }
    `}</style>
  </div>
);

export default ContactButton;

import React from 'react';
import facebookLogo from '../assets/facebook.png';
import instagramLogo from '../assets/instagram.png';
import linkedInLogo from '../assets/linkedin.png';

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/share/1CcLsuG6fh/', icon: facebookLogo },
  { name: 'Instagram', url: 'https://instagram.com/iamashikmd', icon: instagramLogo },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/asik-mohamed-b9b526250/', icon: linkedInLogo },
];

const SocialMediaLinks = () => (
  <section style={{
    textAlign: 'center',
    margin: '30px 0',
    padding: '12px 0',
  }}>
    <h3 style={{ color: '#B22222', marginBottom: '10px' }}>Follow Us</h3>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '18px' }}>
      {socialLinks.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#fff0f0',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 6px rgba(178,34,34,0.07)',
            textDecoration: 'none',
            transition: 'background 0.3s',
          }}
          title={link.name}
        >
          <img src={link.icon} alt={link.name} style={{ width: '28px', height: '28px' }} />
        </a>
      ))}
    </div>
  </section>
);

export default SocialMediaLinks;

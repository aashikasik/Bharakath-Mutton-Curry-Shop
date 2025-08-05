import React, { useState } from 'react';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Select your favorite dish, click Order Now, and follow the instructions.'
  },
  {
    question: 'Do you offer bulk/party orders?',
    answer: 'Yes! Contact us via WhatsApp for special pricing and arrangements.'
  },
  {
    question: 'Is delivery available in my area?',
    answer: 'We deliver across the city. Enter your address at checkout to confirm.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept UPI, cards, and cash on delivery.'
  }
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section style={{
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      maxWidth: '900px',
      margin: '30px auto',
      padding: '24px',
      textAlign: 'left',
    }}>
      <h2 style={{ color: '#B22222', marginBottom: '18px', textAlign: 'center' }}>Frequently Asked Questions</h2>
      {faqs.map((faq, idx) => (
        <div key={idx} style={{ marginBottom: '12px' }}>
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            style={{
              background: '#ffffffff',
              color: '#0c0b0bff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              fontWeight: 'bold',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              marginBottom: '4px',
              boxShadow: '0 1px 4px #FFD70044',
            }}
          >
            {faq.question}
          </button>
          {openIdx === idx && (
            <div style={{
              background: '#fff0f0',
              color: '#333',
              borderRadius: '8px',
              padding: '10px 16px',
              boxShadow: '0 1px 4px #B2222244',
            }}>
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default FAQSection;

import React from 'react';

const ProgressBar = ({ status }) => {
  const steps = [
    'Order Placed',
    'Preparing',
    'Out for Delivery',
    'Delivered'
  ];
  const currentStep = steps.indexOf(status);
  return (
    <div style={{
      maxWidth: '900px',
      margin: '30px auto',
      padding: '24px',
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      textAlign: 'center',
    }}>
      <h2 style={{ color: '#B22222', marginBottom: '18px' }}>Sample Delivery Status</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        {steps.map((step, idx) => (
          <div key={step} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: idx <= currentStep ? '#B22222' : '#FFD700',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 6px auto',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 1px 6px #FFD70044',
              transition: 'background 0.3s',
            }}>{idx + 1}</div>
            <div style={{ fontSize: '0.95rem', color: idx <= currentStep ? '#B22222' : '#888', fontWeight: idx <= currentStep ? 'bold' : 'normal' }}>{step}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '18px', color: '#B22222', fontWeight: 'bold' }}>Current Status: {status}</div>
    </div>
  );
};

ProgressBar.defaultProps = {
  status: 'Preparing',
};

export default ProgressBar;

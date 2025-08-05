import React from 'react';

function OrderTimeline() {
  const steps = [
    { id: 1, title: '1. Order Placed', description: 'Your mutton curry order is successfully placed.' },
    { id: 2, title: '2. Order Confirmed', description: 'We confirm your order and start preparing.' },
    { id: 3, title: '3. Cooking in Progress', description: 'Fresh mutton curry is being prepared by our chefs.' },
    { id: 4, title: '4. Ready for Pickup / Delivery', description: 'Your order is ready to be picked up or delivered.' },
    { id: 5, title: '5. Order Completed', description: 'Enjoy your delicious Bharakath Mutton Curry!' },
  ];

  return (
    <section style={{ padding: '40px 20px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>How Our Order System Works</h2>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {steps.map((step, index) => (
          <div
            key={step.id}
            style={{
              borderLeft: '4px solid #B22222',
              padding: '10px 20px',
              marginBottom: '25px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '-14px',
                top: '10px',
                backgroundColor: '#B22222',
                color: '#fff',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '24px',
                fontWeight: 'bold',
              }}
            >
              {step.id}
            </div>
            <h3 style={{ marginBottom: '5px' }}>{step.title}</h3>
            <p style={{ margin: 0 }}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderTimeline;

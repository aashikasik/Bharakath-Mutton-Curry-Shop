import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <span key={interval} style={{ margin: '0 4px', fontWeight: 'bold' }}>
        {timeLeft[interval]} {interval}
      </span>
    );
  });

  return (
    <div style={{
      background: 'linear-gradient(90deg, #FFD700 60%, #B22222 100%)',
      color: '#fff',
      borderRadius: '16px',
      boxShadow: '0 2px 12px #FFD70044',
      maxWidth: '900px',
      margin: '30px auto',
      padding: '24px',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '1.1rem',
    }}>
      <h2>Special Offer Ends In:</h2>
      <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
        {timerComponents.length ? timerComponents : <span>Offer Ended!</span>}
      </div>
      <div style={{ fontWeight: 'normal', color: '#fff' }}>
        Hurry! Get 10% off on all orders above ₹2000.
      </div>
    </div>
  );
};

CountdownTimer.defaultProps = {
  endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
};

export default CountdownTimer;

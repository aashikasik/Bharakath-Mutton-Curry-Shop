// src/pages/OrderStatusPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderStatusTimeline from '../components/OrderStatusTimeline';

function OrderStatusPage() {
  const { orderId } = useParams();
  const [status, setStatus] = useState('Order Received');

  useEffect(() => {
    // Simulate backend status updates (replace with real API calls)
    const stages = ['Order Received', 'Cooking', 'Packing', 'Out for Delivery', 'Delivered'];
    let index = 0;

    const interval = setInterval(() => {
      if (index < stages.length) {
        setStatus(stages[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 3000); // change status every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '30px', backgroundColor: '#f9f9f9', minHeight: '80vh' }}>
      <h2 style={{ textAlign: 'center' }}>Track Your Order</h2>
      <p style={{ textAlign: 'center', color: '#666' }}>Order ID: {orderId}</p>
      <OrderStatusTimeline currentStatus={status} />
    </div>
  );
}

export default OrderStatusPage;

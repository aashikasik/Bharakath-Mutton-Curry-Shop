// src/pages/OrderStatusPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderStatusTimeline from '../components/OrderStatusTimeline';
import axios from 'axios';

function OrderStatusPage() {
  const { orderId } = useParams();
  const [status, setStatus] = useState('Order Received');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
  const response = await axios.get(`https://bharakath-mutton-curry-shop-1.onrender.com/api/order-status/${orderId}`);
        setStatus(response.data.status);
      } catch (err) {
        console.error('Error fetching order status:', err);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <div style={{ padding: '30px', backgroundColor: '#f9f9f9', minHeight: '80vh' }}>
      <h2 style={{ textAlign: 'center' }}>Track Your Order</h2>
      <p style={{ textAlign: 'center', color: '#666' }}>Order ID: {orderId}</p>
      <OrderStatusTimeline currentStatus={status} />
    </div>
  );
}

export default OrderStatusPage;

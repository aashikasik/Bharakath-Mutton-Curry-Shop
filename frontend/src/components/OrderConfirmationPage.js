import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// ...existing code...

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  fetch(`https://bharakath-mutton-curry-shop-1.onrender.com/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch order details.');
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <p style={{ padding: '40px', textAlign: 'center' }}>Loading your order details...</p>;
  if (error) return <p style={{ padding: '40px', color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!order) return <p style={{ padding: '40px', color: 'red', textAlign: 'center' }}>Order not found.</p>;

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f9f9ff', minHeight: '80vh', maxWidth: '500px', margin: '40px auto', borderRadius: '16px', boxShadow: '0 2px 12px #FFD70022' }}>
      <h2 style={{ color: '#25D366', textAlign: 'center', marginBottom: '18px' }}>🎉 Order Placed Successfully!</h2>
      <div style={{ fontSize: '1.15rem', color: '#333', marginBottom: '18px', textAlign: 'center' }}>
        Thank you, <strong>{order.name}</strong>!<br />
        Your order for <strong>{order.item_name}</strong> (<strong>{order.quantity}</strong>) has been received.<br />
        <span style={{ color: '#B22222' }}>We will notify you when your order is out for delivery.</span>
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', padding: '18px', marginBottom: '18px', boxShadow: '0 1px 6px #FFD70022' }}>
        <p><strong>Order ID:</strong> <span style={{ color: '#B22222' }}>{order.id || order.order_id}</span></p>
        <p><strong>Delivery Address:</strong> {order.address}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Status:</strong> <span style={{ color: '#25D366', fontWeight: 'bold' }}>{order.status || 'Order Received'}</span></p>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <Link to={`/order-status/${order.id || order.order_id}`} style={{
          background: 'linear-gradient(90deg, #FFD700 60%, #25D366 100%)',
          color: '#fff',
          padding: '12px 28px',
          borderRadius: '30px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          textDecoration: 'none',
          boxShadow: '0 2px 8px #FFD70044',
          transition: 'background 0.3s',
        }}>
          🚚 Track Your Order Status
        </Link>
      </div>
      <div style={{ textAlign: 'center', color: '#888', fontSize: '0.95rem' }}>
        You will also receive WhatsApp updates on your order.
      </div>

      // ...existing code...
    </div>
  );
};

export default OrderConfirmationPage;

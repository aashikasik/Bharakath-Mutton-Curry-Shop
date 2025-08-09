import React, { useState } from 'react';

const OrderHistory = () => {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHistory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrders([]);
    try {
  const res = await fetch(`https://bharakath-mutton-curry-shop-1.onrender.com/api/orders/history?phone=${phone}`);
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
      } else {
        setError(data.error || 'Failed to fetch order history');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f9f9ff', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#B22222', fontWeight: 'bold', fontSize: '2rem', marginBottom: '18px' }}>📜 Your Order History</h2>
      <form onSubmit={fetchHistory} style={{ textAlign: 'center', marginBottom: '24px' }}>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #FFD700', fontSize: '1rem', minWidth: '220px', marginRight: '12px' }}
          maxLength={10}
        />
        <button
          type="submit"
          style={{ background: '#FFD700', color: '#B22222', border: 'none', borderRadius: '8px', padding: '10px 18px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 1px 4px #FFD70044' }}
        >
          🔍 View Orders
        </button>
      </form>
      {loading && <p style={{ textAlign: 'center', color: '#888' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      {orders.length > 0 && (
        <div style={{ overflowX: 'auto', borderRadius: '16px', boxShadow: '0 2px 12px rgba(178,34,34,0.07)', background: '#fff', maxWidth: '700px', margin: '0 auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead style={{ backgroundColor: '#FFD700' }}>
              <tr>
                <th style={cellStyle}>Order ID</th>
                <th style={cellStyle}>Item</th>
                <th style={cellStyle}>Qty</th>
                <th style={cellStyle}>Order Time</th>
                <th style={cellStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f9f9ff' }}>
                  <td style={cellStyle}>{order.id || order.order_id}</td>
                  <td style={cellStyle}>{order.item_name}</td>
                  <td style={cellStyle}>{order.quantity}</td>
                  <td style={cellStyle}>{order.order_time ? new Date(order.order_time).toLocaleString() : '-'}</td>
                  <td style={cellStyle}>{order.status || 'Order Received'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {orders.length === 0 && !loading && !error && (
        <p style={{ textAlign: 'center', color: '#888', fontSize: '1.1rem' }}>No orders found for this number.</p>
      )}
    </div>
  );
};

const cellStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'center',
};

export default OrderHistory;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUpdatePanel.css'; // optional for styling

const AdminUpdatePanel = () => {
  const [orders, setOrders] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  const statusOptions = [
    'Order Received',
    'Cooking',
    'Ready for Pickup',
    'Out for Delivery',
    'Delivered',
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
  const response = await axios.get('https://bharakath-mutton-curry-shop-1.onrender.com/api/orders');
      setOrders(response.data);
      const initialStatus = {};
      response.data.forEach(order => {
        initialStatus[order.id] = order.status;
      });
      setStatusMap(initialStatus);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
  await axios.post(`https://bharakath-mutton-curry-shop-1.onrender.com/api/update-status/${orderId}`, {
        status: newStatus,
      });
      setStatusMap(prev => ({ ...prev, [orderId]: newStatus }));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="admin-status-panel">
      <h2>Update Order Status</h2>
      {orders.map(order => (
        <div key={order.id} className="order-status-item">
          <p><strong>Order #{order.id}</strong> – {order.name}</p>
          <select
            value={statusMap[order.id] || order.status}
            onChange={(e) => handleStatusChange(order.id, e.target.value)}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminUpdatePanel;

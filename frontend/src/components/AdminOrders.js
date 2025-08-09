import React, { useEffect, useState } from 'react';

const cellStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'center',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetch('http://bharakath-mutton-curry-shop-1.onrender.com/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  const clearAllOrders = () => {
    if (window.confirm("Are you sure you want to delete all orders?")) {
      fetch('http://bharakath-mutton-curry-shop-1.onrender.com/api/orders', {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(() => setOrders([]))
        .catch(err => console.error("Error deleting orders:", err));
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    fetch(`http://bharakath-mutton-curry-shop-1.onrender.com/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then(updatedOrder => {
        const updatedOrders = orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
      })
      .catch(err => console.error('Error updating status:', err));
  };

  const filteredOrders = () => {
    return orders.filter(order => {
      const matchesSearch =
        (order.name ? order.name.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
        (order.phone ? order.phone.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
        (order.address ? order.address.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
        (order.item_name ? order.item_name.toLowerCase() : '').includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const exportCSV = () => {
    const rows = [
      ['Name', 'Phone', 'Address', 'Item', 'Qty', 'Order Time', 'Status'],
      ...filteredOrders().map(order => [
        order.name,
        order.phone,
        order.address,
        order.item_name,
        order.quantity,
        new Date(order.order_time).toLocaleString(),
        order.status
      ])
    ];
    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '16px', fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f9f9ff', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#B22222', fontWeight: 'bold', fontSize: '2rem', marginBottom: '18px' }}>📋 All Orders</h2>

      {/* Search and Filter Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '18px' }}>
        <input
          type="text"
          placeholder="Search by name, phone, address, item..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #FFD700',
            fontSize: '1rem',
            minWidth: '220px',
          }}
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #FFD700',
            fontSize: '1rem',
            minWidth: '180px',
            background: '#fff',
            color: '#B22222',
            fontWeight: 'bold',
          }}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button
          onClick={exportCSV}
          style={{
            background: '#FFD700',
            color: '#B22222',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 18px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 1px 4px #FFD70044',
          }}
        >
          ⬇️ Export CSV
        </button>
      </div>

      {filteredOrders().length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', fontSize: '1.1rem' }}>No orders found.</p>
      ) : (
        <div style={{
          overflowX: 'auto',
          borderRadius: '16px',
          boxShadow: '0 2px 12px rgba(178,34,34,0.07)',
          background: '#fff',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead style={{ backgroundColor: '#FFD700' }}>
              <tr>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Phone</th>
                <th style={cellStyle}>Address</th>
                <th style={cellStyle}>Item</th>
                <th style={cellStyle}>Qty</th>
                <th style={cellStyle}>Order Time</th>
                <th style={cellStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders().map((order, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#fff' : '#f9f9ff' }}>
                  <td style={cellStyle}>{order.name}</td>
                  <td style={cellStyle}>{order.phone}</td>
                  <td style={cellStyle}>{order.address}</td>
                  <td style={cellStyle}>{order.item_name}</td>
                  <td style={cellStyle}>{order.quantity}</td>
                  <td style={cellStyle}>{new Date(order.order_time).toLocaleString()}</td>
                  <td style={cellStyle}>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      background: order.status === 'Delivered' ? '#25D366' : order.status === 'Out for Delivery' ? '#FFD700' : order.status === 'Preparing' ? '#B22222' : '#ccc',
                      color: order.status === 'Delivered' ? '#fff' : order.status === 'Out for Delivery' ? '#B22222' : '#fff',
                      marginRight: '8px',
                      transition: 'background 0.3s',
                    }}>{order.status}</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1px solid #FFD700',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        background: '#fff',
                        color: '#B22222',
                        cursor: 'pointer',
                        marginTop: '4px',
                        minWidth: '120px',
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <button
          onClick={clearAllOrders}
          style={{
            background: 'linear-gradient(90deg, #B22222 60%, #FFD700 100%)',
            color: '#fff',
            padding: '12px 28px',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px #FFD70044',
            transition: 'background 0.3s',
          }}
        >
          🧹 Clear All Orders
        </button>
      </div>

      {/* Mobile-friendly tips */}
      <div style={{ textAlign: 'center', marginTop: '18px', color: '#888', fontSize: '0.95rem' }}>
        <span role="img" aria-label="swipe">👆</span> Swipe left/right to view all columns on mobile
      </div>
    </div>
  );
};

export default AdminOrders;

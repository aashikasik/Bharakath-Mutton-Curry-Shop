import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const productData = [
  { id: 1, name: 'Normal Mutton', price: '₹800', type: 'Spicy', description: 'A classic spicy mutton curry with bones.' },
  { id: 2, name: 'BoneLess Mutton', price: '₹1000', type: 'Gravy', description: 'Soft, juicy boneless mutton pieces in rich gravy.' },
  { id: 3, name: 'Mutton Kudal', price: '₹280', type: 'Spicy', description: 'Traditional South Indian spicy kudal mutton.' },
  { id: 4, name: 'Mutton Thalai', price: '₹300', type: 'Gravy', description: 'Delicious head meat in flavorful masala gravy.' },
  { id: 5, name: 'Mutton Kaal', price: '₹200', type: 'Soup', description: 'Spicy and healthy goat leg soup (paaya).' },
];


const OrderPage = () => {
  const { productId } = useParams();
  const product = productData.find(p => p.id === parseInt(productId));

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !quantity || !address) {
      alert('Please fill all fields.');
      return;
    }

    const orderData = {
      name,
      phone,
      quantity,
      address,
      item_name: product.name,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'cod' ? 'pending' : 'paid'
    };

    setLoading(true);

    // Use Render backend in production, localhost in development
    const API_URL =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000/api/orders'
        : 'https://bharakath-mutton-curry-backend.onrender.com/api/orders';

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setOrderDetails({
          ...orderData,
          order_id: data.order_id
        });
        setShowSuccess(true);
        setName(''); setPhone(''); setQuantity(''); setAddress('');
      })
      .catch(err => {
        setLoading(false);
        console.error('❌ Order failed:', err);
        alert('❌ Something went wrong. Please try again.');
      });
  };

  if (!product) {
    return (
      <div style={{ padding: '40px', fontFamily: 'Arial' }}>
        <h2 style={{ color: '#B22222' }}>Product Not Found</h2>
      </div>
    );
  }

  return (
    <div style={{
      padding: '0',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      background: 'linear-gradient(135deg, #fff0f0 0%, #f9f9ff 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        margin: '32px auto',
        background: '#fff',
        padding: '28px 18px',
        borderRadius: '18px',
        boxShadow: '0 4px 24px #FFD70022',
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <img src="/images/boneless.jpeg" alt="Mutton" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px #FFD70044' }} />
          <h2 style={{ color: '#B22222', fontWeight: 'bold', fontSize: '2rem', margin: '12px 0 6px' }}>{product.name}</h2>
          <span style={{ display: 'inline-block', background: '#FFD70022', color: '#B22222', fontWeight: 'bold', borderRadius: '8px', padding: '4px 12px', fontSize: '1rem', marginBottom: '6px' }}>{product.type}</span>
          <div style={{ fontSize: '1.2rem', color: '#333', marginBottom: '6px' }}><strong>{product.price}</strong></div>
          <div style={{ color: '#666', fontSize: '1rem', marginBottom: '8px' }}>{product.description}</div>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}><span role="img" aria-label="user">👤</span> Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ ...inputStyle, fontSize: '1.08rem' }}
              placeholder="Enter your name"
              autoComplete="name"
            />
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}><span role="img" aria-label="phone">📞</span> Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              style={{ ...inputStyle, fontSize: '1.08rem' }}
              placeholder="10-digit mobile number"
              autoComplete="tel"
              pattern="[0-9]{10}"
              maxLength={10}
            />
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}><span role="img" aria-label="quantity">🥄</span> Quantity (Kg or Nos)</label>
            <input
              type="text"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
              style={{ ...inputStyle, fontSize: '1.08rem' }}
              placeholder="e.g. 1 Kg or 2 Nos"
            />
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}><span role="img" aria-label="address">📍</span> Delivery Address</label>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              style={{ ...inputStyle, height: '70px', fontSize: '1.08rem', resize: 'vertical' }}
              placeholder="Enter your delivery address"
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}><span role="img" aria-label="payment">💳</span> Payment Method</label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              style={{ ...inputStyle, fontSize: '1.08rem' }}
              required
            >
              <option value="cod">Cash on Delivery</option>
              <option value="razorpay">Razorpay</option>
              <option value="stripe">Stripe</option>
              <option value="paypal">PayPal</option>
            </select>
            <div style={{ color: '#888', fontSize: '0.95rem', marginTop: '6px' }}>
              {paymentMethod === 'cod' && 'Pay with cash when your order arrives.'}
              {paymentMethod === 'razorpay' && 'You will be redirected to Razorpay for secure payment.'}
              {paymentMethod === 'stripe' && 'You will be redirected to Stripe for secure payment.'}
              {paymentMethod === 'paypal' && 'You will be redirected to PayPal for secure payment.'}
            </div>
          </div>

          <button type="submit" style={submitButtonStyle} disabled={loading}>
            {loading ? (
              <span><span className="loader" style={{ marginRight: '8px', verticalAlign: 'middle' }}></span>Placing Order...</span>
            ) : (
              <span>✅ Place Order</span>
            )}
          </button>
        </form>

        {/* Success Modal Dialog */}
        {showSuccess && orderDetails && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '32px 24px',
              boxShadow: '0 2px 16px #FFD70044',
              maxWidth: '400px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <h2 style={{ color: '#25D366', marginBottom: '12px' }}>✅ Order Placed Successfully!</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Thank you, <strong>{orderDetails.name}</strong>!</p>
              <p>Your order for <strong>{orderDetails.item_name}</strong> (<strong>{orderDetails.quantity}</strong>) has been received.</p>
              <p><strong>Order ID:</strong> <span style={{ color: '#B22222' }}>{orderDetails.order_id}</span></p>
              <p><strong>Delivery Address:</strong> {orderDetails.address}</p>
              <p><strong>Phone:</strong> {orderDetails.phone}</p>
              <button
                style={{
                  marginTop: '18px',
                  background: 'linear-gradient(90deg, #FFD700 60%, #25D366 100%)',
                  color: '#fff',
                  padding: '10px 28px',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #FFD70044',
                  transition: 'background 0.3s',
                }}
                onClick={() => setShowSuccess(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Loader animation style */}
        <style>{`
          .loader {
            display: inline-block;
            width: 18px;
            height: 18px;
            border: 3px solid #FFD700;
            border-top: 3px solid #25D366;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            vertical-align: middle;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @media (max-width: 600px) {
            .order-card {
              padding: 12px 4px !important;
              border-radius: 10px !important;
            }
            .order-card h2 {
              font-size: 1.3rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

// Styles
const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: '600',
  color: '#333'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '15px'
};

const submitButtonStyle = {
  backgroundColor: '#B22222',
  color: 'white',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  cursor: 'pointer',
  width: '100%'
};

export default OrderPage;

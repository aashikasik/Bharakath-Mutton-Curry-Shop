// src/components/ProductList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: 'Normal Mutton', price: '₹800', type: 'Spicy', image: '/images/normal.jpeg' },
  { id: 2, name: 'BoneLess Mutton', price: '₹1000', type: 'Gravy', image: '/images/boneless.jpeg' },
  { id: 3, name: 'Mutton Kudal', price: '₹280', type: 'Spicy', image: '/images/kudal.jpg' },
  { id: 4, name: 'Mutton Thalai', price: '₹300', type: 'Gravy', image: '/images/thala.jpg' },
  { id: 5, name: 'Mutton Kaal', price: '₹200', type: 'Soup', image: '/images/kaal.jpg' },
];

function ProductList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const handleOrderClick = (id) => {
    navigate(`/order/${id}`);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <section style={{ padding: '30px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center' }}>Our Mutton Curry Varieties</h2>

      {/* 🔍 Search Box */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search mutton dish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
      </div>

      {/* 🍛 Type Filter Tabs */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {['All', 'Spicy', 'Gravy', 'Soup'].map((type) => (
          <button
            key={type}
            onClick={() => handleTypeClick(type)}
            style={{
              margin: '0 10px',
              padding: '8px 16px',
              border: selectedType === type ? '2px solid #B22222' : '1px solid #ccc',
              backgroundColor: selectedType === type ? '#B22222' : '#f9f9f9',
              color: selectedType === type ? '#fff' : '#333',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: selectedType === type ? 'bold' : 'normal',
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 🧾 Product Cards */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              margin: '10px',
              width: '240px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              textAlign: 'center',
              backgroundColor: '#fff',
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            />
            <h3>{item.name}</h3>
            <p>Type: {item.type}</p>
            <p>
              <strong>Price: {item.price}</strong>
            </p>
            <button
              style={{
                backgroundColor: '#B22222',
                color: 'white',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => handleOrderClick(item.id)}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;

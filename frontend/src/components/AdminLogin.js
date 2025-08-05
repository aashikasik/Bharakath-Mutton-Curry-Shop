// frontend/src/components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'admin123') {
      navigate('/admin');
    } else {
      alert('Incorrect password');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      style={{
        ...styles.container,
        background: darkMode
          ? 'linear-gradient(to right, #1e1e1e, #2c2c2c)'
          : 'linear-gradient(to right, #ffe6e6, #fff)',
      }}
    >
      {/* Dark Mode Toggle - Top Right */}
      <div style={styles.darkToggleWrapper}>
        <button onClick={toggleDarkMode} style={styles.toggleButton}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div
        style={{
          ...styles.card,
          backgroundColor: darkMode ? '#333' : '#fff',
          color: darkMode ? '#fff' : '#000',
          animation: 'fadeIn 0.5s ease-in-out',
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
          alt="Admin Logo"
          style={styles.logo}
        />
        <h2 style={{ ...styles.heading, color: darkMode ? '#ff9999' : '#8B0000' }}>
          🔐 Admin Login
        </h2>

        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              ...styles.input,
              backgroundColor: darkMode ? '#444' : '#fff',
              color: darkMode ? '#fff' : '#000',
              border: darkMode ? '1px solid #666' : '1px solid #ccc',
            }}
          />
          <span onClick={togglePasswordVisibility} style={styles.eyeIcon}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    transition: 'background 0.3s ease',
  },
  darkToggleWrapper: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  toggleButton: {
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    fontSize: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  card: {
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
    transition: 'all 0.3s ease',
  },
  logo: {
    width: '60px',
    marginBottom: '20px',
  },
  heading: {
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    padding: '10px',
    width: '100%',
    borderRadius: '6px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: '15px',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '18px',
    userSelect: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#8B0000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background 0.3s',
  },
};

export default AdminLogin;

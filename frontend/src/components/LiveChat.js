import React, { useState, useEffect, useRef } from 'react';

const LiveChat = () => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && phone) fetchMessages();
    // eslint-disable-next-line
  }, [open, phone]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/chat?phone=${phone}`);
      const data = await res.json();
      if (res.ok) setMessages(data);
      else setError(data.error || 'Failed to fetch chat');
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, message: input, timestamp: new Date().toISOString() })
      });
      const data = await res.json();
      if (res.ok) {
        setInput('');
        fetchMessages();
      } else setError(data.error || 'Failed to send message');
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            background: 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)',
            color: '#B22222',
            border: 'none',
            borderRadius: '50%',
            width: 44,
            height: 44,
            boxShadow: '0 2px 8px #FFD70044',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.2s',
          }}
          aria-label="Open Live Chat"
        >
          💬
        </button>
      )}
      {/* Chat Box */}
      {open && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, maxWidth: 360, width: '95vw', boxShadow: '0 4px 24px #B2222244', borderRadius: 20, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', fontFamily: 'Segoe UI, Arial, sans-serif', border: '1.5px solid #FFD700', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)', color: '#B22222', padding: '12px 20px', borderTopLeftRadius: 20, borderTopRightRadius: 20, fontWeight: 'bold', fontSize: '1.15rem', letterSpacing: '0.5px', boxShadow: '0 2px 8px #FFD70033', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>💬 Live Chat Support</span>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', color: '#B22222', fontSize: '1.5rem', cursor: 'pointer', fontWeight: 'bold', marginLeft: 8 }}
              aria-label="Close Chat"
            >
              ×
            </button>
          </div>
          <div style={{ padding: '16px', minHeight: 200, maxHeight: 280, overflowY: 'auto', background: 'rgba(255,255,255,0.7)', borderBottom: '1.5px solid #FFD700' }}>
            {!phone ? (
              <div style={{ textAlign: 'center', color: '#888' }}>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Enter your phone to start chat"
                  style={{ padding: '8px', borderRadius: '8px', border: '1px solid #FFD700', fontSize: '1rem', minWidth: '180px' }}
                  maxLength={10}
                />
                <div style={{ marginTop: 8, fontSize: '0.95rem', color: '#B22222' }}>We use your phone to show your chat history.</div>
              </div>
            ) : (
              <>
                {loading && <div style={{ textAlign: 'center', color: '#888' }}>Loading...</div>}
                {error && <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>}
                {messages.length === 0 && !loading && <div style={{ textAlign: 'center', color: '#888' }}>No messages yet.</div>}
                {messages.map((msg, idx) => (
                  <div key={idx} style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{
                      background: 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)',
                      color: '#B22222',
                      borderRadius: '16px 16px 4px 16px',
                      padding: '8px 14px',
                      fontSize: '1rem',
                      boxShadow: '0 2px 8px #FFD70022',
                      maxWidth: '80%',
                      wordBreak: 'break-word',
                      border: '1px solid #FFD700',
                      marginRight: 8
                    }}>
                      {msg.message}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#888', minWidth: 60 }}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </>
            )}
          </div>
          {phone && (
            <form onSubmit={sendMessage} style={{ display: 'flex', padding: '12px', gap: 10, background: 'rgba(255,255,255,0.95)', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '1.5px solid #FFD700', fontSize: '1rem', background: '#fffbe6', color: '#B22222', boxShadow: '0 1px 4px #FFD70022' }}
                maxLength={200}
              />
              <button
                type="submit"
                style={{ background: 'linear-gradient(90deg, #FFD700 80%, #fffbe6 100%)', color: '#B22222', border: 'none', borderRadius: '12px', padding: '10px 18px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 1px 4px #FFD70044' }}
              >
                ➤
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default LiveChat;

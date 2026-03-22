import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, AlertTriangle, X, Send } from 'lucide-react';

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! How are you?', sender: 'other' },
    { id: 2, text: "I'm good, just finished a hike!", sender: 'me' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), text: msg, sender: 'me' }]);
    setMsg('');
  };

  const handleReport = () => {
    const reports = JSON.parse(localStorage.getItem('reports') || '[]');
    reports.push({
      id: Date.now(),
      user: `User ${id}`,
      userID: id,
      reason: 'Reported from chat',
      status: 'pending'
    });
    localStorage.setItem('reports', JSON.stringify(reports));
    alert('User reported successfully');
    navigate('/');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-user-info">
          <img 
            src={`https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100`} 
            alt={`User ${id}`} 
            className="chat-avatar" 
          />
          <div className="chat-user-details">
            <span className="chat-username">User {id}</span>
            <span className="chat-status">Online</span>
          </div>
        </div>
        <button onClick={handleReport} className="btn-report" title="Report User">
          <AlertTriangle size={20} />
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((m) => (
          <div key={m.id} className={`message ${m.sender === 'me' ? 'sent' : 'received'}`}>
            <div className="message-content">
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="chat-input-area">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="btn-send" disabled={!msg.trim()}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
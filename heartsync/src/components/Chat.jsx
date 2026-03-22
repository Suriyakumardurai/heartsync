import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, AlertTriangle, X, Send } from 'lucide-react';

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How's it going?", sender: 'other' },
    { id: 2, text: "I'm good, just finished a hike!", sender: 'me' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), text: msg, sender: 'me' }]);
    setMsg('');
  };

  const handleReport = () => {
    const blocked = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
    if (!blocked.includes(id)) {
      blocked.push(id);
      localStorage.setItem('blockedUsers', JSON.stringify(blocked));
    }

    const reports = JSON.parse(localStorage.getItem('reports') || '[]');
    reports.push({ id: Date.now(), user: `User ${id}`, userId: id, reason: 'Reported from chat', status: 'pending' });
    localStorage.setItem('reports', JSON.stringify(reports));

    navigate('/matches');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-2xl mx-auto bg-white shadow-sm border-x">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <img
            src={`/Photos/photo${id}.png`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <span className="font-bold block">User {id}</span>
            <span className="text-xs text-green-500 font-medium">Online</span>
          </div>
        </div>
        <button
          onClick={handleReport}
          className="p-2 text-gray-400 hover:text-red-500 transition rounded-full hover:bg-red-50"
          title="Report & Block"
        >
          <AlertTriangle className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${m.sender === 'me'
                ? 'bg-rose-500 text-white rounded-tr-none'
                : 'bg-white text-gray-800 rounded-tl-none border'
              }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t flex gap-2 bg-white">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-rose-500 transition"
        />
        <button type="submit" className="bg-rose-500 text-white p-3 rounded-full hover:bg-rose-600 transition shadow-md active:scale-95">
          <Send className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
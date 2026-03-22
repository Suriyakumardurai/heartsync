import React, { useState } from 'react';
import { User, Shield, AlertTriangle, Check, Trash2, LogOut } from 'lucide-react';

const INITIAL_PROFILES = [
  { id: 1, name: 'Sarah', age: 24, location: 'Chennai', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
  { id: 2, name: 'Mike', age: 30, location: 'Mumbai', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
  { id: 3, name: 'Elena', age: 28, location: 'Delhi', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' },
  { id: 4, name: 'David', age: 35, location: 'Bangalore', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
  { id: 5, name: 'Chloe', age: 22, location: 'Hyderabad', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('allUsers');
    return saved ? JSON.parse(saved) : INITIAL_PROFILES;
  });
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('reports');
    return saved ? JSON.parse(saved) : [
      { id: 1, user: 'Mike', reason: 'Inappropriate content', status: 'pending' },
      { id: 2, user: 'Elena', reason: 'Spamming', status: 'pending' },
    ];
  });
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('contentReviews');
    return saved ? JSON.parse(saved) : [
      { id: 1, user: 'David', content: 'Profile Bio: "I Love hacking"', type: 'Bio' },
      { id: 2, user: 'Chloe', content: 'Photo update', type: 'Image' },
    ];
  });

  const handleReviewAction = (id, approved) => {
    const newReviews = reviews.filter(rev => rev.id !== id);
    setReviews(newReviews);
    localStorage.setItem('contentReviews', JSON.stringify(newReviews));
    console.log(`Review ${id} ${approved ? 'approved' : 'rejected'}`);
  };

  const handleReportAction = (id, actioned) => {
    const newReports = reports.filter(rep => rep.id !== id);
    setReports(newReports);
    localStorage.setItem('reports', JSON.stringify(newReports));
  };

  const handleDeleteUser = (id) => {
    const newUsers = users.filter(u => u.id !== id);
    setUsers(newUsers);
    localStorage.setItem('allUsers', JSON.stringify(newUsers));
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-title-group">
          <Shield className="admin-icon" />
          <h1 className="admin-title">Admin Dashboard</h1>
        </div>
        <button onClick={logout} className="btn-logout">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      <nav className="admin-tabs">
        <button 
          onClick={() => setActiveTab('users')} 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
        >
          <User size={18} /> <span>Users</span>
        </button>
        <button 
          onClick={() => setActiveTab('reports')} 
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
        >
          <AlertTriangle size={18} /> <span>Reports</span>
        </button>
        <button 
          onClick={() => setActiveTab('reviews')} 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
        >
          <Check size={18} /> <span>Content Review</span>
        </button>
      </nav>

      <div className="admin-content">
        {activeTab === 'users' && (
          <div className="users-grid">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <img src={user.photo} alt={user.name} className="user-avatar" />
                <div className="user-info">
                  <h3>{user.name}, {user.age}</h3>
                  <p>{user.location}</p>
                </div>
                <button onClick={() => handleDeleteUser(user.id)} className="btn-delete">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-list">
            {reports.length === 0 ? (
              <div className="empty-state">No pending reports</div>
            ) : (
              reports.map(report => (
                <div key={report.id} className="item-card">
                  <div className="item-details">
                    <span className="item-user">{report.user}</span>
                    <span className="item-reason">{report.reason}</span>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleReportAction(report.id, true)} className="btn-approve">Approve</button>
                    <button onClick={() => handleReportAction(report.id, false)} className="btn-reject">Dismiss</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-list">
            {reviews.length === 0 ? (
              <div className="empty-state">No content for review</div>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="item-card">
                  <div className="item-details">
                    <span className="item-type">{review.type}</span>
                    <span className="item-user">{review.user}</span>
                    <p className="item-content">{review.content}</p>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleReviewAction(review.id, true)} className="btn-approve">
                      <Check size={16} /> <span>Approve</span>
                    </button>
                    <button onClick={() => handleReviewAction(review.id, false)} className="btn-reject">
                      <Trash2 size={16} /> <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

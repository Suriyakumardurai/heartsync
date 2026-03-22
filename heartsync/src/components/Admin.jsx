import React, { useState } from 'react';
import { User, Shield, AlertTriangle, Check, Trash2, LogOut, RefreshCcw } from 'lucide-react';
import { INITIAL_PROFILES } from '../constants';
import { getScopedData, setScopedData } from '../utils/storage';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState(() => getScopedData('allUsers', INITIAL_PROFILES));

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all user data? This will restore the original profiles and photo links.')) {
      setScopedData('allUsers', INITIAL_PROFILES);
      setUsers(INITIAL_PROFILES);
      alert('Data reset successfully!');
    }
  };

  const [reports, setReports] = useState(() => {
    return getScopedData('reports', [
      { id: 1, user: 'Mike', reason: 'Inappropriate content', status: 'pending' },
      { id: 2, user: 'Elena', reason: 'Spamming', status: 'pending' },
    ]);
  });
  const [reviews, setReviews] = useState(() => {
    return getScopedData('contentReviews', [
      { id: 1, user: 'David', content: 'Profile Bio: "I love hacking"', type: 'Bio' },
      { id: 2, user: 'Chloe', content: 'Photo Update', type: 'Image' },
    ]);
  });

  const handleReviewAction = (id, approved) => {
    const newReviews = reviews.filter(rev => rev.id !== id);
    setReviews(newReviews);
    setScopedData('contentReviews', newReviews);
    if (!approved) {
      console.log(`Review ${id} rejected`);
    } else {
      console.log(`Review ${id} approved`);
    }
  };

  const handleDeleteUser = (id) => {
    const newUsers = users.filter(u => u.id !== id);
    setUsers(newUsers);
    setScopedData('allUsers', newUsers);
  };

  const handleDismissReport = (id) => {
    const newReports = reports.filter(r => r.id !== id);
    setReports(newReports);
    setScopedData('reports', newReports);
  };

  const handleActionReport = (report) => {
    handleDeleteUser(report.userId || report.id);
    handleDismissReport(report.id);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-row">
      {/* Sidebar */}
      <div className="w-full sm:w-64 bg-white border-r p-6 flex flex-col">
        <div className="flex items-center gap-2 text-rose-500 mb-10">
          <Shield className="w-8 h-8" />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>
        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'users' ? 'bg-rose-50 text-rose-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <User className="w-5 h-5" /> Users
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'reports' ? 'bg-rose-50 text-rose-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <AlertTriangle className="w-5 h-5" /> Reports
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'reviews' ? 'bg-rose-50 text-rose-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Check className="w-5 h-5" /> Content Review
          </button>
        </nav>
        <button
          onClick={handleResetData}
          className="flex items-center gap-3 p-3 text-amber-600 hover:bg-amber-50 rounded-lg transition mt-auto mb-2"
        >
          <RefreshCcw className="w-5 h-5" /> Reset Data
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-x-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h1>

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">User</th>
                  <th className="p-4 font-semibold text-gray-600">Location</th>
                  <th className="p-4 font-semibold text-gray-600">Age</th>
                  <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4 flex items-center gap-3">
                      <img src={u.photo} className="w-10 h-10 rounded-full object-cover" />
                      <span className="font-medium">{u.name}</span>
                    </td>
                    <td className="p-4 text-gray-600">{u.location}</td>
                    <td className="p-4 text-gray-600">{u.age}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="grid gap-4">
            {reports.length === 0 ? (
              <div className="text-center py-20 text-gray-500">No pending reports.</div>
            ) : (
              reports.map(r => (
                <div key={r.id} className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg">Report for {r.user}</h3>
                    <p className="text-gray-500">{r.reason}</p>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => handleDismissReport(r.id)}
                      className="flex-1 sm:flex-none bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => handleActionReport(r)}
                      className="flex-1 sm:flex-none bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
                    >
                      Take Action
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid gap-4">
            {reviews.length === 0 ? (
              <div className="text-center py-20 text-gray-500">No content pending review.</div>
            ) : (
              reviews.map(rev => (
                <div key={rev.id} className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded uppercase">{rev.type}</span>
                      <h3 className="font-bold">{rev.user}</h3>
                    </div>
                    <p className="text-gray-600 italic">"{rev.content}"</p>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => handleReviewAction(rev.id, false)}
                      className="flex-1 sm:flex-none bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleReviewAction(rev.id, true)}
                      className="flex-1 sm:flex-none bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
                    >
                      Approve
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
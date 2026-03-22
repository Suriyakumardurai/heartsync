import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { Heart, MessageCircle, User, AlertCircle, Shield } from 'lucide-react';

const Admin = lazy(() => import('./components/Admin'));
const Chat = lazy(() => import('./components/Chat'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <AlertCircle className="error-icon" />
          <h2 className="error-title">Component Unavailable</h2>
          <p className="error-text">This part of the app is currently offline or missing.</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">Try Refreshing</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <Link to="/" className="app-logo">
            <Heart className="logo-icon" />
            <span>HeartSync</span>
          </Link>
          <nav className="main-nav">
            <Link to="/matches" className="nav-link">
              <Heart size={20} />
              <span>Matches</span>
            </Link>
            <Link to="/chat/1" className="nav-link">
              <MessageCircle size={20} />
              <span>Chat</span>
            </Link>
            <Link to="/admin" className="nav-link">
              <Shield size={20} />
              <span>Admin</span>
            </Link>
          </nav>
        </header>

        <main className="app-content">
          <Suspense fallback={<div className="loading-container"><div className="loader"></div></div>}>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Navigate to="/chat/1" replace />} />
                <Route path="/chat/:id" element={<Chat />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;

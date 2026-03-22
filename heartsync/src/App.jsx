import React, { useState, useEffect, Suspense, Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { Heart, MessageCircle, User, AlertCircle } from 'lucide-react';

// Error Boundary for robust component loading
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center bg-white rounded-2xl shadow-sm m-4 border border-red-100">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Component Unavailable</h2>
          <p className="text-gray-500 mt-2">This part of the app is currently offline or missing.</p>
          <button onClick={() => window.location.reload()} className="mt-4 text-rose-500 font-semibold underline">Try Refreshing</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Lazy Loading Components for better performance and resilience
const AdminDashboard = React.lazy(() => import('./components/Admin.jsx').catch(() => ({ default: () => <div className="p-20 text-center">Admin Panel Missing</div> })));
const Chat = React.lazy(() => import('./components/Chat.jsx').catch(() => ({ default: () => <div className="p-20 text-center">Chat Component Missing</div> })));
const ProfileSettings = React.lazy(() => import('./components/ProfileSettings.jsx').catch(() => ({ default: () => <div className="p-20 text-center">Profile Settings Missing</div> })));
const Matches = React.lazy(() => import('./components/Matches.jsx').catch(() => ({ default: () => <div className="p-20 text-center">Matches Component Missing</div> })));
const Swipe = React.lazy(() => import('./components/Swipe.jsx').catch(() => ({ default: () => <div className="p-20 text-center">Discover Component Missing</div> })));

// Loading Fallback
const Loader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// --- Landing Page ---
const Landing = () => (
  <div className="min-h-screen bg-gradient-to-br from-rose-500 to-pink-600 flex flex-col items-center justify-center text-white p-6">
    <div className="text-center max-w-2xl">
      <Heart className="w-20 h-20 mx-auto mb-6 fill-white" />
      <h1 className="text-6xl font-bold mb-4 tracking-tight">HeartSync</h1>
      <p className="text-xl mb-8 opacity-90">Find your perfect match in a heartbeat. Simple, real, and human connections.</p>
      <div className="flex gap-4 justify-center">
        <Link to="/signup" className="bg-white text-rose-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">Get Started</Link>
        <Link to="/login" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-rose-600 transition">Login</Link>
      </div>
    </div>
  </div>
);

// --- Auth UI ---
const Auth = ({ type }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, role: email.includes('admin') ? 'admin' : 'user', id: Date.now() };
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.dispatchEvent(new Event('storage'));
    navigate(user.role === 'admin' ? '/admin' : '/swipe');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{type === 'login' ? 'Welcome Back' : 'Join HeartSync'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="admin@heartsync.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="admin123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition">
            {type === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500">
          {type === 'login' ? "Don't have an account? " : "Already have an account? "}
          <Link to={type === 'login' ? '/signup' : '/login'} className="text-rose-500 font-semibold underline">
            {type === 'login' ? 'Sign Up' : 'Login'}
          </Link>
        </p>
      </div>
    </div>
  );
};

// --- Layout & Routing ---
const Navbar = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 z-50 sm:top-0 sm:bottom-auto sm:border-b sm:border-t-0">
    <Link to="/swipe" className="flex flex-col items-center text-gray-400 hover:text-rose-500">
      <Heart className="w-6 h-6" />
      <span className="text-[10px] mt-1 font-medium">Discover</span>
    </Link>
    <Link to="/matches" className="flex flex-col items-center text-gray-400 hover:text-rose-500">
      <MessageCircle className="w-6 h-6" />
      <span className="text-[10px] mt-1 font-medium">Matches</span>
    </Link>
    <Link to="/profile" className="flex flex-col items-center text-gray-400 hover:text-rose-500">
      <User className="w-6 h-6" />
      <span className="text-[10px] mt-1 font-medium">Profile</span>
    </Link>
  </nav>
);

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/swipe" />;
  return children;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Auth type="login" />} />
              <Route path="/signup" element={<Auth type="signup" />} />

              <Route path="/swipe" element={<ProtectedRoute><div className="pb-20 sm:pt-20"><Navbar /><Swipe /></div></ProtectedRoute>} />
              <Route path="/matches" element={<ProtectedRoute><div className="pb-20 sm:pt-20"><Navbar /><Matches /></div></ProtectedRoute>} />
              <Route path="/chat/:id" element={<ProtectedRoute><div className="pb-20 sm:pt-20"><Navbar /><Chat /></div></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><div className="pb-20 sm:pt-20"><Navbar /><ProfileSettings /></div></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
}
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AIChat from './pages/AIChat';
import Booking from './pages/Booking';
import Resources from './pages/Resources';
import PeerSupport from './pages/PeerSupport';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'counselor' | 'admin' | 'volunteer';
  isAuthenticated: boolean;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/ai-chat" element={<AIChat user={user} />} />
          <Route path="/booking" element={<Booking user={user} />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/peer-support" element={<PeerSupport user={user} />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
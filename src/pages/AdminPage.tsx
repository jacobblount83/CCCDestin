import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import AdminPanel from '../components/AdminPanel';

interface Counselor {
  id: string;
  name: string;
  credentials: string;
  image: string;
  locations: string[];
  bio: string;
  specialties: string[];
  insuranceAccepted: string[];
}

interface AdminPageProps {
  counselors: Counselor[];
  onUpdateCounselors: (counselors: Counselor[]) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ counselors, onUpdateCounselors }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Check if user is already authenticated (session storage)
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('admin_authenticated') === 'true';
    setIsAuthenticated(isLoggedIn);
  }, []);

  const handleLogin = (password: string) => {
    // Simple password check - in production, this should be more secure
    const adminPassword = 'CrosspointAdmin2025!'; // You can change this password
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setLoginError('');
      sessionStorage.setItem('admin_authenticated', 'true');
    } else {
      setLoginError('Invalid password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  }

  return (
    <AdminPanel 
      counselors={counselors}
      onUpdateCounselors={onUpdateCounselors}
      onLogout={handleLogout}
    />
  );
};

export default AdminPage;
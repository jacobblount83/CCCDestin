import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

interface LoginFormProps {
  onLogin: (password: string) => void;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/DSC_7225.jpg")',
          zIndex: -1
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Login Form */}
      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <img 
            src="/crosspoint - counseling - logo.png" 
            alt="Crosspoint Counseling" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold font-heading" style={{ color: '#006DD2' }}>
            Admin Access
          </h1>
          <p className="text-gray-600 mt-2 font-body">
            Enter your password to access the counselor management system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-body"
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm font-body">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 text-white font-medium rounded-lg transition-colors font-body"
            style={{ backgroundColor: '#006DD2' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0056B3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#006DD2'}
          >
            Access Admin Panel
          </button>
        </form>

        <div className="mt-6 text-center">
          <a 
            href="/"
            className="text-sm font-body transition-colors"
            style={{ color: '#006DD2' }}
            onMouseEnter={(e) => e.target.style.color = '#0056B3'}
            onMouseLeave={(e) => e.target.style.color = '#006DD2'}
          >
            ← Back to main website
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
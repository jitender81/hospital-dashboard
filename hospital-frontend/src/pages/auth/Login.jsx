import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const success = await login(email, password);

    setSubmitting(false);

    if (!success) {
      setError('Invalid email or password');
      return;
    }

    const roleRoutes = {
      'patient@hospital.com': '/patient/dashboard',
      'doctor@hospital.com': '/doctor/dashboard',
      'reception@hospital.com': '/reception/dashboard',
    };
    navigate(roleRoutes[email] || '/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome Back</h2>
        <p className="text-sm text-slate-500 mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="you@hospital.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 rounded-lg text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-[11px] text-slate-400 border-t pt-4">
          <p className="font-semibold mb-1">Demo accounts:</p>
          <p>patient@hospital.com / patient123</p>
          <p>doctor@hospital.com / doctor123</p>
          <p>reception@hospital.com / reception123</p>
        </div>
      </div>
    </div>
  );
}

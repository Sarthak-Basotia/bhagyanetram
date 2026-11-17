import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminLoginApi, setAdminSession, getAdminToken } from '../../../api/adminApi';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import logoImage from 'figma:asset/d5457f2df4c5864ece0203437258a94768a0cf00.png';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@bhagyanetram.com');
  const [password, setPassword] = useState('Admin@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If already logged in as admin, redirect directly to dashboard
    if (getAdminToken()) {
      navigate('/pranav-admin');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await adminLoginApi({ email, password });
      if (res.success && res.token) {
        setAdminSession(res.token, res.admin);
        navigate('/pranav-admin');
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Unable to connect to admin server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-950 celestial-grid-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative celestial background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/95 p-1.5 border border-gold-500/40 shadow-gold-glow flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
              <img src={logoImage} alt="BhagyaNetram Logo" className="w-full h-full object-contain" />
            </div>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>Master Administration Portal</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
            BhagyaNetram <span className="gold-gradient-text">Admin</span>
          </h1>
          <p className="text-ivory-200/70 text-xs sm:text-sm mt-1">
            Secure administrative control for astrologers, blogs & inquiries
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-cosmic-900/90 border border-gold-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs leading-relaxed flex items-start gap-2">
              <span className="font-bold">Error:</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300 mb-1.5">
                Admin Email ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gold-500/60">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bhagyanetram.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cosmic-950/80 border border-gold-500/30 text-white placeholder-cosmic-600 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-sm transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gold-500/60">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-cosmic-950/80 border border-gold-500/30 text-white placeholder-cosmic-600 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gold-500/60 hover:text-gold-400 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
           

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl gold-btn font-display font-bold text-sm tracking-wide text-cosmic-950 shadow-gold-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-cosmic-950" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Enter Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Return to website */}
          <div className="text-center mt-6 pt-5 border-t border-gold-500/15">
            <Link
              to="/"
              className="text-xs text-gold-400/80 hover:text-gold-300 hover:underline transition"
            >
              ← Return to BhagyaNetram Website
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

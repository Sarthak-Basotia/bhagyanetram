import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Hand, Camera, Upload, LogIn, CheckCircle2, Lock, Loader2, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const API_BASE_URL = "https://bhagyanetram.com";

export default function PalmistryPage() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Auth Form State
  const [authStep, setAuthStep] = useState(1); // 1: details, 2: OTP
  const [authForm, setAuthForm] = useState({ name: '', phone: '', email: '', terms: false, otp: '' });
  
  // Palmistry State
  const [image, setImage] = useState<string | null>(null);
  const [reading, setReading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authForm.terms) {
      setError("Please accept the terms and conditions.");
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: authForm.name, phone: authForm.phone, email: authForm.email, termsAccepted: authForm.terms })
      });
      const data = await res.json();
      if (res.ok) {
        setAuthStep(2);
        console.log("TEST OTP:", data.testOtp);
      } else {
        setError(data.error || 'Failed to send OTP.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authForm.email, otp: authForm.otp })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
      } else {
        setError(data.error || 'Invalid OTP.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setReading(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/palmistry/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ image })
      });
      const data = await res.json();
      if (res.ok) {
        setReading(data.reading);
        setUser({ ...user, palmistryCredits: data.remainingCredits });
      } else {
        setError(data.error || 'Failed to analyze palm.');
      }
    } catch (err) {
      setError('An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setAuthStep(1);
    setImage(null);
    setReading(null);
  };

  // Sanitize any generic disclaimer from AI models
  const cleanReading = (raw: string | null) => {
    if (!raw) return '';
    return raw
      .replace(/^I('m| am) unable to identify the person in the image[^\n]*\n*/i, '')
      .replace(/^I cannot identify the (individual|person)[^\n]*\n*/i, '')
      .replace(/^Certainly,?[^\n]*\n*/i, '')
      .trim();
  };

  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      <Helmet>
        <title> AI Palmistry (Hastarekha Shastra) | Bhagyanetram</title>
        <meta name="description" content="Get an instant Vedic palm reading using advanced computer vision and traditional Hastarekha principles." />
        <link rel="canonical" href="https://bhagyanetram.com/palmistry" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-cosmic-900 celestial-grid-bg text-white text-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-xs font-medium uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Samudrika & Hastarekha Shastra</span>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-cosmic-800 border border-gold-500/40 shadow-gold-glow flex items-center justify-center mx-auto mb-6 text-gold-300">
              <Hand className="w-10 h-10" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              AI Vedic <span className="gold-gradient-text">Palmistry</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-3xl mx-auto italic leading-relaxed">
              Unlock the karmic destiny etched into the  lines and planetary mounts of your palm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Body */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {!token ? (
            // Authentication Section
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 sm:p-10 rounded-3xl shadow-gold-card max-w-md mx-auto border border-gold-500/30"
            >
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gold-500/20">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-cosmic-900">Devotee Access</h2>
                  <p className="text-xs text-cosmic-500">Sign in to claim your 3 complimentary readings</p>
                </div>
              </div>
              
              {error && (
                <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {authStep === 1 ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gold-500/30 p-3 rounded-xl bg-ivory-50/70 text-cosmic-900 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-sm"
                      value={authForm.name}
                      onChange={e => setAuthForm({...authForm, name: e.target.value})}
                      placeholder="e.g. Ananya Sen"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full border border-gold-500/30 p-3 rounded-xl bg-ivory-50/70 text-cosmic-900 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-sm"
                      value={authForm.phone}
                      onChange={e => setAuthForm({...authForm, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border border-gold-500/30 p-3 rounded-xl bg-ivory-50/70 text-cosmic-900 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-sm"
                      value={authForm.email}
                      onChange={e => setAuthForm({...authForm, email: e.target.value})}
                      placeholder="ananya@example.com"
                    />
                  </div>
                  <div className="flex items-start gap-2.5 pt-2">
                    <input
                      type="checkbox"
                      id="palmistry-terms"
                      required
                      className="mt-0.5 w-4 h-4 rounded border-gold-500/50 text-gold-600 focus:ring-gold-500 cursor-pointer accent-gold-600"
                      checked={authForm.terms}
                      onChange={e => setAuthForm({...authForm, terms: e.target.checked})}
                    />
                    <label htmlFor="palmistry-terms" className="text-xs text-cosmic-800 leading-snug cursor-pointer select-none">
                      I agree to the{' '}
                      <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-gold-700 underline font-semibold hover:text-gold-800">
                        Terms &amp; Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold-700 underline font-semibold hover:text-gold-800">
                        Privacy Policy
                      </Link>
                      , and authorize BhagyaNetram to send a secure verification code to my email.
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="gold-btn w-full p-4 rounded-xl font-display font-semibold text-sm shadow-gold-glow flex items-center justify-center gap-2 mt-4"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogIn className="w-5 h-5" /> Send Secure Code</>}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-emerald-800 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span> OTP dispatched to <strong>{authForm.email}</strong>. Please check your inbox or spam.</span>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-800 mb-1 font-display">
                      Enter 6-Digit Code
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gold-500/40 p-3 rounded-xl bg-ivory-50/70 text-cosmic-900 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-center text-2xl tracking-[0.3em] font-mono font-bold"
                      value={authForm.otp}
                      onChange={e => setAuthForm({...authForm, otp: e.target.value})}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="gold-btn w-full p-4 rounded-xl font-display font-semibold text-sm shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify Code & Enter Sanctuary'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthStep(1)}
                    className="w-full text-cosmic-500 text-xs font-medium hover:text-gold-700 transition mt-2 text-center"
                  >
                    ← Edit contact details
                  </button>
                </form>
              )}
            </motion.div>
          ) : (
            // Palmistry Dashboard
            <div className="space-y-8">
              {/* User Header Card */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gold-500/30 shadow-gold-card flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 font-display font-bold text-xl">
                    {user?.name ? user.name[0].toUpperCase() : '✦'}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-cosmic-900">Welcome, {user?.name}</h3>
                    <p className="text-cosmic-600 text-sm">
                      Complimentary Readings: <strong className="text-gold-700 font-display text-lg">{user?.palmistryCredits ?? 0} / 3 remaining</strong>
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs font-display font-semibold text-cosmic-500 hover:text-rose-600 transition border border-gold-500/20 px-4 py-2 rounded-full hover:bg-rose-50"
                >
                  Exit Session
                </button>
              </div>

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-center text-sm font-medium">
                  {error}
                </div>
              )}

              {user?.palmistryCredits > 0 ? (
                <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-gold-card border border-gold-500/30">
                  <div className="flex flex-col items-center">
                    
                    {!image ? (
                      <div
                        className="w-full max-w-lg border-2 border-dashed border-gold-500/40 rounded-3xl p-10 sm:p-14 flex flex-col items-center justify-center bg-ivory-50/60 hover:bg-ivory-100/60 transition cursor-pointer group"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="w-20 h-20 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 mb-4 group-hover:scale-105 transition-transform">
                          <Camera className="w-10 h-10" />
                        </div>
                        <h4 className="font-display text-2xl font-bold text-cosmic-900 mb-2">Scan or Upload Palm</h4>
                        <p className="text-cosmic-600 text-center text-sm mb-6 max-w-xs leading-relaxed">
                          Take a clear, well-lit photo of your primary hand held flat with palm lines clearly visible.
                        </p>
                        <div className="gold-btn px-6 py-3 rounded-full font-display font-semibold text-xs shadow-gold-glow flex items-center gap-2">
                          <Upload className="w-4 h-4" /> Choose Palm Photo
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col items-center">
                        <div className="relative rounded-3xl overflow-hidden shadow-gold-card max-w-sm mb-6 border border-gold-500/40">
                          <img src={image} alt="Palm" className="w-full h-auto object-cover max-h-[380px]" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                          <button
                            onClick={() => { setImage(null); setReading(null); }}
                            className="px-6 py-3 rounded-full border border-gold-500/40 font-display font-semibold text-xs text-cosmic-800 hover:bg-ivory-100 transition"
                          >
                            Retake Picture
                          </button>
                          {!reading && (
                            <button
                              onClick={handleAnalyze}
                              disabled={loading}
                              className="gold-btn px-8 py-3 rounded-full font-display font-semibold text-xs shadow-gold-glow flex items-center gap-2"
                            >
                              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Reveal Hastarekha Reading</>}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <input type="file" accept="image/*" capture="environment" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
                  </div>

                  {loading && image && !reading && (
                    <div className="mt-12 flex flex-col items-center">
                      <div className="w-14 h-14 border-4 border-gold-200 border-t-gold-600 rounded-full animate-spin mb-4"></div>
                      <p className="font-display text-cosmic-900 font-bold text-base">Deciphering Palm Mounts & Lines...</p>
                      <p className="text-xs text-cosmic-500 mt-1">Analyzing Hridaya (Heart), Mastishka (Head), and Jeevan (Life) Rekha</p>
                    </div>
                  )}

                  {reading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-12 bg-ivory-100/70 rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-xs"
                    >
                      <div className="flex items-center gap-3 pb-5 mb-6 border-b border-gold-500/20">
                        <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-700">
                          <Hand className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-bold text-cosmic-900">Your Hastarekha Report</h3>
                          <p className="text-xs text-cosmic-600"> lines analyzed as per classical Samudrika Shastra</p>
                        </div>
                      </div>

                      <div className="prose max-w-none">
                        <ReactMarkdown
                          components={{
                            h1: ({ children }) => (
                              <h3 className="font-display text-2xl font-bold text-cosmic-900 mt-6 mb-3 pb-2 border-b border-gold-500/20">
                                {children}
                              </h3>
                            ),
                            h2: ({ children }) => (
                              <h4 className="font-display text-xl font-bold text-cosmic-900 mt-5 mb-2.5 pb-2 border-b border-gold-500/20 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-gold-600" />
                                <span>{children}</span>
                              </h4>
                            ),
                            h3: ({ children }) => (
                              <div className="mt-6 mb-3 p-3.5 bg-gradient-to-r from-gold-500/15 to-transparent border-l-4 border-gold-500 rounded-r-xl">
                                <h4 className="font-display text-lg font-bold text-cosmic-900 flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-gold-600" />
                                  <span>{children}</span>
                                </h4>
                              </div>
                            ),
                            p: ({ children }) => (
                              <p className="text-cosmic-800 leading-relaxed text-sm sm:text-base mb-4 font-sans">
                                {children}
                              </p>
                            ),
                            ul: ({ children }) => <ul className="space-y-2 mb-4 pl-4">{children}</ul>,
                            li: ({ children }) => (
                              <li className="flex items-start gap-2 text-cosmic-800 text-sm sm:text-base">
                                <span className="text-gold-600 font-bold">✦</span>
                                <span>{children}</span>
                              </li>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-bold text-cosmic-950 text-gold-900">
                                {children}
                              </strong>
                            ),
                          }}
                        >
                          {cleanReading(reading)}
                        </ReactMarkdown>
                      </div>

                      <div className="mt-8 pt-6 border-t border-gold-500/20 text-center">
                        <p className="text-xs text-cosmic-500 italic">
                          "Lines on the palm represent the energetic blueprints of past karmas; conscious righteous action (Purushartha) shapes destiny."
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gold-500/30 shadow-gold-card text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-4 text-gold-600">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-cosmic-900 mb-2">Complimentary Quota Exhausted</h3>
                  <p className="text-cosmic-600 max-w-md mx-auto text-sm leading-relaxed mb-6">
                    You have utilized all 3 of your complimentary palm readings. For an in-depth astrological and Samudrika consultation with Pandit Pranav Shastri, please book a personal consultation.
                  </p>
                  <a
                    href="/contact"
                    className="gold-btn px-8 py-3.5 rounded-full font-display font-semibold text-xs shadow-gold-glow inline-flex items-center gap-2"
                  >
                    <span>Schedule Astrologer Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

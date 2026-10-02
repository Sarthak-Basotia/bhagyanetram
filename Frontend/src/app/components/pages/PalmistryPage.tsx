import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hand, Camera, Upload, LogIn, CheckCircle2, Lock, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.bhagyanetram.com";

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
        // Display test OTP in console for easy debugging
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

  return (
    <>
      <Helmet>
        <title>AI Palmistry Reading | Bhagyanetram</title>
        <meta name="description" content="Get an instant palm reading using advanced AI. Simply scan or upload a picture of your palm." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#D35400] mb-4 flex items-center justify-center gap-3">
              <Hand className="w-10 h-10" />
              AI Palmistry
            </h1>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Unlock the secrets hidden in the lines of your hand. Upload a clear picture of your palm to receive a personalized Vedic reading.
            </p>
          </div>

          {!token ? (
            // Authentication Section
            <div className="bg-white p-8 rounded-2xl shadow-md max-w-md mx-auto border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Log In to Continue</h2>
              </div>
              
              {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

              {authStep === 1 ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input type="text" required className="w-full border p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-[#D35400] outline-none" 
                      value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                    <input type="tel" required className="w-full border p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-[#D35400] outline-none" 
                      value={authForm.phone} onChange={e => setAuthForm({...authForm, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input type="email" required className="w-full border p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-[#D35400] outline-none" 
                      value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} />
                  </div>
                  <div className="flex items-start gap-2 pt-2">
                    <input type="checkbox" id="terms" required className="mt-1" 
                      checked={authForm.terms} onChange={e => setAuthForm({...authForm, terms: e.target.checked})} />
                    <label htmlFor="terms" className="text-sm text-slate-600">I agree to the terms and conditions and allow Bhagyanetram to send me an OTP on email.</label>
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-[#D35400] hover:bg-orange-700 text-white p-4 rounded-xl font-bold transition flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogIn className="w-5 h-5" /> Send OTP</>}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="mb-6 bg-green-50 p-3 rounded-lg flex items-start gap-2 text-green-700 text-sm">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>OTP sent successfully to {authForm.email}. Please check your inbox.</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Enter OTP</label>
                    <input type="text" required className="w-full border p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-[#D35400] outline-none text-center text-xl tracking-widest" 
                      value={authForm.otp} onChange={e => setAuthForm({...authForm, otp: e.target.value})} />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-[#D35400] hover:bg-orange-700 text-white p-4 rounded-xl font-bold transition flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Login'}
                  </button>
                  <button type="button" onClick={() => setAuthStep(1)} className="w-full text-slate-500 text-sm hover:underline mt-2">
                    Back to details
                  </button>
                </form>
              )}
            </div>
          ) : (
            // Palmistry Dashboard
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Welcome, {user?.name}</h3>
                  <p className="text-slate-600">You have <strong className="text-[#D35400] text-lg">{user?.palmistryCredits}</strong> palm readings left.</p>
                </div>
                <button onClick={handleLogout} className="text-sm font-semibold text-slate-500 hover:text-red-500 transition border px-4 py-2 rounded-lg">
                  Logout
                </button>
              </div>

              {error && <div className="p-4 bg-red-50 text-red-700 rounded-xl text-center font-medium">{error}</div>}

              {user?.palmistryCredits > 0 ? (
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
                  <div className="flex flex-col items-center">
                    
                    {!image ? (
                      <div className="w-full max-w-md border-2 border-dashed border-slate-300 rounded-2xl p-12 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <Camera className="w-16 h-16 text-slate-400 mb-4" />
                        <h4 className="text-xl font-bold text-slate-700 mb-2">Upload Palm Image</h4>
                        <p className="text-slate-500 text-center text-sm mb-6">Take a clear picture of your dominant hand (palm facing up) under good lighting.</p>
                        <div className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2">
                          <Upload className="w-5 h-5" /> Browse Files
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col items-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-md max-w-sm mb-6 border border-slate-200">
                          <img src={image} alt="Palm" className="w-full h-auto object-cover" />
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => { setImage(null); setReading(null); }} className="px-6 py-3 border border-slate-300 rounded-full font-semibold text-slate-600 hover:bg-slate-50 transition">
                            Retake Picture
                          </button>
                          {!reading && (
                            <button onClick={handleAnalyze} disabled={loading} className="bg-[#D35400] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-700 transition flex items-center gap-2">
                              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5" /> Analyze Palm</>}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <input type="file" accept="image/*" capture="environment" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
                  </div>

                  {loading && image && !reading && (
                    <div className="mt-10 flex flex-col items-center">
                      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                      <p className="text-blue-700 font-medium">Scanning lines, mounts, and shapes...</p>
                    </div>
                  )}

                  {reading && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200">
                      <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Your Palm Reading</h3>
                      <div className="prose prose-slate prose-headings:text-slate-800 prose-headings:font-bold prose-p:leading-relaxed max-w-none text-slate-700">
                        <ReactMarkdown>{reading}</ReactMarkdown>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="bg-amber-50 p-8 rounded-2xl border border-amber-200 text-center">
                  <h3 className="text-2xl font-bold text-amber-800 mb-2">Out of Credits</h3>
                  <p className="text-amber-700">You have used all 3 of your complimentary palm readings. Please check back later or contact support to purchase more credits.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

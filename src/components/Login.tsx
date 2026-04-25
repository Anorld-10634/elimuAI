import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Mail, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Login({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid school or personal email.');
      return;
    }
    onLogin(email);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Left Pane - Visual & Branding */}
      <div className="relative w-full lg:w-1/2 bg-indigo-900 flex items-center justify-center p-8 lg:p-12 order-2 lg:order-1">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://picsum.photos/seed/school/1024/768?grayscale" 
            alt="East African Student Studying" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-md text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-2xl mb-8"
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold tracking-tight leading-none mb-6"
          >
            Smarter STEM.<br />
            <span className="text-indigo-400 font-serif italic">Localized logic.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-indigo-100 opacity-80 leading-relaxed mb-8"
          >
            Join ElimuAI to master Physics, Biology, and more using code-switching and analogies that reflect our world. 
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-6"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/user${i}/100/100`} className="w-10 h-10 rounded-full border-2 border-indigo-900" referrerPolicy="no-referrer" />
              ))}
            </div>
            <p className="text-sm font-medium text-indigo-200">5,000+ Students online</p>
          </motion.div>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 order-1 lg:order-2 bg-gray-50/50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm"
        >
          <div className="mb-10 lg:hidden flex items-center gap-2">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
             </div>
             <span className="font-bold text-xl text-gray-900 tracking-tight">ElimuAI</span>
          </div>

          <header className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Anza sasa! 🚀</h2>
            <p className="text-gray-500 mt-2">Enter your email to resume your adaptive STEM journey.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Mail className="w-3 h-3" />
                Email Address
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder=""
                  className={cn(
                    "w-full bg-white border border-gray-200 rounded-2xl py-4 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all",
                    error && "border-red-500 ring-red-100"
                  )}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              {error && <p className="text-red-500 text-xs font-medium ml-1">{error}</p>}
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all group"
            >
              Sign In to Your Hub
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <footer className="mt-12 pt-12 border-t border-gray-100 space-y-4">
             <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                   <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-900 leading-tight">Student Privacy Guaranteed</p>
                   <p className="text-[10px] text-gray-500 mt-0.5">Your progress belongs to you only.</p>
                </div>
             </div>
             <p className="text-center text-[10px] text-gray-400 font-medium">
               Hakuna account? Usijali. Enter your email and we'll create your profile instantly.
             </p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Mail, Lock, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

function AuthContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const { login, signup, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/library';

  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnUrl);
    }
  }, [isAuthenticated, router, returnUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(email);
    } else {
      signup(username, email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--background)]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[80px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group z-20">
        <BookOpen className="text-[var(--accent)] transition-transform group-hover:scale-110" />
        <span className="font-serif text-xl font-semibold tracking-wide">AXON Online Book Reading</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="backdrop-blur-xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-3xl p-10 shadow-2xl overflow-hidden relative">
          
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl mb-2">
              {isLogin ? "Welcome Back" : "Join the Library"}
            </h2>
            <p className="font-sans text-sm opacity-60">
              {isLogin ? "Enter your credentials to access your collection." : "Create an account to build your premium library."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.9 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 group-focus-within:text-[var(--accent)] group-focus-within:opacity-100 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Username" 
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--foreground)]/10 transition-all font-sans"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 group-focus-within:text-[var(--accent)] group-focus-within:opacity-100 transition-colors" />
              <input 
                type="email" 
                placeholder="Email address" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--foreground)]/10 transition-all font-sans"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 group-focus-within:text-[var(--accent)] group-focus-within:opacity-100 transition-colors" />
              <input 
                type="password" 
                placeholder="Password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[var(--accent)]/50 focus:bg-[var(--foreground)]/10 transition-all font-sans"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[var(--foreground)] text-[var(--background)] rounded-xl py-3 font-sans font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity mt-4"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center font-sans text-sm">
            <span className="opacity-60">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[var(--accent)] font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--background)] flex items-center justify-center">Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}

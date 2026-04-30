"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useAuth } from '@/context/AuthContext';
import { Settings, BookOpen, Search, Moon, Sun, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { theme, setTheme } = useGlobalState();
  const { user, isAuthenticated, logout } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleTheme = () => {
    const isDark = theme === "dark" || theme === "solarized-dark";
    setTheme(isDark ? "parchment-gold" : "solarized-dark");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--foreground)]/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <BookOpen className="text-[var(--accent)] transition-transform group-hover:scale-110" />
          <span className="font-serif text-xl font-semibold tracking-wide">AXON Online Book Reading</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/library" className="hover:text-[var(--accent)] transition-colors font-sans text-sm font-semibold uppercase tracking-wider">
            Library
          </Link>
          
          <button onClick={toggleTheme} className="hover:text-[var(--accent)] transition-colors">
            {theme === "solarized-dark" || theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
              className="hover:text-[var(--accent)] transition-colors mt-1"
            >
              <Settings size={20} />
            </button>
            
            <AnimatePresence>
              {isSettingsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-4 w-48 bg-[var(--background)] border border-[var(--foreground)]/10 shadow-2xl rounded-lg overflow-hidden"
                >
                  <div className="p-3">
                    <p className="text-xs uppercase tracking-wider opacity-60 mb-2 font-sans font-bold">Eye Comfort</p>
                    <div className="space-y-1 font-sans">
                      <button onClick={() => setTheme("newspaper-brown")} className="w-full text-left text-sm px-2 py-2 hover:bg-[var(--foreground)]/5 rounded transition-colors">Newspaper Brown</button>
                      <button onClick={() => setTheme("vintage-lace")} className="w-full text-left text-sm px-2 py-2 hover:bg-[var(--foreground)]/5 rounded transition-colors">Vintage Lace</button>
                      <button onClick={() => setTheme("rare-jade")} className="w-full text-left text-sm px-2 py-2 hover:bg-[var(--foreground)]/5 rounded transition-colors">Rare Jade</button>
                      <button onClick={() => setTheme("solarized-dark")} className="w-full text-left text-sm px-2 py-2 hover:bg-[var(--foreground)]/5 rounded transition-colors">Solarized Dark</button>
                      <button onClick={() => setTheme("parchment-gold")} className="w-full text-left text-sm px-2 py-2 hover:bg-[var(--foreground)]/5 rounded transition-colors">Parchment Gold</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Auth State */}
          <div className="border-l border-[var(--foreground)]/20 pl-6 flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/30 group-hover:bg-[var(--accent)]/20 transition-colors">
                    <User size={14} className="text-[var(--accent)]" />
                  </div>
                  <span className="font-sans text-sm font-medium tracking-wide hidden sm:block">
                    {user?.username}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  className="hover:text-red-500 transition-colors opacity-70 hover:opacity-100 flex items-center gap-2"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link 
                href="/auth" 
                className="bg-[var(--foreground)] text-[var(--background)] px-5 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

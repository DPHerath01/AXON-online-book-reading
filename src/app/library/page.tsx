"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { featuredBooks, newArrivals, categories } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import AuthGuard from '@/components/AuthGuard';

const allBooks = [...featuredBooks, ...newArrivals];

export default function Library() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredBooks = activeCategory === "all" 
    ? allBooks 
    : allBooks.filter(b => b.category === activeCategory);

  const openBook = (id: string) => {
    window.open(`/reader/${id}`, '_blank');
  };

  return (
    <AuthGuard>
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <h1 className="font-serif text-4xl mb-8">The <span className="italic text-[var(--accent)]">Library</span></h1>
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-4 mb-10 pb-2 border-b border-[var(--foreground)]/10">
          <button 
            onClick={() => setActiveCategory("all")}
            className={`whitespace-nowrap px-4 py-2 font-sans font-medium transition-colors relative ${activeCategory === "all" ? "text-[var(--accent)]" : "opacity-70 hover:opacity-100"}`}
          >
            All Works
            {activeCategory === "all" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]" />
            )}
          </button>
          
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 font-sans font-medium transition-colors relative ${activeCategory === cat.id ? "text-[var(--accent)]" : "opacity-70 hover:opacity-100"}`}
            >
              {cat.name}
              {activeCategory === cat.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]" />
              )}
            </button>
          ))}
        </div>

        {/* Book Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <AnimatePresence>
            {filteredBooks.map(book => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={book.id}
                onClick={() => openBook(book.id)}
                className="group cursor-pointer flex flex-col"
              >
                <div 
                  className="aspect-[2/3] rounded-lg overflow-hidden mb-3 relative shadow-lg"
                  style={{ backgroundColor: `rgb(${book.coverColor})` }}
                >
                  <img src={book.coverImage} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-serif text-lg leading-tight mb-1">{book.title}</h3>
                <p className="font-sans text-sm opacity-70">{book.author}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredBooks.length === 0 && (
          <div className="text-center py-20 opacity-50 font-serif text-xl">
            No volumes found in this category.
          </div>
        )}
      </main>
      <Footer />
    </AuthGuard>
  );
}

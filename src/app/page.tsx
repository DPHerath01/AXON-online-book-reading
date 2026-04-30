"use client";

import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { featuredBooks, newArrivals, categories } from '@/data/mockData';
import gsap from 'gsap';

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    // GSAP Intro animation
    const ctx = gsap.context(() => {
      // Cinematic Title Animation
      gsap.fromTo(".hero-char", 
        { opacity: 0, y: 30, filter: "blur(12px)", scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          stagger: 0.04,
          duration: 1.5,
          ease: "power4.out",
          delay: 0.1
        }
      );

      // Subtitle fade in
      gsap.fromTo(".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 0.8, y: 0, duration: 1.2, ease: "power3.out", delay: 1.2 }
      );

      // Bento Grid stagger
      gsap.from(".bento-item", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.8
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  const openBook = (id: string) => {
    window.open(`/reader/${id}`, '_blank');
  };

  const title = "AXON Online Book Reading";

  return (
    <>
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12" ref={heroRef}>
        <div className="mb-12">
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6 flex flex-wrap text-[var(--foreground)]">
            {title.split("").map((char, index) => (
              <span 
                key={index} 
                className="hero-char inline-block"
                style={{ 
                  textShadow: char !== " " ? "0 0 30px var(--accent)" : "none",
                  color: index < 4 ? "var(--accent)" : "var(--foreground)" 
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle font-sans opacity-0 text-lg max-w-2xl leading-relaxed">
            A premium bibliographical environment designed for prolonged consumption, eye comfort, and immersive motion.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          
          {/* Featured Book - Spans 2 cols, 2 rows */}
          <div 
            onClick={() => openBook(featuredBooks[0].id)}
            className="bento-item col-span-1 md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative group cursor-pointer"
            style={{ backgroundColor: `rgb(${featuredBooks[0].coverColor})` }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img 
              src={featuredBooks[0].coverImage} 
              alt={featuredBooks[0].title}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2 block font-sans">Featured Masterpiece</span>
              <h2 className="text-white font-serif text-3xl mb-1">{featuredBooks[0].title}</h2>
              <p className="text-white/80 font-sans">{featuredBooks[0].author}</p>
            </div>
          </div>

          {/* Categories - Stacked */}
          <div className="bento-item col-span-1 md:col-span-1 rounded-3xl p-6 flex flex-col justify-between border border-[var(--foreground)]/10">
             <h3 className="font-serif text-xl">Categories</h3>
             <div className="flex flex-col gap-3 mt-4">
               {categories.map(c => (
                 <button key={c.id} className="text-sm py-2 px-3 rounded-lg border border-[var(--foreground)]/10 hover:border-[var(--accent)] transition-colors text-left flex items-center gap-2 font-sans">
                   <span className="opacity-80">{c.name}</span>
                 </button>
               ))}
             </div>
          </div>

          <div 
            onClick={() => openBook(newArrivals[0].id)}
            className="bento-item col-span-1 md:col-span-1 rounded-3xl overflow-hidden relative group cursor-pointer"
          >
            <img src={newArrivals[0].coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 flex flex-col justify-end p-5">
               <h4 className="text-white font-serif text-xl">{newArrivals[0].title}</h4>
               <p className="text-white/70 text-sm font-sans">{newArrivals[0].author}</p>
            </div>
          </div>

          {/* Wide Banner */}
          <div className="bento-item col-span-1 md:col-span-2 lg:col-span-2 rounded-3xl overflow-hidden relative flex items-center p-8 cursor-pointer group bg-[var(--accent)]/10 border border-[var(--accent)]/20">
            <div className="relative z-10">
              <h3 className="font-serif text-2xl mb-2">Explore the Library</h3>
              <p className="font-sans opacity-80 mb-4 max-w-sm">Thousands of volumes carefully curated and formatted for the ultimate reading experience.</p>
              <button 
                onClick={(e) => { e.stopPropagation(); window.open('/library', '_blank'); }}
                className="font-sans text-sm font-semibold tracking-wide uppercase px-6 py-2 rounded-full border border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
              >
                Open Library
              </button>
            </div>
            {/* Ambient glow decoration */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full ambient-glow mix-blend-screen opacity-20 pointer-events-none"></div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

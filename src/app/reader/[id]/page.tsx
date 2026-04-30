"use client";

import React, { useState, useEffect, use } from 'react';
import { useGlobalState } from '@/context/GlobalStateContext';
import { BookOpen, Bookmark, ArrowLeft } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import AuthGuard from '@/components/AuthGuard';

export default function Reader({ params }: { params: Promise<{ id: string }> }) {
  const { bookmarks, addBookmark } = useGlobalState();
  const resolvedParams = use(params);
  const bookId = resolvedParams.id;
  const [currentPage, setCurrentPage] = useState(0);

  const isBookmarked = bookmarks[bookId]?.includes(currentPage) ?? false;

  const handleBookmark = () => {
    addBookmark(bookId, currentPage);
  };

  // Mock content
  const pages = [
    { text: "Chapter 1\n\nThe beginning of everything. In a world full of noise, this is the silence you seek. The text wraps beautifully and the pages turn like a dream." },
    { text: "As you continue reading, you notice the ambient lighting adjusting to the mood. The ergonomic design ensures that your eyes never tire, allowing for prolonged reading sessions." },
    { text: "Chapter 2\n\nThe plot thickens. The protagonist finds a mysterious artifact that bends the fabric of reality. The details are described with such clarity that you feel as if you are there." },
    { text: "The journey continues into the unknown. We explore the deep connections between characters and the environment, brought to life through the Manisha Design Guide." }
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        {/* Reader Header */}
      <header className="fixed top-0 w-full z-50 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--foreground)]/10 px-6 py-4 flex items-center justify-between">
        <button onClick={() => window.close()} className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors opacity-70 hover:opacity-100">
          <ArrowLeft size={20} />
          <span className="font-sans text-sm tracking-wide uppercase">Close</span>
        </button>
        
        <div className="font-serif text-lg tracking-wider opacity-80">
          Now Reading: {bookId}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleBookmark}
            className={`transition-colors ${isBookmarked ? 'text-[var(--accent)]' : 'opacity-70 hover:opacity-100 hover:text-[var(--accent)]'}`}
          >
            <Bookmark fill={isBookmarked ? 'currentColor' : 'none'} size={20} />
          </button>
        </div>
      </header>

      {/* Reader Content */}
      <main className="flex-1 flex items-center justify-center pt-20 pb-10 bg-[var(--background)] transition-colors duration-500 relative">
        <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-[100px] pointer-events-none mix-blend-screen z-0"></div>
        
        <div className="shadow-2xl relative z-10 bg-[var(--background)]">
          {/* @ts-ignore */}
          <HTMLFlipBook 
            width={400} 
            height={600} 
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={(e: any) => setCurrentPage(e.data)}
            className="flip-book"
          >
            {/* Cover */}
            <div className="page page-cover bg-[var(--foreground)] text-[var(--background)] p-12 flex flex-col justify-center items-center h-full">
              <h1 className="font-serif text-4xl mb-4 text-center">Title of the Book</h1>
              <p className="font-sans uppercase tracking-widest text-sm opacity-80">Author Name</p>
            </div>
            
            {/* Pages */}
            {pages.map((p, i) => (
              <div key={i} className="page p-10 border-r border-[var(--foreground)]/10 bg-[var(--background)] h-full overflow-hidden flex flex-col">
                <div className="flex-1 font-serif text-lg leading-loose whitespace-pre-wrap opacity-90">
                  {p.text}
                </div>
                <div className="text-center font-sans text-xs opacity-50 mt-4">
                  - {i + 1} -
                </div>
              </div>
            ))}
            
            {/* Back Cover */}
            <div className="page page-cover bg-[var(--foreground)] p-12 flex justify-center items-center h-full">
              <BookOpen size={48} className="text-[var(--background)] opacity-50" />
            </div>
          </HTMLFlipBook>
        </div>
      </main>

      {/* Progress Bar */}
      <div className="fixed bottom-0 w-full h-1 bg-[var(--foreground)]/10 z-50">
        <div 
          className="h-full bg-[var(--accent)] transition-all duration-300" 
          style={{ width: `${(currentPage / (pages.length + 1)) * 100}%` }}
        />
        </div>
      </div>
    </AuthGuard>
  );
}

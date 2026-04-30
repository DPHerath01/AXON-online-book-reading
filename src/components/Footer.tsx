import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#1a1512] text-[#d1b07b] py-8 px-6 md:px-12 relative z-10 border-t border-[#d1b07b]/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm font-sans tracking-wider opacity-80 uppercase">Design Guide Ideas: Manisha</p>
          <p className="text-sm font-sans tracking-wider opacity-80 uppercase mt-1">Developer Name: D.P. Herath</p>
        </div>
        
        <div className="flex items-center space-x-6 text-sm font-sans uppercase tracking-wider opacity-80">
          <a href="#" className="hover:text-white transition-colors duration-300">
            Twitter
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            Github
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            LinkedIn
          </a>
        </div>
        
        <div className="flex flex-col items-center md:items-end text-xs font-sans opacity-60">
          <div className="flex space-x-4 mb-2">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
          </div>
          <p>&copy; {currentYear} Next-Generation Web Reader. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

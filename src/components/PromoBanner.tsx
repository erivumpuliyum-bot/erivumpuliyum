import { useState } from 'react';
import rrLogo from '@/assets/rr-creator-lab-logo.png';

const PromoBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <a
      href="https://rrcreatorlab.in"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 z-[9999] flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-3 py-2 shadow-lg hover:scale-[1.02] transition-transform no-underline max-w-[320px]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <img src={rrLogo} alt="RR Creator Lab" className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
      <span className="text-xs text-gray-700 leading-tight">
        Made by <b className="text-gray-900">RR Creator Lab</b>
      </span>
      <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap font-medium">
        ✨ Get Yours
      </span>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVisible(false); }}
        className="text-gray-400 hover:text-gray-600 text-sm ml-0.5 flex-shrink-0"
        aria-label="Close banner"
      >
        ✕
      </button>
    </a>
  );
};

export default PromoBanner;

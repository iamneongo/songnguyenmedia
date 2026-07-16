import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
      <div className="bg-white rounded-full shadow-lg px-5 py-3 flex items-center justify-between w-64">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-normal text-black" style={{ fontFamily: "'Caster', sans-serif" }}>SN</span>
          <span className="text-lg font-bold tracking-tight text-black">Media</span>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-6 h-6 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
        >
          <span 
            className={`block h-0.5 w-5 bg-black transform transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[4px]' : ''}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.77,0,0.175,1)' }}
          />
          <span 
            className={`block h-0.5 w-5 bg-black transform transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.77,0,0.175,1)' }}
          />
        </button>
      </div>

      <div 
        className={`mt-2 bg-white rounded-2xl shadow-lg w-64 overflow-hidden transition-all duration-300 origin-top
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}
      >
        <div className="flex flex-col py-2">
          <a href="#" className="px-5 py-3 text-sm font-medium text-black hover:bg-black/5 transition-colors">Dự án</a>
          <a href="#" className="px-5 py-3 text-sm font-medium text-black hover:bg-black/5 transition-colors">Dịch vụ</a>
          <a href="#" className="px-5 py-3 text-sm font-medium text-black hover:bg-black/5 transition-colors">Liên hệ</a>
        </div>
      </div>
    </div>
  );
}

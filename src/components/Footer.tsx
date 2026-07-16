import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  useGSAP(() => {
    // Reveal and scale down effect for the large heading
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: 'power3.out'
    });
    
    // Fade in the other elements
    gsap.from('.footer-reveal', {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-black py-20 md:py-32 px-6 relative z-10 border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col justify-between min-h-[50vh]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xl">
            <h2 ref={headingRef} className="text-4xl md:text-6xl lg:text-[80px] font-normal leading-[1.1] text-white tracking-tight mb-8 origin-left">
              Sẵn sàng tạo ra <br />
              <em className="not-italic text-white/70" style={{ fontFamily: "'Caster', sans-serif", fontStyle: 'normal' }}>điều khác biệt?</em>
            </h2>
            <button className="footer-reveal flex items-center gap-4 group">
              <span className="text-xl md:text-2xl border-b border-white pb-1 group-hover:text-white/80 group-hover:border-white/80 transition-colors">
                Bắt đầu dự án của bạn
              </span>
              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          
          <div className="flex flex-col gap-8 md:text-right">
            <div className="footer-reveal">
              <p className="text-white/50 text-sm uppercase tracking-widest mb-3">Liên hệ</p>
              <a href="mailto:hello@novamedia.com" className="text-lg hover:text-white/80 transition-colors">hello@novamedia.com</a>
              <p className="text-lg mt-1">+84 123 456 789</p>
            </div>
            <div className="footer-reveal">
              <p className="text-white/50 text-sm uppercase tracking-widest mb-3">Địa chỉ</p>
              <p className="text-lg text-white/90">
                123 Creative Street<br />
                District 1, HCMC
              </p>
            </div>
          </div>
        </div>

        <div className="footer-reveal mt-24 pt-8 border-t border-white/10 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <p>© 2026 Song Nguyễn Media. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/80 transition-colors">Instagram</a>
            <a href="#" className="hover:text-white/80 transition-colors">Behance</a>
            <a href="#" className="hover:text-white/80 transition-colors">Vimeo</a>
            <a href="#" className="hover:text-white/80 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

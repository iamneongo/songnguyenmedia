import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ClientsSection() {
  const clients = ["Vogue", "Sony", "Mercedes-Benz", "Netflix", "Spotify", "Samsung", "Apple", "Nike"];
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Reveal animation
    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Infinite Marquee
    const marquee = marqueeRef.current;
    if (!marquee) return;
    
    // Duplicate the content to make it seamless
    const content = marquee.innerHTML;
    marquee.innerHTML = content + content;
    
    // Calculate the total width of one set of items
    // by moving the container by -50% (since we duplicated it)
    gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: 'none'
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-black py-24 md:py-32 relative z-10 border-t border-white/10 overflow-hidden">
      <div className="flex flex-col items-center">
        <p className="text-[#D9C4AA] text-sm uppercase tracking-[0.2em] font-semibold mb-12 text-center px-6">
          Khách hàng của chúng tôi
        </p>
        
        {/* Marquee Wrapper */}
        <div className="w-full flex whitespace-nowrap overflow-hidden">
          <div ref={marqueeRef} className="flex gap-16 md:gap-32 pr-16 md:pr-32 opacity-70">
            {clients.map((client, i) => (
              <div key={i} className="text-3xl md:text-5xl text-white/80 inline-block" style={{ fontFamily: "'Caster', sans-serif", fontStyle: 'normal' }}>
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

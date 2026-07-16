import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.from(".gallery-title", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from(".gallery-img", {
      scrollTrigger: {
        trigger: ".gallery-grid",
        start: "top 80%",
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center gallery-title">
          <h2 className="text-white text-3xl md:text-5xl font-normal leading-tight">
            Góc nhìn <em className="not-italic text-[#F6E4CF]" style={{ fontFamily: "'Caster', sans-serif", fontStyle: 'normal' }}>Nghệ thuật</em>
          </h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Những tác phẩm mang đậm dấu ấn thị giác và cảm xúc
          </p>
        </div>

        <div className="gallery-grid columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {Array(6).fill('/banner.mp4').map((src, idx) => (
            <div key={idx} className="gallery-img break-inside-avoid overflow-hidden rounded-[24px] relative group cursor-pointer">
              <video 
                src={src} 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span 
                  className="text-white text-xl md:text-2xl border border-white/50 px-6 py-2 rounded-full backdrop-blur-md bg-black/20"
                  style={{ fontFamily: "'Caster', sans-serif" }}
                >
                  Xem chi tiết
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

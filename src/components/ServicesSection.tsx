import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Commercial Films",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260716_142010_commercial.jpg&w=1200&q=85",
    color: "#E5D9C5"
  },
  {
    title: "Social Media Campaigns",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260716_142011_social.jpg&w=1200&q=85",
    color: "#C5D3E5"
  },
  {
    title: "Music Videos (MV)",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260716_142012_musicvideo.jpg&w=1200&q=85",
    color: "#E5C5C5"
  },
  {
    title: "Brand Identity",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260716_142013_brand.jpg&w=1200&q=85",
    color: "#D9C5E5"
  }
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".service-item", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative bg-black py-32 md:py-48 px-6 min-h-screen flex items-center overflow-hidden">
      {/* Background Images for Hover Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {SERVICES.map((service, index) => (
          <div 
            key={`bg-${index}`}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ 
              opacity: hoveredIndex === index ? 0.4 : 0,
              backgroundImage: `url(${service.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: hoveredIndex === index ? 'scale(1)' : 'scale(1.1)',
              transition: 'opacity 0.7s ease, transform 1.5s ease-out'
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <p className="text-[#D9C4AA] text-sm uppercase tracking-[0.2em] font-semibold mb-16 px-4">
          Dịch vụ
        </p>

        <div ref={listRef} className="flex flex-col">
          {SERVICES.map((service, index) => (
            <div 
              key={index}
              className="service-item group relative py-6 md:py-10 border-b border-white/10 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h3 
                className="text-4xl sm:text-6xl md:text-[70px] lg:text-[90px] font-normal tracking-tight transition-all duration-500 origin-left pr-24 md:pr-40 leading-[1.1]"
                style={{ 
                  color: hoveredIndex === index ? service.color : (hoveredIndex !== null ? 'rgba(255,255,255,0.2)' : 'white'),
                  transform: hoveredIndex === index ? 'translateX(30px)' : 'translateX(0)'
                }}
              >
                {service.title}
              </h3>
              
              <span 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-lg md:text-2xl font-medium transition-all duration-500"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  color: service.color,
                  transform: hoveredIndex === index ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                Khám phá
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

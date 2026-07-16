import { useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import FeaturesSection from './components/FeaturesSection';
import ProcessSection from './components/ProcessSection';
import GallerySection from './components/GallerySection';
import ClientsSection from './components/ClientsSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Preloader text slide up
    tl.from(preloaderTextRef.current, {
      yPercent: 100,
      duration: 1,
      ease: 'power4.out',
      delay: 0.2
    });

    // 2. Preloader text fade out
    tl.to(preloaderTextRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
      ease: 'power2.inOut'
    });

    // 3. Preloader background slide up
    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'expo.inOut'
    });

    // 4. Hero video scale down (starts slightly before preloader finishes)
    tl.from(videoRef.current, {
      scale: 1.15,
      duration: 2,
      ease: 'power3.out'
    }, "-=0.8");

    // 5. Staggered reveal of hero text items
    tl.from(
      heroTextRef.current?.children ? Array.from(heroTextRef.current.children) : [],
      {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      },
      "-=1.5"
    );
  }, { scope: heroRef });

  return (
    <ReactLenis root>
      <div className="font-sans antialiased text-white relative">
        {/* PRELOADER */}
        <div 
          ref={preloaderRef} 
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <div className="overflow-hidden px-4">
            <h1 
              ref={preloaderTextRef}
              className="text-3xl sm:text-5xl md:text-7xl font-normal text-white py-6 leading-relaxed whitespace-nowrap"
              style={{ fontFamily: "'Caster', sans-serif" }}
            >
              Song Nguyễn Media
            </h1>
          </div>
        </div>

        {/* SECTION 1: HERO */}
        <section ref={heroRef} className="relative h-screen overflow-hidden mb-[-25px] bg-black">
          {/* Background Video */}
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover origin-center"
            src="/banner.mp4"
          />
          
          {/* Semi-transparent Overlay */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Navbar */}
          <div className="relative z-50">
            <Navbar />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col justify-end items-center pb-12 md:pb-16 px-4">
            <div ref={heroTextRef}>
              <h1 className="text-center text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-normal text-white leading-[1.1] tracking-tight mb-6">
                Sáng tạo nghệ thuật <br />
                vượt mọi <em className="not-italic" style={{ fontFamily: "'Caster', sans-serif", fontStyle: 'normal' }}>giới hạn</em>
              </h1>
              
              <p className="text-white/80 text-sm md:text-base font-medium max-w-[420px] text-center mx-auto mb-10">
                Chúng tôi kể câu chuyện thương hiệu của bạn qua những thước phim nghệ thuật và chiến dịch truyền thông đột phá.
              </p>
              
              <div className="flex justify-center">
                <div className="bg-black/25 backdrop-blur-md rounded-xl flex items-center pl-6 pr-1 py-1">
                  <span className="text-white text-sm font-medium hidden sm:block mr-4">
                    Tinh tế. Khác biệt. Đẳng cấp. Biến ý tưởng thành hiện thực.
                  </span>
                  <span className="text-white text-sm font-medium sm:hidden mr-4">
                    Tinh tế. Khác biệt. Đẳng cấp.
                  </span>
                  <button className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap">
                    Xem các dự án
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT */}
        <AboutSection />

        {/* SECTION 2.5: SERVICES */}
        <ServicesSection />

        {/* SECTION 3: FEATURES */}
        <FeaturesSection />

        {/* SECTION 3.5: PROCESS */}
        <ProcessSection />

        {/* SECTION 3.7: GALLERY */}
        <GallerySection />

        {/* SECTION 4: CLIENTS */}
        <ClientsSection />

        {/* SECTION 4.5: STATS */}
        <StatsSection />

        {/* SECTION 5: TESTIMONIALS */}
        <TestimonialsSection />

        {/* SECTION 6: FOOTER */}
        <Footer />
      </div>
    </ReactLenis>
  );
}

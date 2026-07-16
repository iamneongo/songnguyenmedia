import { Mail, Plus } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function LogoSVG() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" fill="#321C04"/>
      <path d="M20 12C20 12 25 18 28 20C25 22 20 28 20 28C20 28 15 22 12 20C15 18 20 12 20 12Z" fill="#F6E4CF"/>
    </svg>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Top text fade in
    gsap.from(".about-intro", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Logo spin and text reveal
    gsap.from(logoRef.current, {
      scrollTrigger: {
        trigger: logoRef.current,
        start: "top 85%",
        toggleActions: 'play none none reverse'
      },
      rotate: -90,
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    });

    gsap.from(".word-span", {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 85%",
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: 'power3.out'
    });

  }, { scope: sectionRef });

  const paragraphText = "Chúng tôi là đội ngũ những nhà sáng tạo đam mê thị giác. Hơn thế nữa, chúng tôi hiểu cách kể câu chuyện của bạn một cách chân thực nhất. Bằng sự kết hợp giữa nghệ thuật và công nghệ, chúng tôi mang đến những giải pháp truyền thông hoàn hảo, giúp thương hiệu của bạn tỏa sáng.";

  return (
    <section ref={sectionRef} className="bg-[#F6E4CF] rounded-t-[25px] relative z-10 py-20 md:py-32 px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <p className="about-intro text-[#321C04] text-base md:text-lg text-center leading-relaxed max-w-lg mb-10">
          Chúng tôi tạo ra những sản phẩm truyền thông mang đậm dấu ấn riêng, kết nối cảm xúc và lan tỏa giá trị đích thực.
        </p>

        <div className="about-intro flex flex-wrap justify-center items-center gap-4">
          <button className="flex items-center gap-3 bg-[#321C04] text-[#FFF9F2] rounded-full py-2 px-4 hover:bg-[#1F1003] transition-colors">
            <span className="flex items-center justify-center bg-white rounded-full w-8 h-8">
              <Mail size={16} className="text-[#321C04]" />
            </span>
            <span className="uppercase tracking-wide font-medium pr-2 text-sm">Liên hệ ngay</span>
          </button>
          
          <button className="flex items-center gap-3 bg-[#D9C4AA] text-[#321C04] rounded-full py-2 px-4 hover:bg-[#CEBA9E] transition-colors">
            <span className="flex items-center justify-center bg-white rounded-full w-8 h-8">
              <Plus size={16} className="text-[#321C04]" />
            </span>
            <span className="uppercase tracking-wide font-medium pr-2 text-sm">Nhận báo giá</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto my-16 flex items-center gap-[2px]">
        <div className="w-2 h-2 rounded-full bg-[#D9C4AA]"></div>
        <div className="flex-1 h-[2px] bg-[#D9C4AA]"></div>
        <div className="w-2 h-2 rounded-full bg-[#D9C4AA]"></div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        <div ref={logoRef} className="flex flex-col items-start gap-4 flex-shrink-0">
          <LogoSVG />
          <span className="text-xs uppercase tracking-widest font-semibold text-[#321C04] whitespace-pre-line">
            Sáng tạo /{"\n"}Đột phá
          </span>
        </div>
        
        <div className="flex-1">
          <p ref={textRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.3] font-normal text-[#321C04] flex flex-wrap gap-x-[0.25em] gap-y-[0.1em]">
            {paragraphText.split(" ").map((word, i) => (
              <span key={i} className="overflow-hidden pb-2 -mb-2">
                <span className="word-span inline-block origin-bottom">{word}</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

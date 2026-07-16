import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Pre-production",
    description: "Khởi nguồn từ một ý tưởng đột phá. Chúng tôi nghiên cứu thương hiệu, thấu hiểu khách hàng mục tiêu và xây dựng kịch bản chi tiết, storyboard hoàn chỉnh."
  },
  {
    number: "02",
    title: "Production",
    description: "Biến kịch bản thành những thước phim thực tế. Với đội ngũ đạo diễn, quay phim và hệ thống thiết bị chuẩn điện ảnh, chúng tôi kiểm soát chất lượng từng khung hình."
  },
  {
    number: "03",
    title: "Post-production",
    description: "Phép màu diễn ra ở phòng dựng. Cắt ghép, chỉnh màu (color grading), kỹ xảo (VFX) và thiết kế âm thanh (sound design) được hòa quyện để tạo ra một tác phẩm hoàn hảo."
  },
  {
    number: "04",
    title: "Release & Amplify",
    description: "Tác phẩm hoàn thiện được tối ưu hóa định dạng cho mọi nền tảng truyền thông, sẵn sàng bùng nổ và chạm đến trái tim khán giả."
  }
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Calculate how far to scroll horizontally
    // It's the total width of the scroll container minus the viewport width
    const getScrollAmount = () => {
      let containerWidth = container.scrollWidth;
      return -(containerWidth - window.innerWidth);
    };

    const tween = gsap.to(container, {
      x: getScrollAmount,
      ease: "none"
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true, // Recalculates on resize
    });
    
    // Fade in intro
    gsap.from(".process-intro", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#1a1a1a] h-[100vh] min-h-[600px] flex flex-col pb-6 md:pb-16 overflow-hidden">
      
      {/* Spacer to guarantee distance from the top */}
      <div className="h-20 md:h-32 shrink-0 w-full pointer-events-none" />

      <div className="process-intro shrink-0 px-6 md:px-16 z-10 mb-6 md:mb-12">
        <h2 className="text-[#D9C4AA] text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.2]">
          Quy trình <em className="not-italic text-white" style={{ fontFamily: "'Caster', sans-serif", fontStyle: 'normal' }}>sáng tạo</em>
        </h2>
        <p className="text-white/60 mt-4 max-w-sm text-sm md:text-base">
          Mỗi tác phẩm là một hành trình nghệ thuật được kiểm soát chặt chẽ từ những nét phác thảo đầu tiên đến thành phẩm cuối cùng.
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="flex-1 min-h-0 flex flex-nowrap items-center px-6 md:px-16 w-[fit-content]">
        <div className="flex gap-6 md:gap-16">
          {PROCESS_STEPS.map((step, index) => (
            <div 
              key={index} 
              className="w-[85vw] md:w-[500px] lg:w-[600px] bg-[#222] rounded-[30px] p-6 md:p-12 flex flex-col justify-between shrink-0 h-[45vh] min-h-[280px] max-h-[500px] border border-white/5"
            >
              <div>
                <span className="text-[#D9C4AA] text-5xl md:text-8xl font-medium opacity-20 block mb-4 md:mb-6">
                  {step.number}
                </span>
                <h3 className="text-white text-2xl md:text-4xl font-normal mb-4 md:mb-6">
                  {step.title}
                </h3>
              </div>
              <p className="text-white/70 text-sm md:text-lg leading-relaxed font-medium">
                {step.description}
              </p>
            </div>
          ))}
          
          {/* Spacer at the end so the last card doesn't stick to the right edge */}
          <div className="w-[10vw] shrink-0" />
        </div>
      </div>

    </section>
  );
}

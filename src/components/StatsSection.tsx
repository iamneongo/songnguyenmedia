import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    target: 12,
    suffix: "+",
    label: "Năm kinh nghiệm",
    description: "Đủ để hiểu sâu sắc thị trường và xu hướng."
  },
  {
    target: 500,
    suffix: "+",
    label: "Dự án hoàn thành",
    description: "Những chiến dịch mang lại hiệu quả thực tế."
  },
  {
    target: 30,
    suffix: "+",
    label: "Giải thưởng",
    description: "Sự công nhận từ các tổ chức uy tín trong ngành."
  }
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Title fade in
    gsap.from(".stats-title", {
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

    // Fade in the whole stat blocks
    gsap.from(".stat-card", {
      scrollTrigger: {
        trigger: ".stats-grid",
        start: "top 85%",
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Animate numbers
    const numbers = gsap.utils.toArray<HTMLElement>('.stat-number');
    numbers.forEach((el) => {
      const target = parseFloat(el.dataset.target || "0");
      const counter = { val: 0 };

      gsap.to(counter, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: 'play none none reverse'
        },
        val: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          el.innerText = Math.ceil(counter.val).toString();
        }
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#F6E4CF] text-[#321C04] py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="stats-title mb-20 text-center md:text-left">
          <p className="text-[#D9C4AA] text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-[#321C04]/60">
            Dấu ấn
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.2]">
            Những con số <br className="hidden md:block" />
            <em className="not-italic" style={{ fontFamily: "'Caster', sans-serif", fontStyle: 'normal' }}>biết nói</em>
          </h2>
        </div>

        <div className="stats-grid grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {STATS.map((stat, index) => (
            <div key={index} className="stat-card flex flex-col border-t border-[#321C04]/10 pt-8">
              <div className="flex items-baseline mb-4 text-[#321C04]">
                <span 
                  className="stat-number text-6xl md:text-7xl lg:text-[100px] font-normal tracking-tighter"
                  data-target={stat.target}
                >
                  0
                </span>
                <span className="text-4xl md:text-5xl lg:text-[70px] font-normal ml-1 text-[#D9C4AA]">
                  {stat.suffix}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3">
                {stat.label}
              </h3>
              <p className="text-[#321C04]/70 font-medium">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

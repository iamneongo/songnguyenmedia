import { Quote } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    text: "Song Nguyễn Media không chỉ là một agency sản xuất, họ là những người nghệ sĩ thực thụ. Mọi khung hình đều chứa đựng linh hồn của thương hiệu và chạm đến cảm xúc người xem một cách tự nhiên nhất.",
    author: "Elena Tran",
    role: "Giám đốc Marketing, TechStart"
  },
  {
    text: "Làm việc với đội ngũ Song Nguyễn là một trải nghiệm tuyệt vời. Họ hiểu chính xác điều chúng tôi cần trước cả khi chúng tôi diễn đạt nó thành lời. Chiến dịch vừa qua đã vượt xa mọi KPI mong đợi.",
    author: "Hoàng Nguyễn",
    role: "Founder, The Coffee House"
  }
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Title fade in
    gsap.from('.testi-title', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out'
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#F6E4CF] py-24 md:py-32 px-6 relative z-10 border-t border-[#D9C4AA]/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center testi-title">
          <h2 className="text-[#321C04] text-3xl md:text-5xl font-normal leading-tight">
            Khách hàng nói gì về <em className="not-italic" style={{ fontFamily: "'Caster', sans-serif", fontStyle: 'normal' }}>chúng tôi</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 testi-grid">
          {TESTIMONIALS.map((testimonial, i) => (
            <div 
              key={i} 
              ref={el => { cardsRef.current[i] = el; }}
              className="flex flex-col gap-6"
            >
              <Quote className="text-[#D9C4AA] w-10 h-10" />
              <p className="text-[#321C04] text-lg md:text-xl leading-relaxed font-medium">
                "{testimonial.text}"
              </p>
              <div>
                <p className="text-[#321C04] font-semibold text-base">{testimonial.author}</p>
                <p className="text-[#321C04]/70 text-sm mt-1">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

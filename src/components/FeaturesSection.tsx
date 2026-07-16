import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LogoSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256" fill="none">
    <path d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z" fill="rgba(255,255,255,0.8)" />
  </svg>
);

const FEATURES = [
  {
    id: 'feature-1',
    title: "Phim Quảng Cáo Doanh Nghiệp",
    description: "Khắc họa chân dung doanh nghiệp thông qua những thước phim điện ảnh. Chúng tôi lột tả giá trị cốt lõi và tầm nhìn của bạn một cách sâu sắc nhất.",
    video: "/banner.mp4"
  },
  {
    id: 'feature-2',
    title: "Chiến Dịch Mạng Xã Hội",
    description: "Tạo ra những nội dung viral đầy sức hút, tối ưu hóa cho từng nền tảng, giúp thương hiệu tương tác mạnh mẽ với khán giả mục tiêu.",
    video: "/banner.mp4"
  },
  {
    id: 'feature-3',
    title: "Sản Xuất Music Video (MV)",
    description: "Kể câu chuyện âm nhạc bằng ngôn ngữ hình ảnh đột phá, màu sắc độc bản và kỹ xảo đỉnh cao, đem lại trải nghiệm thị giác ấn tượng.",
    video: "/banner.mp4"
  }
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(FEATURES[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Background parallax effect
    gsap.to('.features-bg', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      scale: 1.1,
      ease: 'none'
    });

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const featureId = FEATURES[index].id;

      // Animate card appearance
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Update active state based on scroll position
      ScrollTrigger.create({
        trigger: card,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveFeature(featureId),
        onEnterBack: () => setActiveFeature(featureId),
      });
    });

  }, { scope: sectionRef });

  const scrollToFeature = (id: string) => {
    // use lenis scroll if possible, otherwise fallback
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative px-5 md:px-10 lg:px-16 py-20 md:py-40 lg:py-48">
      {/* Parallax background image */}
      <div 
        className="features-bg fixed inset-0 w-full h-full object-cover -z-10 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260709_082449_46df5cc4-ad98-4541-9236-a2659c1478a4.png&w=1920&q=85)' }}
      />
      
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[400px_1fr] xl:grid-cols-[460px_1fr] gap-24 xl:gap-48 relative z-10">
        
        {/* Left Column */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-32 lg:gap-8">
          <div>
            <h2 className="text-white text-2xl sm:text-3xl lg:text-[46px] leading-[1.2] font-normal mb-12">
              Những tác phẩm mang đậm dấu ấn thị giác và cảm xúc
            </h2>
            
            <div className="hidden lg:flex flex-col gap-4">
              {FEATURES.map(feature => (
                <button
                  key={`nav-${feature.id}`}
                  onClick={() => scrollToFeature(feature.id)}
                  className={`text-left px-5 py-4 rounded-xl text-lg font-medium transition-all duration-300
                    ${activeFeature === feature.id 
                      ? 'bg-black/20 text-white shadow-sm' 
                      : 'bg-transparent text-white/40 hover:bg-black/10 hover:text-white/70'}`}
                >
                  {feature.title}
                </button>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block mt-8 lg:mt-auto">
            <p className="text-white/80 text-sm font-medium mb-6 max-w-sm">
              Khám phá cách chúng tôi biến ý tưởng thành những chiến dịch thành công.
            </p>
            <button className="bg-white text-black text-sm font-medium px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
              Bắt đầu dự án
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-24 lg:gap-48 pb-32 pt-20 lg:pt-32">
          {FEATURES.map((feature, index) => {
            return (
              <div 
                key={feature.id}
                id={feature.id}
                ref={el => { cardsRef.current[index] = el; }}
                className="bg-black/20 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/5"
              >
                <div className="mb-6">
                  <LogoSVG />
                </div>
                
                <h3 className="text-white text-xl md:text-2xl font-medium mb-6">
                  {feature.title}
                </h3>
                
                <div className="mb-6 rounded-2xl overflow-hidden bg-black/30 aspect-video">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover"
                    src={feature.video}
                  />
                </div>
                
                <p className="text-white/60 font-medium text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

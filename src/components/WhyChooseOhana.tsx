import { useEffect, useRef, useState } from 'react';
import { Shield, Sparkles, Smartphone, Grid3x3, Award } from 'lucide-react';

interface Card {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconPosition: 'top-left' | 'top-right' | 'bottom-right' | 'centered';
  gradient: string;
}

export default function WhyChooseOhana() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cards: Card[] = [
    {
      id: 'card-a',
      title: 'Premium Care at Honest, Fair Prices',
      description: 'We provide top-quality cleaning with transparent pricing and no hidden fees. Every item receives careful handling and consistent results — no shortcuts, ever.',
      icon: Shield,
      iconPosition: 'top-left',
      gradient: 'linear-gradient(135deg, rgba(27, 66, 89, 0.08), rgba(27, 66, 89, 0.15))'
    },
    {
      id: 'card-b',
      title: 'Professional Cleaning With Consistent Results',
      description: 'From stain inspection to final steam finishing, every step follows strict standards. Your clothes return fresher, brighter, and better preserved — every single time.',
      icon: Sparkles,
      iconPosition: 'top-right',
      gradient: 'linear-gradient(135deg, rgba(27, 147, 219, 0.12), rgba(27, 147, 219, 0.20))'
    },
    {
      id: 'card-c',
      title: 'Smart Memberships & Easy Digital Convenience',
      description: 'Enjoy simple booking via Messenger, WhatsApp, or Viber, with automatic updates and loyalty rewards that help you save more over time.',
      icon: Smartphone,
      iconPosition: 'top-left',
      gradient: 'linear-gradient(135deg, rgba(56, 140, 194, 0.10), rgba(56, 140, 194, 0.18))'
    },
    {
      id: 'card-d',
      title: 'Expanded Services Beyond Laundry',
      description: 'From steam press to deep cleaning, hotel care, and specialty fabric treatment — Ohana delivers more ways to keep your home and wardrobe looking their best.',
      icon: Grid3x3,
      iconPosition: 'top-left',
      gradient: 'linear-gradient(135deg, rgba(114, 188, 218, 0.12), rgba(114, 188, 218, 0.22))'
    },
    {
      id: 'card-e',
      title: '12 Years of Trusted Service in Nay Pyi Taw',
      description: 'A decade of proven reliability and customer trust, now elevated with a renewed Ohana identity. Local expertise, professional quality.',
      icon: Award,
      iconPosition: 'centered',
      gradient: 'linear-gradient(135deg, rgba(217, 217, 217, 0.35), rgba(245, 247, 249, 0.75))'
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.findIndex((ref) => ref === entry.target);
          if (index !== -1) {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 120);
          }
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((card) => {
      if (card) {
        cardObserver.observe(card);
      }
    });

    return () => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  const getIconPositionStyles = (position: string) => {
    switch (position) {
      case 'top-left':
        return { top: '48px', left: '48px' };
      case 'top-right':
        return { top: '48px', right: '48px' };
      case 'bottom-right':
        return { bottom: '48px', right: '48px' };
      case 'centered':
        return { top: '48px', left: '50%', transform: 'translateX(-50%)' };
      default:
        return { top: '48px', left: '48px' };
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ paddingTop: '140px', paddingBottom: '140px' }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1350px' }}>
        <div
          className="text-center mx-auto mb-20 transition-all duration-700"
          style={{
            maxWidth: '900px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#0A2540' }}>
            Why Choose Ohana
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed" style={{ color: '#435368' }}>
            Experience trusted care, advanced cleaning standards, and a service built to make everyday life easier.
          </p>
        </div>

        <div className="space-y-8 lg:space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <div
              ref={(el) => (cardRefs.current[0] = el)}
              className="lg:col-span-2 relative group cursor-pointer"
              style={{
                background: cards[0].gradient,
                borderRadius: '30px',
                padding: '48px',
                boxShadow: '0px 28px 60px rgba(0,0,0,0.08)',
                opacity: visibleCards[0] ? 1 : 0,
                transform: visibleCards[0] ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
                transition: 'all 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              <div
                className="absolute flex items-center justify-center"
                style={{
                  ...getIconPositionStyles(cards[0].iconPosition),
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)'
                }}
              >
                {(() => {
                  const IconComponent = cards[0].icon;
                  return <IconComponent className="w-8 h-8" style={{ color: '#0A2540', strokeWidth: 2 }} />;
                })()}
              </div>
              <div style={{ paddingTop: '80px' }}>
                <h3 className="text-2xl sm:text-3xl font-semibold mb-5" style={{ color: '#0A2540' }}>
                  {cards[0].title}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#435368' }}>
                  {cards[0].description}
                </p>
              </div>
            </div>

            <div
              ref={(el) => (cardRefs.current[1] = el)}
              className="lg:col-span-1 relative group cursor-pointer"
              style={{
                background: cards[1].gradient,
                borderRadius: '30px',
                padding: '48px',
                boxShadow: '0px 28px 60px rgba(0,0,0,0.08)',
                minHeight: '400px',
                opacity: visibleCards[1] ? 1 : 0,
                transform: visibleCards[1] ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
                transition: 'all 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              <div
                className="absolute flex items-center justify-center"
                style={{
                  ...getIconPositionStyles(cards[1].iconPosition),
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)'
                }}
              >
                {(() => {
                  const IconComponent = cards[1].icon;
                  return <IconComponent className="w-8 h-8" style={{ color: '#0A2540', strokeWidth: 2 }} />;
                })()}
              </div>
              <div style={{ paddingTop: '80px' }}>
                <h3 className="text-2xl sm:text-3xl font-semibold mb-5" style={{ color: '#0A2540' }}>
                  {cards[1].title}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#435368' }}>
                  {cards[1].description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <div
              ref={(el) => (cardRefs.current[2] = el)}
              className="lg:col-span-1 relative group cursor-pointer"
              style={{
                background: cards[2].gradient,
                borderRadius: '30px',
                padding: '48px',
                boxShadow: '0px 28px 60px rgba(0,0,0,0.08)',
                opacity: visibleCards[2] ? 1 : 0,
                transform: visibleCards[2] ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
                transition: 'all 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              <div
                className="absolute flex items-center justify-center"
                style={{
                  ...getIconPositionStyles(cards[2].iconPosition),
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)'
                }}
              >
                {(() => {
                  const IconComponent = cards[2].icon;
                  return <IconComponent className="w-8 h-8" style={{ color: '#0A2540', strokeWidth: 2 }} />;
                })()}
              </div>
              <div style={{ paddingTop: '80px' }}>
                <h3 className="text-2xl sm:text-3xl font-semibold mb-5" style={{ color: '#0A2540' }}>
                  {cards[2].title}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#435368' }}>
                  {cards[2].description}
                </p>
              </div>
            </div>

            <div
              ref={(el) => (cardRefs.current[3] = el)}
              className="lg:col-span-2 relative group cursor-pointer"
              style={{
                background: cards[3].gradient,
                borderRadius: '30px',
                padding: '48px',
                boxShadow: '0px 28px 60px rgba(0,0,0,0.08)',
                opacity: visibleCards[3] ? 1 : 0,
                transform: visibleCards[3] ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
                transition: 'all 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              <div
                className="absolute flex items-center justify-center"
                style={{
                  ...getIconPositionStyles(cards[3].iconPosition),
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)'
                }}
              >
                {(() => {
                  const IconComponent = cards[3].icon;
                  return <IconComponent className="w-8 h-8" style={{ color: '#0A2540', strokeWidth: 2 }} />;
                })()}
              </div>
              <div style={{ paddingTop: '80px' }}>
                <h3 className="text-2xl sm:text-3xl font-semibold mb-5" style={{ color: '#0A2540' }}>
                  {cards[3].title}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#435368' }}>
                  {cards[3].description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1">
            <div
              ref={(el) => (cardRefs.current[4] = el)}
              className="relative group cursor-pointer"
              style={{
                background: cards[4].gradient,
                borderRadius: '30px',
                padding: '48px 48px 64px 48px',
                boxShadow: '0px 28px 60px rgba(0,0,0,0.08)',
                opacity: visibleCards[4] ? 1 : 0,
                transform: visibleCards[4] ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
                transition: 'all 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              <div
                className="absolute flex items-center justify-center"
                style={{
                  ...getIconPositionStyles(cards[4].iconPosition),
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)'
                }}
              >
                {(() => {
                  const IconComponent = cards[4].icon;
                  return <IconComponent className="w-8 h-8" style={{ color: '#0A2540', strokeWidth: 2 }} />;
                })()}
              </div>
              <div style={{ paddingTop: '80px' }} className="text-center max-w-3xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-5" style={{ color: '#0A2540' }}>
                  {cards[4].title}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#435368' }}>
                  {cards[4].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .group:hover {
          transform: translateY(-8px) scale(1.01) !important;
          box-shadow: 0px 38px 72px rgba(0,0,0,0.10) !important;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
      `}</style>
    </section>
  );
}

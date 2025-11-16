import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShoppingBag, Shirt, Home, Wand2 } from 'lucide-react';

interface ServiceFeature {
  title: string;
  description: string;
}

interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  serviceName: string;
  shortDescription: string;
  learnMoreLabel: string;
  learnMorePath: string;
  additionalLearnMore?: { label: string; path: string };
  imageUrl: string;
  features: ServiceFeature[];
}

export default function KeyServicesPreview() {
  const [activeService, setActiveService] = useState(0);
  const [displayedService, setDisplayedService] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isExitingSection, setIsExitingSection] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const servicesData: Service[] = [
    {
      id: 'everyday-care',
      icon: ShoppingBag,
      serviceName: 'Everyday Care',
      shortDescription: 'Wash & Fold, steam press, and flexible turnaround options for busy routines.',
      learnMoreLabel: 'Learn more about Everyday Care',
      learnMorePath: '/services/everyday-care',
      imageUrl: '/Gemini_Generated_Image_aium04aium04aium.png',
      features: [
        {
          title: 'Effortless laundry care',
          description: 'Busy-day friendly wash & fold with calibrated cleaning for everyday garments.'
        },
        {
          title: 'Steam Press / Iron-Only',
          description: 'Crisp finishing for shirts, uniforms, and delicate pieces.'
        },
        {
          title: 'Express & Urgent options',
          description: 'Fast turnarounds when timing matters most.'
        }
      ]
    },
    {
      id: 'delicates-dry-clean',
      icon: Shirt,
      serviceName: 'Delicates & Dry Clean',
      shortDescription: 'Suits, dresses, silk, and traditional wear cleaned with expert stain care and finishing.',
      learnMoreLabel: 'Learn more about Delicates & Dry Clean',
      learnMorePath: '/services/delicates-dry-clean',
      imageUrl: '/dry cleaning machine 3_icon copy.png',
      features: [
        {
          title: 'Special fabric handling',
          description: 'Specialized attention, upholding the integrity of precious materials.'
        },
        {
          title: 'Stain removal & spot treatment',
          description: 'Expert treatment tailored to fabric type.'
        },
        {
          title: 'Suits and formal garments',
          description: 'Solvent-based precision, gentle preservation of structure and drape.'
        }
      ]
    },
    {
      id: 'home-care',
      icon: Home,
      serviceName: 'Home Care',
      shortDescription: 'Curtains, carpets, rugs, and home fabrics — refreshed and renewed.',
      learnMoreLabel: 'Learn more about Home Care',
      learnMorePath: '/services/home-care',
      imageUrl: 'https://images.pexels.com/photos/6782437/pexels-photo-6782437.jpeg?auto=compress&cs=tinysrgb&w=1200',
      features: [
        {
          title: 'Curtains & blinds',
          description: 'Deep cleaning for dust, odor, and allergens.'
        },
        {
          title: 'Carpets & rugs',
          description: 'High-performance cleaning for durability and hygiene.'
        },
        {
          title: 'Sofa covers & bedding',
          description: 'Comforters, duvets, pillows, and other bulky items.'
        }
      ]
    },
    {
      id: 'specialty-services',
      icon: Wand2,
      serviceName: 'Specialty & Add-on Services',
      shortDescription: 'Premium, focused services for all kinds of garments and fabrics.',
      learnMoreLabel: 'Learn more about Specialty Services',
      learnMorePath: '/services/specialty-services',
      additionalLearnMore: {
        label: 'Learn more about Add-on Services',
        path: '/services/add-on-services'
      },
      imageUrl: 'https://images.pexels.com/photos/4792065/pexels-photo-4792065.jpeg?auto=compress&cs=tinysrgb&w=1200',
      features: [
        {
          title: 'Handwash',
          description: 'Gentle processing for the most delicate pieces.'
        },
        {
          title: 'Shoes and bags cleaning',
          description: 'Expert detailing, extending the lifespan of your treasured items.'
        },
        {
          title: 'Pickup & delivery',
          description: 'Seamless logistics: premium care without leaving your home.'
        }
      ]
    }
  ];

  useEffect(() => {
    const handleSectionExit = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionBottom = section.offsetTop + section.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;

      if (scrollPosition > sectionBottom) {
        setIsExitingSection(true);
      } else {
        setIsExitingSection(false);
      }
    };

    window.addEventListener('scroll', handleSectionExit, { passive: true });
    handleSectionExit();

    return () => window.removeEventListener('scroll', handleSectionExit);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let maxRatio = 0;
      let mostVisibleIndex = -1;

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;

        const entry = entries.find(e => e.target === panel);
        if (entry && entry.isIntersecting) {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleIndex = index;
          }
        } else {
          const rect = panel.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
          const ratio = Math.max(0, visibleHeight) / rect.height;

          if (ratio > maxRatio && ratio > 0.4) {
            maxRatio = ratio;
            mostVisibleIndex = index;
          }
        }
      });

      if (mostVisibleIndex !== -1 && mostVisibleIndex !== activeService) {
        setActiveService(mostVisibleIndex);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    panelRefs.current.forEach((panel) => {
      if (panel) {
        observer.observe(panel);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeService]);

  useEffect(() => {
    if (activeService !== displayedService) {
      setIsTransitioning(true);

      const fadeOutTimer = setTimeout(() => {
        setDisplayedService(activeService);

        const fadeInTimer = setTimeout(() => {
          setIsTransitioning(false);
        }, 50);

        return () => clearTimeout(fadeInTimer);
      }, 250);

      return () => clearTimeout(fadeOutTimer);
    }
  }, [activeService, displayedService]);

  const currentService = servicesData[displayedService];

  return (
    <section
      ref={sectionRef}
      className="relative"
    >
      <div>
        <div className="text-center pb-12 max-w-4xl mx-auto">
          <span className="inline-block text-4xl uppercase tracking-wider font-medium text-ohana-mid-blue mb-4">
            OUR SERVICES
          </span>
          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-ohana-deep-blue mb-6">
            Care for every part of your life.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            From everyday wear to special pieces and home fabrics, Ohana keeps everything fresh, pressed, and ready to use.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          <div className="hidden lg:block">
            <div className="sticky top-24 self-start py-20">
              <div
                className="space-y-8 w-full transition-all duration-250 ease-in-out"
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)'
                }}
              >
                <div className="mb-4">
                  <currentService.icon className="w-16 h-16 text-ohana-mid-blue" strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="text-4xl sm:text-5xl font-bold text-ohana-deep-blue mb-4">
                    {currentService.serviceName}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-lg mb-6">
                    {currentService.shortDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    to={currentService.learnMorePath}
                    className="inline-flex items-center text-ohana-mid-blue text-lg font-medium hover:text-ohana-soft-blue transition-colors duration-200 group"
                  >
                    {currentService.learnMoreLabel}
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  {currentService.additionalLearnMore && (
                    <Link
                      to={currentService.additionalLearnMore.path}
                      className="inline-flex items-center text-ohana-mid-blue text-lg font-medium hover:text-ohana-soft-blue transition-colors duration-200 group block"
                    >
                      {currentService.additionalLearnMore.label}
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-0 lg:col-start-2">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (panelRefs.current[index] = el)}
                className="min-h-screen flex items-center py-20 lg:py-24"
              >
                <div className="w-full">
                  <div className="lg:hidden mb-8">
                    <div className="mb-4">
                      <service.icon className="w-12 h-12 text-ohana-mid-blue" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-3xl font-bold text-ohana-deep-blue mb-3">
                      {service.serviceName}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>
                    <Link
                      to={service.learnMorePath}
                      className="inline-flex items-center text-ohana-mid-blue font-medium hover:text-ohana-soft-blue transition-colors duration-200 group"
                    >
                      {service.learnMoreLabel}
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8">
                    <img
                      src={service.imageUrl}
                      alt={service.serviceName}
                      className="w-full h-[400px] lg:h-[500px] object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <h4 className="text-base font-semibold text-ohana-deep-blue mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {index === servicesData.length - 1 && (
                    <div className="mt-12 text-center">
                      <Link
                        to="/services"
                        className="inline-flex items-center text-ohana-mid-blue text-lg font-medium hover:text-ohana-soft-blue transition-colors duration-200 group"
                      >
                        View all services
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-8 left-8 z-50 transition-all duration-500 ${
          isExitingSection ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="bg-gradient-to-r from-ohana-mid-blue to-ohana-soft-blue text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 cursor-pointer group animate-bounce-slow">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="font-bold text-sm">Get 50% Off First Order</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

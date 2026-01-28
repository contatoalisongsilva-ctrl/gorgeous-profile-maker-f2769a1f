import { Check } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

import problemRugasTesta from "@/assets/problem-rugas-testa.jpg";
import problemFlacidez from "@/assets/problem-flacidez.jpg";
import problemPeGalinha from "@/assets/problem-pe-galinha.jpg";
import problemAspectoCansado from "@/assets/problem-aspecto-cansado.jpg";

const ProblemSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const problems = [
    {
      id: "rugas",
      title: "Rugas na testa",
      image: problemRugasTesta,
    },
    {
      id: "flacidez",
      title: "Flacidez no rosto",
      image: problemFlacidez,
    },
    {
      id: "pe-galinha",
      title: "Pé de galinha",
      image: problemPeGalinha,
    },
    {
      id: "aspecto",
      title: "Aspecto cansado",
      image: problemAspectoCansado,
    },
  ];

  const scrollTo = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const slideWidth = container.scrollWidth / problems.length;
    container.scrollTo({ left: slideWidth * index, behavior: "smooth" });
  }, [problems.length]);

  // Handle scroll to update selected index
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const slideWidth = container.scrollWidth / problems.length;
    const newIndex = Math.round(container.scrollLeft / slideWidth);
    if (newIndex !== selectedIndex && newIndex >= 0 && newIndex < problems.length) {
      setSelectedIndex(newIndex);
    }
  }, [problems.length, selectedIndex]);

  // Autoplay with loop
  useEffect(() => {
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        setSelectedIndex((prev) => {
          const next = (prev + 1) % problems.length;
          scrollTo(next);
          return next;
        });
      }, 3500);
    };

    startAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [problems.length, scrollTo]);

  // Pause autoplay on interaction
  const handleInteraction = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    // Resume after 5 seconds
    autoplayRef.current = setTimeout(() => {
      autoplayRef.current = setInterval(() => {
        setSelectedIndex((prev) => {
          const next = (prev + 1) % problems.length;
          scrollTo(next);
          return next;
        });
      }, 3500);
    }, 5000) as unknown as NodeJS.Timeout;
  };

  return (
    <section className="py-10 md:py-12 bg-secondary" id="problema">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
              Entenda se é o seu caso
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Porque você precisa de colágeno
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Com o passar do tempo, o corpo reduz a produção natural de colágeno. E com isso, causa:
            </p>
          </div>

          {/* Native Scroll-Snap Carousel */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            onTouchStart={handleInteraction}
            onMouseDown={handleInteraction}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {problems.map((problem, index) => (
              <div
                key={problem.id}
                className="flex-shrink-0 w-[85%] md:w-[60%] snap-center"
              >
                <div className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                  selectedIndex === index ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                }`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={problem.image}
                      alt={problem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-[#0d0d0d]">
                    <h3 className="font-semibold text-base md:text-lg text-white text-center tracking-tight">
                      {problem.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {problems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  handleInteraction();
                  scrollTo(index);
                  setSelectedIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? 'bg-primary w-8'
                    : 'bg-primary/30 w-2'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium text-sm">
              O <span className="text-primary font-bold">Colágeno Renova Be</span> foi feito para você!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

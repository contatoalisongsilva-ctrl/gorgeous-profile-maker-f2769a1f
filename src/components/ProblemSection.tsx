import { Check } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import problemRugasTesta from "@/assets/problem-rugas-testa.png";
import problemFlacidez from "@/assets/problem-flacidez.png";
import problemPeGalinha from "@/assets/problem-pe-galinha.png";
import problemAspectoCansado from "@/assets/problem-aspecto-cansado.png";

const ProblemSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

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

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

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

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {problems.map((problem, index) => (
                <div
                  key={problem.id}
                  className="flex-[0_0_85%] md:flex-[0_0_60%] min-w-0 px-2"
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
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {problems.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
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

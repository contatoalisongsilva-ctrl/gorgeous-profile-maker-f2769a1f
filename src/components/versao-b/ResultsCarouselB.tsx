import { useState, useEffect, useRef } from "react";
import skinBefore1 from "@/assets/skin-result-before-1.jpg";
import skinAfter1 from "@/assets/skin-result-after-1.jpg";
import skinBefore2 from "@/assets/skin-result-before-2.jpg";
import skinAfter2 from "@/assets/skin-result-after-2.jpg";

const results = [
  {
    id: 1,
    tag: "Pele Madura +50",
    description: "Rugas profundas ao redor dos olhos",
    beforeImage: skinBefore1,
    afterImage: skinAfter1,
    beforeLabel: "Semana 1",
    afterLabel: "Semana 4",
    benefit: "Rugas suavizadas",
  },
  {
    id: 2,
    tag: "Pele +45",
    description: "Linhas de expressão e flacidez",
    beforeImage: skinBefore2,
    afterImage: skinAfter2,
    beforeLabel: "Semana 2",
    afterLabel: "Semana 8",
    benefit: "Pele rejuvenescida",
  },
];

const ResultsCarouselB = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % results.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to current index
  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = currentIndex * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <section className="py-10 md:py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-3">
            Resultados Reais
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
            Veja a transformação
          </h2>
          <p className="text-sm text-muted-foreground">
            Resultados comprovados em diferentes tipos de pele
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-sm mx-auto">
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth"
          >
            {results.map((result) => (
              <div
                key={result.id}
                className="w-full flex-shrink-0 snap-center px-2"
              >
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  {/* Tag */}
                  <div className="text-center mb-3">
                    <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-xs font-semibold">
                      {result.tag}
                    </span>
                    <p className="text-xs text-muted-foreground mt-2">
                      {result.description}
                    </p>
                  </div>

                  {/* Before/After Images Side by Side */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Before */}
                    <div className="relative">
                      <div className="rounded-xl overflow-hidden aspect-[3/4]">
                        <img
                          src={result.beforeImage}
                          alt="Antes"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/90 text-center py-2 rounded-b-xl">
                        <p className="text-xs font-semibold text-white">{result.beforeLabel}</p>
                      </div>
                    </div>

                    {/* After */}
                    <div className="relative">
                      <div className="rounded-xl overflow-hidden aspect-[3/4] ring-2 ring-primary">
                        <img
                          src={result.afterImage}
                          alt="Depois"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-primary text-center py-2 rounded-b-xl">
                        <p className="text-xs font-semibold text-white">{result.afterLabel}</p>
                        <p className="text-[10px] text-white">{result.benefit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {results.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-primary w-4"
                    : "bg-primary/30"
                }`}
                aria-label={`Ir para resultado ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsCarouselB;

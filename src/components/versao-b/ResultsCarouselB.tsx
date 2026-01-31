import { useState, useEffect, useRef } from "react";
import reviewBeforeAfter1 from "@/assets/review-before-after-1.png";
import reviewBeforeAfter2 from "@/assets/review-before-after-2.png";
import reviewBeforeAfter3 from "@/assets/review-before-after-3.png";
import reviewBeforeAfter4 from "@/assets/review-before-after-4.png";

const results = [
  {
    id: 1,
    tag: "Pele Madura +45",
    description: "Resultados em pele com sinais avançados de envelhecimento",
    image: reviewBeforeAfter1,
    weeksAfter: "4 semanas",
    benefit: "Rugas suavizadas",
  },
  {
    id: 2,
    tag: "Pele +35",
    description: "Resultados em pele com primeiros sinais de envelhecimento",
    image: reviewBeforeAfter2,
    weeksAfter: "8 semanas",
    benefit: "Pele rejuvenescida",
  },
  {
    id: 3,
    tag: "Pele +40",
    description: "Resultados em pele com linhas de expressão",
    image: reviewBeforeAfter3,
    weeksAfter: "6 semanas",
    benefit: "Mais firmeza",
  },
  {
    id: 4,
    tag: "Pele +50",
    description: "Resultados em pele madura",
    image: reviewBeforeAfter4,
    weeksAfter: "8 semanas",
    benefit: "Pele revitalizada",
  },
];

const ResultsCarouselB = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % results.length);
    }, 3000);

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

                  {/* Before/After Image */}
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={result.image}
                      alt={`Resultado ${result.tag}`}
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Result info */}
                  <div className="mt-3 text-center">
                    <p className="text-primary font-bold text-lg">
                      {result.weeksAfter}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {result.benefit}
                    </p>
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

import { useEffect, useState } from "react";
import resultadoSemana1 from "@/assets/resultado-semana-1.jpg";
import resultadoSemana2 from "@/assets/resultado-semana-2.jpg";
import resultadoSemana4 from "@/assets/resultado-semana-4.jpg";
import resultadoSemana8 from "@/assets/resultado-semana-8.jpg";

const ResultsSection = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("resultados");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setTimeout(() => setProgress(0), 2000);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isVisible]);

  const comparisons = [
    {
      label: "Pele Madura +45",
      description: "Resultados em pele com sinais avançados de envelhecimento",
      before: {
        week: "1 semana",
        image: resultadoSemana1,
      },
      after: {
        week: "4 semanas",
        image: resultadoSemana4,
        highlight: "Rugas suavizadas"
      }
    },
    {
      label: "Pele +35",
      description: "Resultados em pele com primeiros sinais de envelhecimento",
      before: {
        week: "1 semana",
        image: resultadoSemana2,
      },
      after: {
        week: "8 semanas",
        image: resultadoSemana8,
        highlight: "Pele rejuvenescida"
      }
    }
  ];

  return (
    <section className="py-10 md:py-12 bg-white" id="resultados">
      <div className="container mx-auto px-4">
        {/* Timeline Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            Resultados Comprovados
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Antes e depois reais
          </h2>
        </div>

        {/* Comparison Groups */}
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {comparisons.map((comparison) => (
            <div key={comparison.label} className="bg-gradient-to-br from-secondary/50 to-secondary/20 rounded-3xl p-5 md:p-6 border border-border shadow-sm">
              {/* Group Header */}
              <div className="text-center mb-5">
                <span className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-wider">
                  {comparison.label}
                </span>
                <p className="text-xs text-muted-foreground mt-2">{comparison.description}</p>
              </div>

              {/* Before / After Cards */}
              <div className="grid grid-cols-2 gap-3 md:gap-5 items-center">
                {/* Before */}
                <div className="relative group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-border/50">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img 
                        src={comparison.before.image} 
                        alt={`Antes - ${comparison.before.week}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 bg-[#1a1a1a] text-center">
                      <span className="text-[10px] text-white/50 uppercase tracking-wider">Antes</span>
                      <h3 className="font-semibold text-sm text-white tracking-tight">{comparison.before.week}</h3>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="relative group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-primary ring-4 ring-primary/10">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img 
                        src={comparison.after.image} 
                        alt={`Depois - ${comparison.after.week}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 bg-gradient-to-r from-primary to-primary/80 text-center">
                      <span className="text-[10px] text-white/80 uppercase tracking-wider">Depois</span>
                      <h3 className="font-semibold text-sm text-white tracking-tight">{comparison.after.week}</h3>
                      <p className="text-[10px] text-white/90 mt-0.5">{comparison.after.highlight}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Evolution Indicator */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="bg-secondary/50 rounded-2xl p-6 border border-border">
            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-sm font-semibold text-foreground">Evolução contínua</span>
            </div>

            {/* Progress Bar with Icons */}
            <div className="relative">
              {/* Left Icon - Wrinkled */}
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border-2 border-muted-foreground/20">
                  <svg className="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 8c2-2 6-2 8 0s6 2 8 0" />
                    <path d="M4 14c2-2 6-2 8 0s6 2 8 0" />
                    <path d="M4 20c2-2 6-2 8 0s6 2 8 0" />
                  </svg>
                </div>
              </div>

              {/* Right Icon - Smooth */}
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mx-12 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-muted-foreground/30 via-primary/70 to-primary rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Labels Below */}
            <div className="flex justify-between mt-4 mx-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground font-medium">Menos colágeno</p>
                <p className="text-[10px] text-muted-foreground/60">Mais rugas</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-primary font-semibold">Mais colágeno</p>
                <p className="text-[10px] text-primary/70">Menos rugas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;

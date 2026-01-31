import { Check, Sparkles } from "lucide-react";

const timeline = [
  {
    period: "Primeiras 2 semanas",
    description: "Pele mais hidratada, linhas finas menos visíveis, primeiro sinal de preenchimento.",
    icon: "💧",
  },
  {
    period: "De 4 a 6 semanas",
    description: "Redução visível das rugas ao redor dos olhos e boca. Rosto com aspecto mais descansado e luminoso.",
    icon: "✨",
  },
  {
    period: "De 60 a 90 dias",
    description: "Resultado máximo com uso contínuo.",
    icon: "🌟",
    results: [
      "Rugas significativamente reduzidas",
      "Rosto com mais volume e sustentação",
      "Contorno facial mais definido",
      "Pele firme, luminosa e com viço",
      "Autoestima renovada",
    ],
  },
];

const BenefitsSectionB = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
              Resultados Progressivos
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              A transformação nas suas rugas
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-primary/20 hidden md:block" />
            
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className="relative bg-white rounded-xl p-5 border border-border shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-2xl">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">
                        {item.period}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {item.description}
                      </p>
                      
                      {item.results && (
                        <ul className="space-y-2">
                          {item.results.map((result, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-sm text-foreground">{result}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emotional Quote */}
          <div className="mt-10 text-center bg-primary/5 rounded-xl p-6 border border-primary/10">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-lg md:text-xl font-semibold text-foreground italic">
              "Volte a se olhar no espelho e reconhecer o rosto que conhecia."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSectionB;

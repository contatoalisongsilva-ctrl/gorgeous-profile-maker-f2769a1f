import { Check, Clock, Zap, TrendingUp, Trophy, Lightbulb } from "lucide-react";
import { LucideIcon } from "lucide-react";

const timeline: { 
  label: string;
  period: string; 
  title: string;
  results: string[]; 
  Icon: LucideIcon;
  isLast?: boolean;
}[] = [
  {
    label: "SEMANA 1 E 2",
    period: "Primeiras 2 semanas",
    title: "Início da transformação",
    results: [
      "Pele mais hidratada",
      "Linhas finas menos visíveis",
      "Primeiro sinal de preenchimento",
    ],
    Icon: Clock,
  },
  {
    label: "SEMANA 3 E 4",
    period: "De 4 a 6 semanas",
    title: "Resultados visíveis",
    results: [
      "Redução visível das rugas ao redor dos olhos",
      "Rugas da boca menos aparentes",
      "Rosto com aspecto mais descansado",
    ],
    Icon: Zap,
  },
  {
    label: "MÊS 2",
    period: "60 dias",
    title: "Regeneração ativa",
    results: [
      "Rugas significativamente reduzidas",
      "Rosto com mais volume e sustentação",
      "Contorno facial mais definido",
    ],
    Icon: TrendingUp,
  },
  {
    label: "MÊS 3",
    period: "90 dias",
    title: "Resultado máximo",
    results: [
      "Pele firme, luminosa e com viço",
      "Autoestima renovada",
      "Confiança para se olhar no espelho",
    ],
    Icon: Trophy,
    isLast: true,
  },
];

const BenefitsSectionB = () => {
  return (
    <section className="py-8 md:py-12 bg-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-semibold uppercase tracking-wider mb-2">
              O Que Esperar
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Cronograma de Resultados
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm">
              Cada corpo responde de forma única, mas milhares de clientes relatam melhorias significativas.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative pl-12 md:pl-14">
            {/* Vertical line */}
            <div className="absolute left-[16px] md:left-[18px] top-4 bottom-4 w-0.5 bg-primary/30 rounded-full" />
            
            <div className="space-y-3">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  {/* Icon circle */}
                  <div className="absolute -left-12 md:-left-14 w-8 h-8 rounded-full flex items-center justify-center z-10 bg-white shadow-sm">
                    <item.Icon className="w-4 h-4 text-primary" />
                  </div>
                  
                  {/* Card */}
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-primary">
                        {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground">—</span>
                      <h3 className="font-semibold text-foreground text-sm">
                        {item.title}
                      </h3>
                    </div>
                    <ul className="space-y-0.5">
                      {item.results.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0 bg-primary" />
                          <span className="text-xs text-muted-foreground">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip Box */}
          <div className="mt-6 bg-primary/20 rounded-xl p-4 text-center border border-primary/30">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="font-semibold text-primary text-sm">Dica Importante</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Para melhores resultados, mantenha o uso contínuo por pelo menos <strong className="text-foreground">90 dias</strong>. 
              É o tempo que seu corpo precisa para regenerar o colágeno.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSectionB;

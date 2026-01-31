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
    <section className="py-12 md:py-16 bg-[#1e3a5f]">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-5 py-2 bg-[#8b4513] text-white rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
              O Que Esperar
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Cronograma de Resultados
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              Cada corpo responde de forma única, mas milhares de clientes relatam melhorias significativas seguindo este cronograma.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative pl-16 md:pl-20">
            {/* Vertical line */}
            <div className="absolute left-[22px] md:left-[26px] top-6 bottom-6 w-1 bg-gradient-to-b from-[#c4a052] via-[#7cb342] to-[#7cb342] rounded-full" />
            
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  {/* Icon circle */}
                  <div 
                    className={`absolute -left-16 md:-left-20 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center z-10 ${
                      item.isLast 
                        ? 'bg-[#7cb342]' 
                        : 'bg-[#c4a052]'
                    }`}
                  >
                    <item.Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  
                  {/* Card */}
                  <div className="bg-white rounded-xl p-5 shadow-lg">
                    <span className={`text-xs font-bold uppercase tracking-wide ${
                      item.isLast ? 'text-[#7cb342]' : 'text-[#c4a052]'
                    }`}>
                      {item.label}
                    </span>
                    <h3 className="font-bold text-foreground text-lg mt-1 mb-3">
                      {item.title}
                    </h3>
                    <ul className="space-y-2">
                      {item.results.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                            item.isLast ? 'bg-[#7cb342]' : 'bg-[#c4a052]'
                          }`} />
                          <span className="text-sm text-muted-foreground">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip Box */}
          <div className="mt-10 bg-[#f5e6b3] rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-[#c4a052]" />
              <span className="font-bold text-[#c4a052] text-lg">Dica Importante</span>
            </div>
            <p className="text-[#5a4a2a] text-sm leading-relaxed">
              Para melhores resultados, mantenha o uso contínuo por pelo menos <strong>90 dias</strong>. 
              É o tempo que seu corpo precisa para regenerar o colágeno e você sentir a transformação completa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSectionB;

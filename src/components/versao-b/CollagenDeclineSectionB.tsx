import { Eye, Circle, Smile, User, AlertTriangle } from "lucide-react";
import collagenChart from "@/assets/collagen-chart.jpg";

const affectedAreas = [
  { Icon: Eye, text: "Ao redor dos olhos (pés de galinha)" },
  { Icon: Circle, text: "Linhas de expressão na boca" },
  { Icon: Smile, text: "Bigode chinês" },
  { Icon: User, text: "Pescoço e região do queixo" },
];

const CollagenDeclineSectionB = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">
            Por que depois dos 35 tudo parece "despencar"?
          </h2>
          
          <div className="space-y-4 text-muted-foreground mb-8">
            <p className="text-sm md:text-base leading-relaxed">
              Pense no colágeno como a <strong className="text-foreground">estrutura de sustentação da sua pele</strong> — como uma teia de fibras invisíveis que mantém tudo no lugar.
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              Depois dos 35, seu corpo passa a produzir menos colágeno todo mês. É como se a "bateria" dessa estrutura fosse descarregada devagar, sem você perceber.
            </p>
          </div>

          {/* Chart */}
          <div className="bg-secondary/30 rounded-2xl p-4 mb-8">
            <img 
              src={collagenChart} 
              alt="Gráfico mostrando declínio do colágeno após os 35 anos"
              className="w-full rounded-xl"
              loading="lazy"
            />
          </div>

          <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
            O resultado? Sem essa sustentação, a pele começa a cair. Surgem rugas, linhas e flacidez — especialmente nas áreas mais expostas:
          </p>

          {/* Affected Areas */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {affectedAreas.map((area, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-secondary/50 rounded-xl p-4"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <area.Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-foreground">{area.text}</span>
              </div>
            ))}
          </div>

          {/* Warning Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-sm md:text-base text-amber-900 leading-relaxed flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                E a parte mais difícil: <strong>a cada dia que passa, mais colágeno é perdido</strong>. Creme hidratante não repõe o que está faltando por dentro.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollagenDeclineSectionB;

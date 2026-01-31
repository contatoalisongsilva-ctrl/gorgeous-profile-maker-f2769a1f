import { useState } from "react";
import { ChevronRight } from "lucide-react";

// Placeholder images - you can replace these with actual problem images
import problemRugasTesta from "@/assets/problem-rugas-testa.jpg";
import problemFlacidez from "@/assets/problem-flacidez.jpg";
import problemPeGalinha from "@/assets/problem-pe-galinha.jpg";
import problemAspectoCansado from "@/assets/problem-aspecto-cansado.jpg";

import problemCansadoNew from "@/assets/problem-cansado-new.jpg";

const problems = [
  {
    text: "Rugas ao redor dos olhos que dependem a cada dia?",
    image: problemPeGalinha,
  },
  {
    text: "Linhas na boca que parecem mais marcadas nas fotos?",
    image: problemAspectoCansado,
  },
  {
    text: "Rosto com aspecto de \"cansado\" mesmo depois de dormir bem?",
    image: problemCansadoNew,
  },
  {
    text: "Pescoço com perda de firmeza e flacidez?",
    image: problemFlacidez,
  },
];

const ProblemSectionB = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setCheckedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const hasChecked = checkedItems.length > 0;

  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">
            Você nota algum desses sinais hoje?
          </h2>
          <p className="text-muted-foreground text-center mb-8 text-sm">
            Toque nos itens que você se identifica
          </p>

          <div className="space-y-3 mb-8">
            {problems.map((problem, index) => (
              <button
                key={index}
                onClick={() => toggleItem(index)}
                className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all text-left ${
                  checkedItems.includes(index)
                    ? "border-primary bg-primary/5"
                    : "border-border bg-white"
                }`}
              >
                {/* Image box */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  <img 
                    src={problem.image} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Text */}
                <span className={`text-sm md:text-base leading-relaxed flex-1 ${
                  checkedItems.includes(index) ? "text-foreground font-medium" : "text-muted-foreground"
                }`}>
                  {problem.text}
                </span>
              </button>
            ))}
          </div>

          {hasChecked && (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 animate-fade-in">
              <p className="text-foreground font-semibold mb-2 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-primary" />
                Se você marcou pelo menos um — seu corpo está mandando um sinal claro.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                E a verdade que ninguém conta: <strong>creme nenhum resolve isso de verdade</strong>, porque o problema não está na superfície da pele. Ele começa por dentro.
              </p>
            </div>
          )}

          {!hasChecked && (
            <p className="text-center text-muted-foreground text-sm">
              Selecione os sinais que você percebe no seu dia a dia
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProblemSectionB;

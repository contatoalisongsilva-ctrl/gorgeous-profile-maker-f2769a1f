import { useState } from "react";
import { ChevronRight } from "lucide-react";

const problems = [
  "Rugas ao redor dos olhos que dependem a cada dia?",
  "Linhas na boca que parecem mais marcadas nas fotos?",
  "Rosto com aspecto de \"cansado\" mesmo depois de dormir bem?",
  "Pescoço com perda de firmeza e flacidez?",
  "Sensação de que a pele perdeu a \"sustentação\" que tinha?",
  "Maquiagem que já não disfarça mais como antigamente?",
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
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                  checkedItems.includes(index)
                    ? "border-primary bg-primary/5"
                    : "border-border bg-white"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all ${
                  checkedItems.includes(index)
                    ? "bg-primary"
                    : "bg-muted-foreground/40"
                }`} />
                <span className={`text-sm md:text-base leading-relaxed ${
                  checkedItems.includes(index) ? "text-foreground font-medium" : "text-muted-foreground"
                }`}>
                  {problem}
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

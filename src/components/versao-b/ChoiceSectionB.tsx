import { TrendingDown, Sparkles } from "lucide-react";

const ChoiceSectionB = () => {
  const scrollToSolution = () => {
    const element = document.getElementById("solucao");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Você tem duas escolhas:
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mb-8">
            O tempo vai passar de qualquer forma. A diferença está no que você decide fazer agora.
          </p>

          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            {/* Opção 1 - Negativa */}
            <div className="bg-white border border-border rounded-xl p-4 text-left opacity-70">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-2">
                <TrendingDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">
                Deixar o tempo agir sozinho
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Aceitar que as rugas vão se aprofundar e a flacidez vai aumentar.
              </p>
            </div>

            {/* Opção 2 - Positiva */}
            <button 
              onClick={scrollToSolution}
              className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary rounded-xl p-4 text-left transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">
                Ser a sua melhor versão
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                Assumir a sua idade com orgulho — <strong className="text-foreground">sendo a versão mais bonita de si mesma</strong>.
              </p>
              <span className="inline-flex items-center gap-1 text-primary font-semibold text-xs">
                Escolher esse caminho →
              </span>
            </button>
          </div>

          <p className="text-xs text-muted-foreground mt-8 max-w-md mx-auto">
            Não é sobre voltar no tempo. É sobre <strong className="text-foreground">envelhecer bem</strong> — 
            com pele firme, saudável e radiante.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChoiceSectionB;

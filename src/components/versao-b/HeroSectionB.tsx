import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSectionB = () => {
  const scrollToOffer = () => {
    const element = document.getElementById("oferta");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-secondary/50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
            Você se olha no espelho e já não reconhece mais o rosto que conhecia.
          </p>
          <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
            As rugas ao redor dos olhos que parecem ter aparecido do nada. As linhas na boca que a maquiagem já não cobre mais. A sensação de que seu rosto perdeu a "estrutura" que tinha antes…
          </p>
          <p className="text-sm md:text-base text-foreground mb-8 leading-relaxed font-medium">
            Se você tem mais de 35 anos e sente que as rugas estão ganhando terreno mais rápido do que deviam — <span className="text-primary font-semibold">isso não é normal</span>. E você não precisa aceitar isso.
          </p>
          
          <p className="text-primary font-semibold text-sm md:text-base mb-6">
            Existe uma solução que atua por dentro, no lugar onde as rugas realmente nascem.
          </p>
          
          <Button
            onClick={scrollToOffer}
            size="lg"
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold py-6 px-8 rounded-xl text-base shadow-lg"
          >
            Quero Combater Minhas Rugas
            <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionB;

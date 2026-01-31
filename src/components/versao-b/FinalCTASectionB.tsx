import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Shield, Sparkles } from "lucide-react";

const FinalCTASectionB = () => {
  const scrollToOffer = () => {
    const element = document.getElementById("oferta");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-foreground to-foreground/95 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Sparkles className="w-10 h-10 text-primary mx-auto mb-6" />
          
          <div className="space-y-4 mb-8">
            <p className="text-white/80 text-base md:text-lg">
              Você não precisa aceitar as rugas como inevitáveis.
            </p>
            <p className="text-white/80 text-base md:text-lg">
              Você não precisa se olhar no espelho e fingir que está tudo bem.
            </p>
            <p className="text-white text-base md:text-lg font-medium">
              Sua pele pode se regenerar. O colágeno pode voltar. As rugas podem diminuir.
            </p>
          </div>

          <p className="text-xl md:text-2xl font-bold text-primary mb-8">
            Você merece se olhar no espelho e reconhecer o rosto que conhecia.
          </p>

          <Button
            onClick={scrollToOffer}
            size="lg"
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-7 px-10 rounded-xl text-lg shadow-xl mb-6"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            QUERO COMBATER MINHAS RUGAS AGORA
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Tecnologia Verisol® comprovada</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Garantia de 30 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Pagamento seguro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASectionB;

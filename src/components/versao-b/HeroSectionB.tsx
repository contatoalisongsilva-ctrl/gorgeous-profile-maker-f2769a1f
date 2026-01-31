import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBannerDesktop from "@/assets/hero-banner-desktop.png";
import heroBannerMobile from "@/assets/hero-banner-mobile-new.jpg";

const HeroSectionB = () => {
  const scrollToOffer = () => {
    const element = document.getElementById("oferta");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col">
      {/* Hero Banner - Full width */}
      <div className="relative w-full flex-1">
        {/* Desktop Banner */}
        <img
          src={heroBannerDesktop}
          alt="Colágeno Verisol Renova Be - Combate às Rugas"
          className="hidden md:block w-full h-full object-cover object-top"
          fetchPriority="high"
        />
        {/* Mobile Banner */}
        <img
          src={heroBannerMobile}
          alt="Colágeno Verisol Renova Be - Combate às Rugas"
          className="md:hidden w-full h-full object-cover object-center"
          fetchPriority="high"
        />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Emotional Hook - Overlaid on bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm md:text-base opacity-90 mb-4 leading-relaxed">
            Você se olha no espelho e já não reconhece mais o rosto que conhecia.
          </p>
          <p className="text-sm md:text-base opacity-80 mb-4 leading-relaxed">
            As rugas ao redor dos olhos que parecem ter aparecido do nada. As linhas na boca que a maquiagem já não cobre mais. A sensação de que seu rosto perdeu a "estrutura" que tinha antes…
          </p>
          <p className="text-sm md:text-base opacity-90 mb-6 leading-relaxed font-medium">
            Se você tem mais de 35 anos e sente que as rugas estão ganhando terreno mais rápido do que deviam — <span className="text-primary">isso não é normal</span>. E você não precisa aceitar isso.
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

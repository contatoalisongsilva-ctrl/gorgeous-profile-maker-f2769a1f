import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ingredientCollagen from "@/assets/ingredient-collagen.webp";
import ingredientHyaluronic from "@/assets/ingredient-hyaluronic.webp";
import ingredientOrange from "@/assets/ingredient-orange.webp";
import ingredientSpinach from "@/assets/ingredient-spinach.webp";
import ingredientFruits from "@/assets/ingredient-fruits.webp";
import ingredientNuts from "@/assets/ingredient-nuts.webp";
import logoVerisol from "@/assets/logo-verisol.png";
import logoHaplexPlus from "@/assets/logo-haplex-plus.webp";

const FormulaSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openTech, setOpenTech] = useState<string | null>(null);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const toggleTech = (name: string) => {
    setOpenTech(openTech === name ? null : name);
  };

  const ingredients = [
    { 
      name: "Colágeno Verisol®", 
      description: "Estimula a produção natural de colágeno, melhora a firmeza e elasticidade da pele", 
      image: ingredientCollagen,
      tags: ["RUGAS", "FIRMEZA", "ELASTICIDADE"],
    },
    { 
      name: "Ácido Hialurônico", 
      description: "Retém a hidratação na pele, melhora a elasticidade e preenchimento", 
      image: ingredientHyaluronic,
      tags: ["HIDRATAÇÃO", "PELE JOVEM", "PREENCHIMENTO"],
    },
    { 
      name: "Vitamina C", 
      description: "Essencial para a síntese de colágeno, atua como antioxidante", 
      image: ingredientOrange,
      tags: ["COLÁGENO", "ANTIOXIDANTE", "LUMINOSIDADE"],
    },
    { 
      name: "Biotina", 
      description: "Contribui para a saúde da pele, cabelos e unhas", 
      image: ingredientFruits,
      tags: ["CABELOS", "UNHAS", "PELE SAUDÁVEL"],
    },
    { 
      name: "Zinco", 
      description: "Ajuda na regeneração celular, tem ação anti-inflamatória", 
      image: ingredientNuts,
      tags: ["REGENERAÇÃO", "PELE ACNEICA", "IMUNIDADE"],
    },
    { 
      name: "Vitamina E", 
      description: "Poderoso antioxidante que combate o envelhecimento precoce", 
      image: ingredientSpinach,
      tags: ["ANTIOXIDANTE", "ENVELHECIMENTO", "PROTEÇÃO"],
    },
  ];

  const technologies = [
    {
      name: "Tecnologia Verisol®",
      logo: logoVerisol,
      description: "Verisol® é um colágeno bioativo com eficácia clinicamente comprovada, que atua de dentro para fora estimulando a produção natural de colágeno pela pele. Seus peptídeos são facilmente absorvidos e agem diretamente nas células, ajudando a reduzir rugas e linhas de expressão, além de melhorar a firmeza, elasticidade e hidratação da pele com resultados visíveis com o uso contínuo."
    },
    {
      name: "Tecnologia Haplex Plus™",
      logo: logoHaplexPlus,
      description: "Haplex® é um ácido hialurônico de alta pureza e biodisponibilidade, com ação comprovada na hidratação profunda e na melhora da elasticidade da pele. Atua de dentro para fora, ajudando a reter água nas camadas cutâneas, suavizar linhas finas e promover uma aparência mais firme, viçosa e rejuvenescida. Também contribui para a saúde das articulações e tecidos conjuntivos."
    }
  ];

  return (
    <section className="py-10 md:py-12 bg-white" id="formula">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Porque nosso Colágeno é diferente?
          </h2>
        </div>

        {/* Ingredients Carousel */}
        <div className="relative max-w-5xl mx-auto mb-14">
          <button 
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-muted transition-colors -ml-5"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {ingredients.map((ingredient) => (
                <div 
                  key={ingredient.name} 
                  className="flex-[0_0_50%] md:flex-[0_0_25%] min-w-0 px-2"
                >
                  <div className="bg-white rounded-2xl border border-border overflow-hidden h-full shadow-sm">
                    {/* Image */}
                    <div className="aspect-square bg-secondary overflow-hidden">
                      <img 
                        src={ingredient.image} 
                        alt={ingredient.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground text-sm mb-1.5">{ingredient.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                        {ingredient.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {ingredient.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-0.5 bg-muted text-muted-foreground text-[9px] rounded-full font-medium uppercase tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-muted transition-colors -mr-5"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Technology Cards - Collapsible */}
        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
          {technologies.map((tech) => {
            const isOpen = openTech === tech.name;
            
            return (
              <div 
                key={tech.name}
                className="bg-secondary rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleTech(tech.name)}
                  className="w-full p-5 flex items-center justify-between hover:bg-muted transition-colors min-h-[72px]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-36 h-14 flex items-center justify-center bg-white rounded-lg px-3">
                      <img 
                        src={tech.logo} 
                        alt={tech.name}
                        className="max-h-12 w-auto object-contain"
                      />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm md:text-base">{tech.name}</h3>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FormulaSection;

import { useState } from "react";
import flavorCranberry from "@/assets/flavor-cranberry.jpg";
import flavorFrutasTropicais from "@/assets/flavor-frutas-tropicais.jpg";
import flavorLimao from "@/assets/flavor-limao.jpg";
import flavorPinkLemonade from "@/assets/flavor-pink-lemonade.jpg";
import flavorTangerina from "@/assets/flavor-tangerina.jpg";

const FlavorSection = () => {
  const flavors = [
    {
      name: "Cranberry",
      image: flavorCranberry,
      color: "#E91E8C",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-300",
      activeRing: "ring-pink-400",
    },
    {
      name: "Frutas Tropicais",
      image: flavorFrutasTropicais,
      color: "#D4A574",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-300",
      activeRing: "ring-amber-400",
    },
    {
      name: "Limão",
      image: flavorLimao,
      color: "#8BC34A",
      bgColor: "bg-lime-50",
      borderColor: "border-lime-300",
      activeRing: "ring-lime-400",
    },
    {
      name: "Pink Lemonade",
      image: flavorPinkLemonade,
      color: "#E91E8C",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-300",
      activeRing: "ring-pink-400",
    },
    {
      name: "Tangerina",
      image: flavorTangerina,
      color: "#FF8C00",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      activeRing: "ring-orange-400",
    },
  ];

  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);

  return (
    <section className="py-10 md:py-12 bg-white" id="sabores">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            5 Sabores Deliciosos
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-3">
            Os sabores mais gostosos do Brasil
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Todos os sabores possuem a mesma fórmula premium
          </p>
        </div>

        {/* Main Display + Flavor Selector */}
        <div className="max-w-md mx-auto">
          {/* Main Image Display */}
          <div className="relative mb-6">
            <div 
              className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary transition-all duration-300"
              style={{ 
                background: `linear-gradient(135deg, ${selectedFlavor.color}10, ${selectedFlavor.color}05)` 
              }}
            >
              <img
                src={selectedFlavor.image}
                alt={selectedFlavor.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
            {/* Flavor name badge */}
            <div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-white font-semibold text-sm shadow-lg transition-all duration-300"
              style={{ backgroundColor: selectedFlavor.color }}
            >
              {selectedFlavor.name}
            </div>
          </div>

          {/* Flavor Buttons */}
          <div className="flex justify-center gap-3 flex-wrap">
            {flavors.map((flavor) => (
              <button
                key={flavor.name}
                onClick={() => setSelectedFlavor(flavor)}
                className={`
                  w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200
                  ${selectedFlavor.name === flavor.name 
                    ? `${flavor.borderColor} ring-2 ${flavor.activeRing} ring-offset-2 scale-105` 
                    : 'border-gray-200 hover:border-gray-300 hover:scale-102'
                  }
                `}
                aria-label={`Selecionar sabor ${flavor.name}`}
              >
                <img
                  src={flavor.image}
                  alt={flavor.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Flavor names below buttons */}
          <div className="flex justify-center gap-3 mt-2 flex-wrap">
            {flavors.map((flavor) => (
              <div
                key={flavor.name}
                className={`w-16 text-center text-[10px] leading-tight transition-colors duration-200 ${
                  selectedFlavor.name === flavor.name 
                    ? 'font-semibold' 
                    : 'text-muted-foreground'
                }`}
                style={{ 
                  color: selectedFlavor.name === flavor.name ? flavor.color : undefined 
                }}
              >
                {flavor.name}
              </div>
            ))}
          </div>
        </div>

        {/* Subtle note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Sabor suave e refrescante • Fácil de tomar diariamente
        </p>
      </div>
    </section>
  );
};

export default FlavorSection;

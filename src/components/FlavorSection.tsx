import { useState } from "react";
import flavorCranberry from "@/assets/flavor-cranberry.jpg";
import flavorFrutasTropicais from "@/assets/flavor-frutas-tropicais.jpg";
import flavorLimao from "@/assets/flavor-limao.jpg";
import flavorPinkLemonade from "@/assets/flavor-pink-lemonade.jpg";
import flavorTangerina from "@/assets/flavor-tangerina.jpg";

const FlavorSection = () => {
  const flavors = [
    { name: "Cranberry", image: flavorCranberry, color: "#E91E8C" },
    { name: "Frutas Tropicais", image: flavorFrutasTropicais, color: "#D4A574" },
    { name: "Limão", image: flavorLimao, color: "#8BC34A" },
    { name: "Pink Lemonade", image: flavorPinkLemonade, color: "#E91E8C" },
    { name: "Tangerina", image: flavorTangerina, color: "#FF8C00" },
  ];

  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);

  return (
    <section className="py-10 md:py-12 bg-white" id="sabores">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            5 Sabores Deliciosos
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
            Os sabores mais gostosos do Brasil
          </h2>
          <p className="text-sm text-muted-foreground">
            Todos os sabores possuem a mesma fórmula premium
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {/* Layout: Names on left, Image on right */}
          <div className="flex items-center gap-4">
            {/* Flavor Names List - Left */}
            <div className="bg-secondary/30 rounded-xl p-3 flex-shrink-0">
              <div className="flex flex-col gap-1">
                {flavors.map((flavor) => (
                  <button
                    key={flavor.name}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`
                      text-xs py-2 px-3 rounded-lg text-left transition-all duration-200 whitespace-nowrap
                      ${selectedFlavor.name === flavor.name 
                        ? 'bg-white shadow-sm font-semibold' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                      }
                    `}
                    style={{ 
                      color: selectedFlavor.name === flavor.name ? flavor.color : undefined 
                    }}
                  >
                    {flavor.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Image - Right */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-40 h-40 rounded-xl overflow-hidden">
                <img
                  src={selectedFlavor.image}
                  alt={selectedFlavor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Sabor suave e refrescante • Fácil de tomar diariamente
        </p>
      </div>
    </section>
  );
};

export default FlavorSection;

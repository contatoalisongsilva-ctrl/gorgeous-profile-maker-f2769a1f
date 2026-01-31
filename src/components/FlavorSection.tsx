import { useState, useEffect } from "react";
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

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto-rotate every 1.3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % flavors.length);
    }, 1300);

    return () => clearInterval(interval);
  }, [flavors.length]);

  const selectedFlavor = flavors[selectedIndex];

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
          {/* Layout: Image on left, Names on right */}
          <div className="flex items-center gap-4">
            {/* Image - Left */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-40 h-40 rounded-xl overflow-hidden">
                <img
                  src={selectedFlavor.image}
                  alt={selectedFlavor.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
            </div>

            {/* Flavor Names List - Right */}
            <div className="bg-secondary/30 rounded-xl p-3 flex-shrink-0">
              <div className="flex flex-col gap-1">
                {flavors.map((flavor, index) => (
                  <div
                    key={flavor.name}
                    className={`
                      text-xs py-2 px-3 rounded-lg text-left transition-all duration-300 whitespace-nowrap
                      ${selectedIndex === index 
                        ? 'bg-white shadow-sm font-semibold scale-105' 
                        : 'text-muted-foreground'
                      }
                    `}
                    style={{ 
                      color: selectedIndex === index ? flavor.color : undefined 
                    }}
                  >
                    {flavor.name}
                  </div>
                ))}
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

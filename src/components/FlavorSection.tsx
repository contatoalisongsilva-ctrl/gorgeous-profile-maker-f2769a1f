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

        <div className="max-w-xs mx-auto">
          {/* Main Image */}
          <div className="aspect-square rounded-2xl overflow-hidden mb-4">
            <img
              src={selectedFlavor.image}
              alt={selectedFlavor.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Flavor Names List */}
          <div className="flex flex-col items-center gap-1">
            {flavors.map((flavor) => (
              <button
                key={flavor.name}
                onClick={() => setSelectedFlavor(flavor)}
                className={`
                  text-sm py-1.5 px-3 rounded-full transition-all duration-200
                  ${selectedFlavor.name === flavor.name 
                    ? 'font-semibold' 
                    : 'text-muted-foreground hover:text-foreground'
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

        <p className="text-center text-xs text-muted-foreground mt-6">
          Sabor suave e refrescante • Fácil de tomar diariamente
        </p>
      </div>
    </section>
  );
};

export default FlavorSection;

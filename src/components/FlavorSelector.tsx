import { Minus, Plus } from "lucide-react";
import flavorCranberry from "@/assets/flavor-cranberry.jpg";
import flavorFrutasTropicais from "@/assets/flavor-frutas-tropicais.jpg";
import flavorLimao from "@/assets/flavor-limao.jpg";
import flavorPinkLemonade from "@/assets/flavor-pink-lemonade.jpg";
import flavorTangerina from "@/assets/flavor-tangerina.jpg";

interface FlavorSelectorProps {
  flavors: Record<string, number>;
  onFlavorChange: (flavor: string, change: number) => void;
  maxFlavors: number;
  totalFlavors: number;
}

const FlavorSelector = ({
  flavors,
  onFlavorChange,
  maxFlavors,
  totalFlavors,
}: FlavorSelectorProps) => {
  const flavorOptions = [
    { name: "Cranberry", image: flavorCranberry, color: "#E91E8C" },
    { name: "Frutas Tropicais", image: flavorFrutasTropicais, color: "#D4A574" },
    { name: "Limão", image: flavorLimao, color: "#8BC34A" },
    { name: "Pink Lemonade", image: flavorPinkLemonade, color: "#E91E8C" },
    { name: "Tangerina", image: flavorTangerina, color: "#FF8C00" },
  ];

  const canAdd = totalFlavors < maxFlavors;
  const isComplete = totalFlavors === maxFlavors;

  return (
    <div className="bg-white rounded-xl border border-border p-3 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground text-xs">
          Escolha seus sabores:
        </h3>
        <div className="text-right">
          <span className={`text-sm font-bold ${isComplete ? "text-green-600" : "text-primary"}`}>
            {totalFlavors}/{maxFlavors}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${isComplete ? "bg-green-500" : "bg-primary"}`}
          style={{ width: `${(totalFlavors / maxFlavors) * 100}%` }}
        />
      </div>

      <div className="space-y-1.5">
        {flavorOptions.map((flavor) => {
          const quantity = flavors[flavor.name] || 0;
          
          return (
            <div
              key={flavor.name}
              className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                quantity > 0
                  ? "border-primary bg-primary/5"
                  : "border-border bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <img 
                  src={flavor.image} 
                  alt={flavor.name}
                  className="w-8 h-8 object-cover rounded-md"
                />
                <span 
                  className="font-medium text-xs"
                  style={{ color: flavor.color }}
                >
                  {flavor.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onFlavorChange(flavor.name, -1)}
                  disabled={quantity === 0}
                  className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
                    quantity > 0
                      ? "border-border bg-background hover:bg-muted"
                      : "border-border bg-muted cursor-not-allowed opacity-50"
                  }`}
                  aria-label={`Remover ${flavor.name}`}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center font-bold text-foreground text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => onFlavorChange(flavor.name, 1)}
                  disabled={!canAdd}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    canAdd
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-muted cursor-not-allowed opacity-50"
                  }`}
                  aria-label={`Adicionar ${flavor.name}`}
                >
                  <Plus className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlavorSelector;

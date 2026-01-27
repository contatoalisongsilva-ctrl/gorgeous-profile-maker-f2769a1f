import { useState, useEffect } from "react";
import { Minus, Plus, Loader2 } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { createShopifyCheckout, FLAVOR_VARIANT_IDS, CartLine } from "@/lib/shopify";
import flavorCranberry from "@/assets/flavor-cranberry.jpg";
import flavorFrutasTropicais from "@/assets/flavor-frutas-tropicais.jpg";
import flavorLimao from "@/assets/flavor-limao.jpg";
import flavorPinkLemonade from "@/assets/flavor-pink-lemonade.jpg";
import flavorTangerina from "@/assets/flavor-tangerina.jpg";

interface FlavorSelectionDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kitQuantity: number;
}

const FLAVORS = [
  { id: "cranberry", name: "Cranberry", image: flavorCranberry, color: "#E91E8C" },
  { id: "frutas-tropicais", name: "Frutas Tropicais", image: flavorFrutasTropicais, color: "#D4A574" },
  { id: "limao", name: "Limão", image: flavorLimao, color: "#8BC34A" },
  { id: "pink-lemonade", name: "Pink Lemonade", image: flavorPinkLemonade, color: "#E91E8C" },
  { id: "tangerina", name: "Tangerina", image: flavorTangerina, color: "#FF8C00" },
];

const FlavorSelectionDrawer = ({
  open,
  onOpenChange,
  kitQuantity,
}: FlavorSelectionDrawerProps) => {
  const [selectedFlavors, setSelectedFlavors] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Reset selections when drawer opens
  useEffect(() => {
    if (open) {
      setSelectedFlavors({});
    }
  }, [open]);

  const totalSelected = Object.values(selectedFlavors).reduce((sum, count) => sum + count, 0);
  const progressPercent = (totalSelected / kitQuantity) * 100;
  const isComplete = totalSelected === kitQuantity;
  const remaining = kitQuantity - totalSelected;

  const updateFlavor = (flavorId: string, delta: number) => {
    setSelectedFlavors((prev) => {
      const current = prev[flavorId] || 0;
      const newValue = Math.max(0, current + delta);
      
      // Don't allow adding more than needed
      if (delta > 0 && totalSelected >= kitQuantity) {
        return prev;
      }
      
      if (newValue === 0) {
        const { [flavorId]: _, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [flavorId]: newValue };
    });
  };

  const handleConfirm = async () => {
    if (!isComplete || isLoading) return;

    setIsLoading(true);
    
    try {
      // Build cart lines from selected flavors
      const lines: CartLine[] = Object.entries(selectedFlavors)
        .filter(([_, quantity]) => quantity > 0)
        .map(([flavorId, quantity]) => ({
          merchandiseId: FLAVOR_VARIANT_IDS[flavorId],
          quantity,
        }));

      const checkoutUrl = await createShopifyCheckout(lines);
      
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
        onOpenChange(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-center pb-2">
          <DrawerTitle className="text-xl font-bold text-foreground">
            Monte seu kit de {kitQuantity} {kitQuantity === 1 ? "unidade" : "unidades"}
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground">
            Escolha os sabores que você deseja
          </DrawerDescription>
        </DrawerHeader>

        {/* Progress Section */}
        <div className="px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {totalSelected} de {kitQuantity} selecionados
            </span>
            {!isComplete && (
              <span className="text-xs text-muted-foreground">
                Faltam {remaining}
              </span>
            )}
            {isComplete && (
              <span className="text-xs text-primary font-semibold">
                ✓ Completo!
              </span>
            )}
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Flavors List */}
        <div className="px-4 py-2 space-y-3 overflow-y-auto flex-1">
          {FLAVORS.map((flavor) => {
            const count = selectedFlavors[flavor.id] || 0;
            
            return (
              <div
                key={flavor.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  count > 0 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-white"
                }`}
              >
                {/* Flavor Info */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img 
                      src={flavor.image} 
                      alt={flavor.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                  </div>
                  <span 
                    className="font-semibold text-sm"
                    style={{ color: flavor.color }}
                  >
                    {flavor.name}
                  </span>
                </div>

                {/* Counter */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateFlavor(flavor.id, -1)}
                    disabled={count === 0}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      count === 0
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                    aria-label={`Remover ${flavor.name}`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="w-8 text-center font-bold text-foreground text-lg">
                    {count}
                  </span>
                  
                  <button
                    onClick={() => updateFlavor(flavor.id, 1)}
                    disabled={totalSelected >= kitQuantity}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      totalSelected >= kitQuantity
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                    aria-label={`Adicionar ${flavor.name}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <DrawerFooter className="pt-4">
          <Button
            onClick={handleConfirm}
            disabled={!isComplete || isLoading}
            className={`w-full py-6 text-base font-semibold rounded-xl transition-all ${
              isComplete && !isLoading
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : isComplete ? (
              "Confirmar e Ir para Pagamento"
            ) : (
              `Selecione mais ${remaining} sabor${remaining !== 1 ? "es" : ""}`
            )}
          </Button>
          <DrawerClose asChild>
            <Button variant="ghost" className="w-full" disabled={isLoading}>
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FlavorSelectionDrawer;

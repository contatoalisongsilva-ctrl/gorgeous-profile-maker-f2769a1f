import { useState, useEffect } from "react";
import { Loader2, Minus, Plus } from "lucide-react";
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
import { createShopifyCheckout } from "@/lib/shopify";
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
  const [flavorQuantities, setFlavorQuantities] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Para kits 3 e 6, permitimos múltiplos sabores
  const isKitProduct = kitQuantity === 3 || kitQuantity === 6;
  
  // Total de unidades selecionadas
  const totalSelected = Object.values(flavorQuantities).reduce((sum, qty) => sum + qty, 0);
  const remaining = kitQuantity - totalSelected;

  // Reset selection when drawer opens
  useEffect(() => {
    if (open) {
      setFlavorQuantities({});
    }
  }, [open]);

  const handleIncrement = (flavorId: string) => {
    if (remaining <= 0) return;
    setFlavorQuantities(prev => ({
      ...prev,
      [flavorId]: (prev[flavorId] || 0) + 1
    }));
  };

  const handleDecrement = (flavorId: string) => {
    const current = flavorQuantities[flavorId] || 0;
    if (current <= 0) return;
    setFlavorQuantities(prev => ({
      ...prev,
      [flavorId]: current - 1
    }));
  };

  const handleConfirm = async () => {
    if (totalSelected !== kitQuantity || isLoading) return;

    setIsLoading(true);
    
    try {
      const checkoutUrl = await createShopifyCheckout(flavorQuantities, kitQuantity);
      
      if (checkoutUrl) {
        // Use location.href instead of window.open to work in Instagram's in-app browser
        window.location.href = checkoutUrl;
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
            {isKitProduct 
              ? `Kit ${kitQuantity} Unidades` 
              : "Escolha seu sabor"}
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground">
            {isKitProduct 
              ? `Selecione ${kitQuantity} unidades (pode misturar sabores)`
              : "Selecione o sabor que você deseja"}
          </DrawerDescription>
          {isKitProduct && (
            <div className="mt-2 text-sm font-medium">
              <span className={remaining === 0 ? "text-green-600" : "text-primary"}>
                {totalSelected} de {kitQuantity} selecionadas
              </span>
              {remaining > 0 && (
                <span className="text-muted-foreground ml-1">
                  (faltam {remaining})
                </span>
              )}
            </div>
          )}
        </DrawerHeader>

        {/* Flavors List */}
        <div className="px-4 py-2 space-y-3 overflow-y-auto flex-1">
          {FLAVORS.map((flavor) => {
            const quantity = flavorQuantities[flavor.id] || 0;
            
            return (
              <div
                key={flavor.id}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                  quantity > 0 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
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

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecrement(flavor.id)}
                    disabled={quantity === 0}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      quantity > 0 
                        ? "bg-primary/10 text-primary hover:bg-primary/20" 
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="w-8 text-center font-bold text-lg">
                    {quantity}
                  </span>
                  
                  <button
                    onClick={() => handleIncrement(flavor.id)}
                    disabled={remaining === 0}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      remaining > 0 
                        ? "bg-primary text-white hover:bg-primary/90" 
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
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
            disabled={totalSelected !== kitQuantity || isLoading}
            className={`w-full py-6 text-base font-semibold rounded-xl transition-all ${
              totalSelected === kitQuantity && !isLoading
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : totalSelected === kitQuantity ? (
              "Confirmar e Ir para Pagamento"
            ) : (
              `Selecione ${remaining} unidade${remaining !== 1 ? 's' : ''}`
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

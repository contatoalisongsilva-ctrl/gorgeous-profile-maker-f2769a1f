import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";
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
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Para kits 3 e 6, incluímos brindes e atributos do kit
  const isKitProduct = kitQuantity === 3 || kitQuantity === 6;

  // Reset selection when drawer opens
  useEffect(() => {
    if (open) {
      setSelectedFlavor(null);
    }
  }, [open]);

  const handleConfirm = async () => {
    if (!selectedFlavor || isLoading) return;

    setIsLoading(true);
    
    try {
      const checkoutUrl = await createShopifyCheckout(selectedFlavor, kitQuantity);
      
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
            {isKitProduct 
              ? `Kit ${kitQuantity} Unidades` 
              : "Escolha seu sabor"}
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground">
            {isKitProduct 
              ? "Selecione o sabor principal do seu kit"
              : "Selecione o sabor que você deseja"}
          </DrawerDescription>
        </DrawerHeader>

        {/* Flavors List - Single Selection */}
        <div className="px-4 py-2 space-y-3 overflow-y-auto flex-1">
          {FLAVORS.map((flavor) => {
            const isSelected = selectedFlavor === flavor.id;
            
            return (
              <button
                key={flavor.id}
                onClick={() => setSelectedFlavor(flavor.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isSelected 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "border-border bg-white hover:border-primary/30"
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

                {/* Selection Indicator */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected 
                    ? "bg-primary text-white" 
                    : "border-2 border-muted-foreground/30"
                }`}>
                  {isSelected && <Check className="w-4 h-4" />}
                </div>
              </button>
            );
          })}
        </div>

        <DrawerFooter className="pt-4">
          <Button
            onClick={handleConfirm}
            disabled={!selectedFlavor || isLoading}
            className={`w-full py-6 text-base font-semibold rounded-xl transition-all ${
              selectedFlavor && !isLoading
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : selectedFlavor ? (
              "Confirmar e Ir para Pagamento"
            ) : (
              "Selecione um sabor"
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

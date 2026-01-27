import { useState, useCallback } from "react";
import { Loader2, Truck, Shield, Award, ThumbsUp } from "lucide-react";
import { useSelectedKit } from "@/contexts/SelectedKitContext";
import KitSelector from "./KitSelector";
import FlavorSelector from "./FlavorSelector";
import { createShopifyCheckout } from "@/lib/shopify";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

const OfferSection = () => {
  const { setSelectedQuantity } = useSelectedKit();
  const [selectedKit, setSelectedKit] = useState<"1x" | "3x" | "6x">("3x");
  const [flavors, setFlavors] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const maxFlavors = selectedKit === "1x" ? 1 : selectedKit === "3x" ? 3 : 6;
  const totalFlavors = Object.values(flavors).reduce((a, b) => a + b, 0);
  const isFlavorComplete = totalFlavors === maxFlavors;

  const handleKitChange = useCallback((kit: "1x" | "3x" | "6x") => {
    setSelectedKit(kit);
    setFlavors({}); // Reset sabores quando muda o kit
    // Update the context for the sticky button
    const quantity = kit === "1x" ? 1 : kit === "3x" ? 3 : 6;
    setSelectedQuantity(quantity as 1 | 3 | 6);
  }, [setSelectedQuantity]);

  const handleBuyClick = useCallback((kit: "1x" | "3x" | "6x") => {
    handleKitChange(kit);
    setIsDrawerOpen(true);
  }, [handleKitChange]);

  const handleFlavorChange = useCallback(
    (flavor: string, change: number) => {
      setFlavors((prev) => {
        const current = prev[flavor] || 0;
        const newValue = Math.max(0, current + change);
        const total =
          Object.entries(prev)
            .filter(([key]) => key !== flavor)
            .reduce((a, [, b]) => a + b, 0) + newValue;

        if (total > maxFlavors) return prev;

        return { ...prev, [flavor]: newValue };
      });
    },
    [maxFlavors]
  );

  const handleCheckout = async () => {
    if (!isFlavorComplete || isLoading) return;

    setIsLoading(true);

    try {
      const kitQuantity = selectedKit === "1x" ? 1 : selectedKit === "3x" ? 3 : 6;
      const checkoutUrl = await createShopifyCheckout(flavors, kitQuantity);

      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
        setIsDrawerOpen(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const guarantees = [
    {
      icon: Award,
      title: "Recomendado",
      description: "Por especialistas",
      emoji: "👨‍⚕️",
    },
    {
      icon: Truck,
      title: "Frete Grátis",
      description: "Acima de R$ 199",
      emoji: "🚚",
    },
    {
      icon: ThumbsUp,
      title: "+98% Clientes",
      description: "Recomendam",
      emoji: "❤️",
    },
    {
      icon: Shield,
      title: "Fórmula Exclusiva",
      description: "Verisol® + Haplex®",
      emoji: "✨",
    },
  ];

  return (
    <section className="py-10 md:py-12 bg-white" id="oferta">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            Oferta Exclusiva
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Selecione seu Kit
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Quanto mais você compra, mais você economiza
          </p>
        </div>

        {/* Kit Selector */}
        <div className="max-w-3xl mx-auto mb-10">
          <KitSelector selectedKit={selectedKit} onKitChange={handleKitChange} onBuyClick={handleBuyClick} />
        </div>

        {/* Flavor Selection Drawer */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader className="text-center pb-2">
              <DrawerTitle className="text-lg font-bold">
                Escolha seus sabores - Kit {selectedKit}
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6 overflow-y-auto">
              {/* Flavor Selector */}
              <div className="mb-4">
                <FlavorSelector
                  flavors={flavors}
                  onFlavorChange={handleFlavorChange}
                  maxFlavors={maxFlavors}
                  totalFlavors={totalFlavors}
                />
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={!isFlavorComplete || isLoading}
                className={`w-full py-6 text-base font-semibold rounded-xl transition-all ${
                  isFlavorComplete && !isLoading
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : isFlavorComplete ? (
                  "Comprar Agora"
                ) : (
                  `Selecione ${maxFlavors - totalFlavors} sabor${maxFlavors - totalFlavors !== 1 ? "es" : ""}`
                )}
              </Button>

              {/* Delivery info */}
              <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-start gap-3">
                <span className="text-blue-500 text-lg">⚡</span>
                <div>
                  <p className="font-semibold text-xs text-foreground">ENTREGA FULL – Envio imediato em até 24h</p>
                  <p className="text-[11px] text-muted-foreground">Comprando dentro das próximas 7h 34 min</p>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Guarantees Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
              Compre com Confiança
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {guarantees.map((item) => (
              <div 
                key={item.title}
                className="text-center p-4 bg-secondary rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-xl">
                  {item.emoji}
                </div>
                <h4 className="font-semibold text-foreground text-xs mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 p-5 rounded-xl mt-6 text-center border border-primary/10">
            <p className="text-muted-foreground text-sm">
              Milhares de mulheres confiam no <span className="text-primary font-semibold">Colágeno Renova Be</span> para rejuvenescer sua pele!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;

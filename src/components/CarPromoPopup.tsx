import { Car, Gift } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import promoCarHero from "@/assets/promo-car-hero.png";

interface CarPromoPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CarPromoPopup = ({ open, onOpenChange }: CarPromoPopupProps) => {
  const steps = [
    {
      number: 1,
      title: "Compre seu kit",
      description: "Adquira o Kit Renova Be 3 ou 6 potes participante da promoção",
    },
    {
      number: 2,
      title: "Entre no jogo",
      description: "Receba um número da sorte para concorrer a um Volkswagen Tera 0km",
    },
    {
      number: 3,
      title: "Torça e acompanhe",
      description: "Os números da sorte serão divulgados no site oficial Renova Be e Caixa Federal",
    },
    {
      number: 4,
      title: "Saiba na hora",
      description: "O sorteio será realizado em 28/05/2026 e o resultado divulgado em 29/05/2026",
    },
  ];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh] bg-white">
        <DrawerHeader className="p-4 pb-2">
          <DrawerTitle className="text-foreground text-center text-lg font-bold">
            🚗 Sua Rotina Vale um Carro!
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-6 overflow-y-auto">
          {/* Car Image */}
          <div className="mb-4">
            <img
              src={promoCarHero}
              alt="Volkswagen Tera 0km"
              className="w-full rounded-xl"
            />
          </div>

          {/* Hero text */}
          <div className="text-center mb-5 bg-primary/5 rounded-xl p-4">
            <p className="text-foreground text-sm mb-1">
              Já imaginou você de carro <strong>ZERO KM</strong> em 2026?
            </p>
            <p className="text-muted-foreground text-xs">
              Compre o Kit 3 ou 6 Potes e concorra a um <strong className="text-primary">Volkswagen Tera</strong>!
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-2 mb-5">
            <h3 className="text-foreground font-bold text-sm text-center mb-3">
              Como participar
            </h3>
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-secondary border border-border rounded-xl p-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full border-2 border-primary/50 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-xs">{step.number}</span>
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold text-xs mb-0.5">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info box */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground text-xs">
                Cada compra = 1 número da sorte
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Válido para os Kits 3 e 6 Potes cadastrados na promoção.
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CarPromoPopup;

import { useState } from "react";
import { X, Car, Gift } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import promoCarHero from "@/assets/promo-car-hero.png";

interface CarPromoPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CarPromoPopup = ({ open, onOpenChange }: CarPromoPopupProps) => {
  const [showCarOnly, setShowCarOnly] = useState(false);

  const steps = [
    {
      number: 1,
      title: "Compre seu kit",
      description: "Adquira o Kit Renova Be 6 potes participante da promoção",
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0 bg-primary">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-white text-center text-xl font-bold">
            🚗 Sua Rotina Vale um Carro!
          </DialogTitle>
        </DialogHeader>

        <div className="p-4">
          {showCarOnly ? (
            /* Car Only View */
            <div className="text-center">
              <img
                src={promoCarHero}
                alt="Volkswagen Tera 0km"
                className="w-full rounded-xl mb-4"
              />
              <button
                onClick={() => setShowCarOnly(false)}
                className="text-white/80 text-sm underline"
              >
                ← Voltar para como participar
              </button>
            </div>
          ) : (
            /* How to Participate View */
            <div>
              {/* Hero text */}
              <div className="text-center mb-6">
                <p className="text-white text-sm mb-2">
                  Já imaginou você de carro <strong>ZERO KM</strong> em 2026?
                </p>
                <p className="text-white/90 text-xs">
                  Compre o Kit 6 Potes e concorra a um <strong>Volkswagen Tera</strong>!
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-3 mb-6">
                <h3 className="text-white font-bold text-center mb-4">
                  Como participar
                </h3>
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="bg-white/10 border border-white/20 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{step.number}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">
                          {step.title}
                        </h4>
                        <p className="text-white/80 text-xs leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info box */}
              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground text-sm">
                    Cada compra = 1 número da sorte
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Válido para o Kit 6 Potes cadastrado na promoção.
                </p>
              </div>

              {/* See car button */}
              <button
                onClick={() => setShowCarOnly(true)}
                className="w-full py-3 bg-white text-primary font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
              >
                <Car className="w-5 h-5" />
                Ver o carro do sorteio
              </button>
            </div>
          )}
        </div>

        {/* Close hint */}
        <div className="p-4 pt-0 text-center">
          <button
            onClick={() => onOpenChange(false)}
            className="text-white/60 text-xs hover:text-white transition-colors"
          >
            Fechar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarPromoPopup;
